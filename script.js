/* =========================================================
   QUIZZ FDD — Devine le Fruit du Démon
   ========================================================= */

const quizz = [
  { img: "img/gomugomu.jpg", reponse: "gomu gomu no mi", porteur: "Luffy" },
  { img: "img/gorogoro.jpg", reponse: "goro goro no mi", porteur: "Ener" },
  { img: "img/guragura.png", reponse: "gura gura no mi", porteur: "Barbe Blanche" },
  { img: "img/hitohito.jpg", reponse: "hito hito no mi", porteur: "Chopper" },
  { img: "img/kagekage.jpg", reponse: "kage kage no mi", porteur: "Gecko Moria" },
  { img: "img/meramera.jpg", reponse: "mera mera no mi", porteur: "Ace" },
  { img: "img/opeope.jpg", reponse: "ope ope no mi", porteur: "Trafalgar Law" },
  { img: "img/sunasuna.jpg", reponse: "suna suna no mi", porteur: "Crocodile" },
  { img: "img/yamiyami.jpg", reponse: "yami yami no mi", porteur: "Barbe Noire" },
  { img: "img/yomiyomi.jpg", reponse: "yomi yomi no mi", porteur: "Brook" },
].map((f) => ({ ...f, indice: `Le porteur du fruit est ${f.porteur}` }));

/* ---------- Configuration des niveaux ----------
   mode   : "qcm" (4 choix) ou "text" (réponse libre)
   lives  : nombre de vies (tentatives) pour la partie
   timer  : secondes par question (0 = pas de chrono)
   effect : "none" | "blur" (image floue) | "zoom" (gros plan)
   points : points pour une bonne réponse
   malus  : points retirés si l'indice a été utilisé            */
const LEVELS = {
  1: {
    name: "Moussaillon", icon: "⚓", mode: "qcm", lives: 5, timer: 0,
    effect: "none", points: 10, malus: 5,
    desc: "QCM à 4 choix · image nette · sans chrono",
  },
  2: {
    name: "Pirate", icon: "🏴‍☠️", mode: "qcm", lives: 4, timer: 15,
    effect: "none", points: 15, malus: 5,
    desc: "QCM à 4 choix · chrono 15 s · 4 vies",
  },
  3: {
    name: "Supernova", icon: "⭐", mode: "text", lives: 5, timer: 0,
    effect: "none", points: 20, malus: 10,
    desc: "Réponse libre · image nette · sans chrono",
  },
  4: {
    name: "Grand Corsaire", icon: "⚔️", mode: "text", lives: 4, timer: 30,
    effect: "blur", points: 30, malus: 15,
    desc: "Réponse libre · image floue · chrono 30 s",
  },
  5: {
    name: "Empereur", icon: "👑", mode: "text", lives: 3, timer: 20,
    effect: "zoom", points: 50, malus: 25,
    desc: "Réponse libre · gros plan · chrono 20 s · 3 vies",
  },
  shuffle: {
    name: "Shuffle", icon: "🔀", lives: 5,
    desc: "Ordre aléatoire · chaque fruit tire un niveau de 1 à 5 au hasard",
  },
};

const STREAK_MIN = 3; // bonne réponses d'affilée pour déclencher le bonus
const STREAK_BONUS = 5;
const STORAGE_KEY = "quizz-fdd-best";

/* ---------- État de la partie ---------- */
let levelKey = null;
let questions = [];
let score = 0;
let attempts = 0;
let currentQuestion = 0;
let hint_asked = false;
let nearMissUsed = false;
let locked = false; // vrai quand la question est résolue (écran de révélation)
let streak = 0;
let bestStreak = 0;
let results = [];
let timerId = null;
let timeLeft = 0;

/* ---------- Raccourcis DOM ---------- */
const $ = (id) => document.getElementById(id);
const screens = {
  menu: $("menu-screen"),
  game: $("game-screen"),
  end: $("end-screen"),
};

/* =========================================================
   Utilitaires
   ========================================================= */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// minuscules, sans accents, sans espaces ni ponctuation
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// "gomu gomu no mi", "Gomu-Gomu no Mi", "gomugomu" sont acceptés
function isCorrect(userAnswer, reponse) {
  const target = normalize(reponse);
  return userAnswer === target || userAnswer + "nomi" === target;
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

function isNearMiss(userAnswer, reponse) {
  const target = normalize(reponse);
  const short = target.replace(/nomi$/, "");
  return Math.min(levenshtein(userAnswer, target), levenshtein(userAnswer, short)) <= 2;
}

// "gomu gomu no mi" -> "Gomu Gomu no Mi"
function prettyName(str) {
  return str
    .split(" ")
    .map((w) => (w === "no" ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function loadBest() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveBest(key, data) {
  try {
    const all = loadBest();
    all[key] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* stockage indisponible : on ignore */
  }
}

function starsHtml(n) {
  return [1, 2, 3]
    .map((i) => `<span class="star ${i <= n ? "on" : ""}">★</span>`)
    .join("");
}

let toastTimeout = null;
function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove("show"), 1800);
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) =>
    el.classList.toggle("active", key === name)
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   Menu principal
   ========================================================= */
function renderMenu() {
  const best = loadBest();
  const keys = ["1", "2", "3", "4", "5", "shuffle"];

  $("level-grid").innerHTML = keys
    .map((key) => {
      const lvl = LEVELS[key];
      const record = best[key];
      const isShuffle = key === "shuffle";
      const pips = isShuffle
        ? `<span class="pips-text">1 → 5</span>`
        : [1, 2, 3, 4, 5]
            .map((i) => `<span class="pip ${i <= Number(key) ? "on" : ""}"></span>`)
            .join("");

      return `
        <button class="level-card lvl-${key}" data-level="${key}" type="button">
          <div class="level-top">
            <span class="level-num">${isShuffle ? "?" : key}</span>
            <span class="level-icon">${lvl.icon}</span>
          </div>
          <h3>${isShuffle ? "" : "Niveau " + key + " · "}${lvl.name}</h3>
          <p class="level-desc">${lvl.desc}</p>
          <div class="level-bottom">
            <div class="pips" title="Difficulté">${pips}</div>
            <div class="level-best">
              ${
                record
                  ? `<span class="stars small">${starsHtml(record.stars)}</span><span>${record.score} pts</span>`
                  : `<span class="muted">Jamais joué</span>`
              }
            </div>
          </div>
        </button>`;
    })
    .join("");

  $("level-grid")
    .querySelectorAll(".level-card")
    .forEach((card) =>
      card.addEventListener("click", () => startGame(card.dataset.level))
    );
}

function goToMenu() {
  stopTimer();
  levelKey = null;
  renderMenu();
  showScreen("menu");
}

function askQuit() {
  const inGame = screens.game.classList.contains("active");
  if (inGame && !confirm("Quitter la partie en cours ?")) return;
  goToMenu();
}

/* =========================================================
   Partie
   ========================================================= */
function buildQuestions(key) {
  let list = quizz.map((f) => ({ ...f }));

  if (key === "shuffle") {
    list = shuffleArray(list);
    list.forEach((q) => (q.level = 1 + Math.floor(Math.random() * 5)));
  } else {
    list.forEach((q) => (q.level = Number(key)));
  }

  list.forEach((q) => {
    const cfg = LEVELS[q.level];
    if (cfg.mode === "qcm") {
      const wrong = shuffleArray(quizz.filter((f) => f.reponse !== q.reponse))
        .slice(0, 3)
        .map((f) => f.reponse);
      q.choices = shuffleArray([q.reponse, ...wrong]);
    }
    if (cfg.effect === "zoom") {
      const x = 25 + Math.round(Math.random() * 50);
      const y = 25 + Math.round(Math.random() * 50);
      q.origin = `${x}% ${y}%`;
    }
  });

  return list;
}

function startGame(key) {
  levelKey = key;
  questions = buildQuestions(key);
  score = 0;
  attempts = LEVELS[key].lives;
  currentQuestion = 0;
  streak = 0;
  bestStreak = 0;
  results = [];
  showScreen("game");
  nextQuestion();
}

function updateHud() {
  const lvl = LEVELS[levelKey];
  const maxLives = lvl.lives;
  const hearts = Array.from({ length: maxLives }, (_, i) =>
    `<span class="heart ${i < attempts ? "" : "lost"}">♥</span>`
  ).join("");

  $("hud-level").textContent = `${lvl.icon} ${lvl.name}`;
  $("hud-lives").innerHTML = hearts;
  $("hud-lives").title = `${attempts} vie(s) restante(s)`;
  $("hud-score").textContent = score;

  const done = Math.min(currentQuestion, questions.length);
  $("progress-fill").style.width = `${(done / questions.length) * 100}%`;
  $("progress-text").textContent = `${Math.min(currentQuestion + 1, questions.length)}/${questions.length}`;
}

function nextQuestion() {
  stopTimer();

  if (currentQuestion >= questions.length || attempts <= 0) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];
  const cfg = LEVELS[q.level];
  hint_asked = false;
  nearMissUsed = false;
  locked = false;
  updateHud();

  const answerZone =
    cfg.mode === "qcm"
      ? `<div class="choices">
          ${q.choices
            .map(
              (c, i) => `
            <button class="choice" type="button" data-answer="${c}">
              <span class="choice-key">${i + 1}</span>${prettyName(c)}
            </button>`
            )
            .join("")}
        </div>`
      : `<form id="answer-form" class="answer-form" autocomplete="off">
          <input type="text" id="answer" placeholder="ex. gomu gomu no mi" aria-label="Votre réponse" />
          <button type="submit" class="bouton">Valider</button>
        </form>`;

  $("question-container").innerHTML = `
    <div class="q-head">
      ${levelKey === "shuffle" ? `<span class="q-badge lvl-${q.level}">Niv. ${q.level} · ${cfg.name}</span>` : ""}
      <span class="q-points">+${cfg.points} pts</span>
    </div>

    ${
      cfg.timer
        ? `<div class="timer" aria-hidden="true"><div class="timer-fill" id="timer-fill"></div></div>
           <p class="timer-text"><span id="timer-text">${cfg.timer}</span> s</p>`
        : ""
    }

    <div class="fruit-frame fx-${cfg.effect} anime" id="fruit-frame">
      <img src="${q.img}" alt="Fruit du démon à deviner" ${q.origin ? `style="transform-origin:${q.origin}"` : ""} />
    </div>

    <p class="prompt">Quel est ce Fruit du Démon ?</p>
    <div id="answer-zone">${answerZone}</div>
    <p id="feedback" class="feedback" aria-live="polite"></p>
    <p id="hint" class="hint"></p>

    <div class="actions" id="actions">
      <button id="hint-btn" class="bouton bouton-secondaire bouton-petit" type="button">💡 Indice (−${cfg.malus} pts)</button>
      <button id="skip-btn" class="bouton bouton-secondaire bouton-petit" type="button">Passer (−1 ♥)</button>
    </div>
  `;

  // Événements
  if (cfg.mode === "qcm") {
    document.querySelectorAll(".choice").forEach((btn) =>
      btn.addEventListener("click", () => checkAnswer(btn.dataset.answer, btn))
    );
  } else {
    $("answer-form").addEventListener("submit", (e) => {
      e.preventDefault();
      checkAnswer($("answer").value);
    });
    $("answer").focus();
  }
  $("hint-btn").addEventListener("click", showHint);
  $("skip-btn").addEventListener("click", skipQuestion);

  if (cfg.timer) startTimer(cfg.timer);
}

function update_score() {
  const cfg = LEVELS[questions[currentQuestion].level];
  const base = hint_asked ? cfg.points - cfg.malus : cfg.points;
  const timeBonus = cfg.timer ? Math.ceil(timeLeft / 2) : 0;
  const streakBonus = streak >= STREAK_MIN ? STREAK_BONUS : 0;
  const total = base + timeBonus + streakBonus;
  score += total;
  return { base, timeBonus, streakBonus, total };
}

function checkAnswer(rawAnswer, choiceBtn) {
  if (locked) return;

  const q = questions[currentQuestion];
  const cfg = LEVELS[q.level];
  const userAnswer = normalize(rawAnswer || "");
  const feedback = $("feedback");

  if (!userAnswer) {
    feedback.className = "feedback warn";
    feedback.textContent = "Écris une réponse avant de valider.";
    return;
  }

  if (isCorrect(userAnswer, q.reponse)) {
    streak++;
    bestStreak = Math.max(bestStreak, streak);
    const gained = update_score();
    if (streak >= STREAK_MIN) toast(`🔥 Série de ${streak} !`);
    if (choiceBtn) choiceBtn.classList.add("correct");
    resolveQuestion(true, gained);
    return;
  }

  // Faute de frappe proche : un avertissement gratuit par question
  if (cfg.mode === "text" && !nearMissUsed && isNearMiss(userAnswer, q.reponse)) {
    nearMissUsed = true;
    feedback.className = "feedback warn";
    feedback.textContent = "Presque ! Vérifie l'orthographe (aucune vie perdue).";
    return;
  }

  attempts--;
  streak = 0;
  updateHud();
  shake();

  if (choiceBtn) {
    choiceBtn.classList.add("wrong");
    choiceBtn.disabled = true;
  }

  if (attempts <= 0) {
    resolveQuestion(false, null, "Plus de vies !");
    return;
  }

  feedback.className = "feedback bad";
  feedback.textContent = `Raté ! Il te reste ${attempts} vie${attempts > 1 ? "s" : ""}.`;
  const input = $("answer");
  if (input) input.select();
}

function showHint() {
  if (locked || hint_asked) return;
  hint_asked = true;
  $("hint").textContent = questions[currentQuestion].indice;
  $("hint-btn").disabled = true;
}

function skipQuestion() {
  if (locked) return;
  attempts--;
  streak = 0;
  updateHud();
  resolveQuestion(false, null, "Question passée.");
}

function timeUp() {
  if (locked) return;
  attempts--;
  streak = 0;
  updateHud();
  shake();
  resolveQuestion(false, null, "⏱ Temps écoulé !");
}

// Affiche la bonne réponse puis propose de passer à la suite
function resolveQuestion(found, gained, reason = "") {
  locked = true;
  stopTimer();
  const q = questions[currentQuestion];
  results.push({ ...q, found, hint: hint_asked, gained: gained ? gained.total : 0 });

  const frame = $("fruit-frame");
  frame.classList.remove("anime", "shake");
  frame.classList.add("revealed", found ? "trouver" : "rate");
  $("hint").textContent = "";

  // QCM : surligner la bonne réponse
  document.querySelectorAll(".choice").forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.answer === q.reponse) btn.classList.add("correct");
  });
  const input = $("answer");
  if (input) input.disabled = true;

  const feedback = $("feedback");
  if (found) {
    const extras = [];
    if (gained.timeBonus) extras.push(`+${gained.timeBonus} rapidité`);
    if (gained.streakBonus) extras.push(`+${gained.streakBonus} série`);
    feedback.className = "feedback good";
    feedback.innerHTML = `
      <strong>Bravo ! ${prettyName(q.reponse)}</strong>
      <span class="reveal-sub">Porteur : ${q.porteur} · +${gained.total} pts${extras.length ? ` (${extras.join(", ")})` : ""}</span>`;
  } else {
    feedback.className = "feedback bad";
    feedback.innerHTML = `
      <strong>${reason} C'était ${prettyName(q.reponse)}</strong>
      <span class="reveal-sub">Porteur : ${q.porteur}</span>`;
  }

  const isLast = currentQuestion + 1 >= questions.length || attempts <= 0;
  $("actions").innerHTML = `
    <button id="next-btn" class="bouton" type="button">
      ${isLast ? "Voir le résultat" : "Question suivante"} →
    </button>`;
  $("next-btn").addEventListener("click", goNext);
  $("next-btn").focus();
}

function goNext() {
  currentQuestion++;
  nextQuestion();
}

function shake() {
  const card = $("fruit-frame");
  if (!card) return;
  card.classList.remove("anime", "shake");
  void card.offsetWidth; // relance l'animation
  card.classList.add("shake");
}

/* ---------- Chrono ---------- */
function startTimer(seconds) {
  timeLeft = seconds;
  const fill = $("timer-fill");
  const text = $("timer-text");
  const startedAt = performance.now();

  timerId = setInterval(() => {
    timeLeft = Math.max(0, seconds - (performance.now() - startedAt) / 1000);
    const ratio = timeLeft / seconds;
    if (fill) {
      fill.style.width = `${ratio * 100}%`;
      fill.classList.toggle("danger", ratio < 0.3);
    }
    if (text) text.textContent = Math.ceil(timeLeft);
    if (timeLeft <= 0) timeUp();
  }, 100);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

/* =========================================================
   Fin de partie
   ========================================================= */
function endGame() {
  stopTimer();

  const maxScore = questions.reduce((sum, q) => sum + LEVELS[q.level].points, 0);
  const ratio = score / maxScore;
  const found = results.filter((r) => r.found).length;
  const survived = attempts > 0;
  let stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : ratio >= 0.3 ? 1 : 0;
  if (!survived) stars = Math.min(stars, 2); // pas de 3 étoiles en cas de naufrage

  const best = loadBest()[levelKey];
  const isRecord = !best || score > best.score;
  if (isRecord) saveBest(levelKey, { score, stars: Math.max(stars, best ? best.stars : 0) });
  else if (stars > best.stars) saveBest(levelKey, { score: best.score, stars });

  const title = !survived
    ? "Naufrage…"
    : found === questions.length && stars === 3
    ? "Roi des Pirates !"
    : "Traversée terminée";

  const recap = questions
    .map((q, i) => {
      const r = results[i];
      const status = !r ? "unplayed" : r.found ? "found" : "missed";
      const label = !r ? "Non joué" : r.found ? `+${r.gained} pts${r.hint ? " · indice" : ""}` : "Raté";
      return `
        <li class="recap-item ${status}">
          <img src="${q.img}" alt="" />
          <div>
            <strong>${status === "unplayed" ? "???" : prettyName(q.reponse)}</strong>
            <span>${status === "unplayed" ? "" : q.porteur + " · "}${label}</span>
          </div>
          <span class="recap-mark">${status === "found" ? "✓" : status === "missed" ? "✗" : "–"}</span>
        </li>`;
    })
    .join("");

  $("end-container").innerHTML = `
    <div class="trophee ${survived ? "" : "perdu"}">${survived ? "🏆" : "☠️"}</div>
    <p class="eyebrow">${LEVELS[levelKey].icon} ${levelKey === "shuffle" ? "" : "Niveau " + levelKey + " · "}${LEVELS[levelKey].name}</p>
    <h2 class="end-titre">${title}</h2>
    <div class="stars big">${starsHtml(stars)}</div>
    <p class="final-score"><span>${score}</span> pts</p>
    ${isRecord && score > 0 ? `<p class="record">Nouveau record !</p>` : best ? `<p class="muted">Record : ${best.score} pts</p>` : ""}

    <div class="stats">
      <div class="stat"><span class="stat-valeur">${found}/${questions.length}</span><span class="stat-label">Trouvés</span></div>
      <div class="stat"><span class="stat-valeur">${bestStreak}</span><span class="stat-label">Série max</span></div>
      <div class="stat"><span class="stat-valeur">${Math.max(attempts, 0)}</span><span class="stat-label">Vies</span></div>
    </div>

    <ul class="recap">${recap}</ul>

    <div class="actions">
      <button id="replay-btn" class="bouton" type="button">↻ RECOMMENCER</button>
      <button id="menu-btn" class="bouton bouton-secondaire" type="button">MENU</button>
    </div>
  `;

  $("replay-btn").addEventListener("click", () => startGame(levelKey));
  $("menu-btn").addEventListener("click", goToMenu);
  showScreen("end");
}

/* =========================================================
   Raccourcis clavier & initialisation
   ========================================================= */
document.addEventListener("keydown", (e) => {
  if (!screens.game.classList.contains("active")) return;
  const typing = document.activeElement && document.activeElement.tagName === "INPUT";

  if (locked && e.key === "Enter" && document.activeElement !== $("next-btn")) {
    e.preventDefault();
    goNext();
    return;
  }
  if (locked || typing) return;

  if (["1", "2", "3", "4"].includes(e.key)) {
    const btn = document.querySelectorAll(".choice")[Number(e.key) - 1];
    if (btn && !btn.disabled) btn.click();
  } else if (e.key.toLowerCase() === "i") {
    showHint();
  }
});

$("quit-btn").addEventListener("click", askQuit);
$("brand").addEventListener("click", askQuit);

renderMenu();
