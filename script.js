/* =========================================================
   QUIZZ FDD — Devine le Fruit du Démon
   ========================================================= */

/* ---------- Les fruits ----------
   rarete : 1 = très connu · 2 = connu · 3 = pour les experts
   modele : (optionnel) modèle du fruit Zoan, affiché à la révélation
   imgWeb : (optionnel) adresse web utilisée si le fichier local manque
   Un fruit dont aucune image ne se charge est ignoré automatiquement. */
const quizz = [
  // --- Rareté 1 : les incontournables ---
  { img: "img/gomugomu.png", reponse: "gomu gomu no mi", porteur: "Luffy", rarete: 1 },
  { img: "img/meramera.jpg", reponse: "mera mera no mi", porteur: "Ace", rarete: 1 },
  { img: "img/guragura.png", reponse: "gura gura no mi", porteur: "Barbe Blanche", rarete: 1 },
  { img: "img/yamiyami.png", reponse: "yami yami no mi", porteur: "Barbe Noire", rarete: 1 },
  { img: "img/opeope.png", reponse: "ope ope no mi", porteur: "Trafalgar Law", rarete: 1 },
  { img: "img/gorogoro.jpg", reponse: "goro goro no mi", porteur: "Ener", rarete: 1 },
  { img: "img/hitohito.png", reponse: "hito hito no mi", porteur: "Chopper", rarete: 1 },
  { img: "img/sunasuna.jpg", reponse: "suna suna no mi", porteur: "Crocodile", rarete: 1 },
  { img: "img/yomiyomi.png", reponse: "yomi yomi no mi", porteur: "Brook", rarete: 1 },
  { img: "img/barabara.png", reponse: "bara bara no mi", porteur: "Baggy", rarete: 1 },
  { img: "img/hanahana.png", reponse: "hana hana no mi", porteur: "Nico Robin", rarete: 1 },
  { img: "img/itoito.png", reponse: "ito ito no mi", porteur: "Doflamingo", rarete: 1 },
  // --- Rareté 2 : les classiques ---
  { img: "img/kagekage.png", reponse: "kage kage no mi", porteur: "Gecko Moria", rarete: 2 },
  { img: "img/nikyunikyu.png", reponse: "nikyu nikyu no mi", porteur: "Bartholomew Kuma", rarete: 2 },
  { img: "img/bomubomu.png", reponse: "bomu bomu no mi", porteur: "Mr. 5", rarete: 2 },
  { img: "img/supasupa.png", reponse: "supa supa no mi", porteur: "Mr. 1 (Daz Bones)", rarete: 2 },
  { img: "img/dorudoru.png", reponse: "doru doru no mi", porteur: "Mr. 3", rarete: 2 },
  { img: "img/jikijiki.png", reponse: "jiki jiki no mi", porteur: "Eustass Kid", rarete: 2 },
  { img: "img/uouo.jpg", reponse: "uo uo no mi", modele: "Seiryu", porteur: "Kaido", rarete: 2 },
  { img: "img/inuinu.png", reponse: "inu inu no mi", modele: "Okuchi no Makami", porteur: "Yamato", rarete: 2 },
  // --- Rareté 3 : pour les experts ---
  { img: "img/subesube.png", reponse: "sube sube no mi", porteur: "Alvida", rarete: 3 },
  { img: "img/kilokilo.png", reponse: "kilo kilo no mi", porteur: "Miss Valentine", rarete: 3 },
  { img: "img/bakubaku.png", reponse: "baku baku no mi", porteur: "Wapol", rarete: 3 },
  { img: "img/togetoge.png", reponse: "toge toge no mi", porteur: "Miss Doublefinger", rarete: 3 },
  { img: "img/awaawa.png", reponse: "awa awa no mi", porteur: "Kalifa", rarete: 3 },
  { img: "img/shiroshiro.png", reponse: "shiro shiro no mi", porteur: "Capone Bege", rarete: 3 },

  // --- Image chargée depuis le web (wiki One Piece) si le fichier local est absent ---
  { img: "img/hiehie.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/5/56/Hie_Hie_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "hie hie no mi", porteur: "Aokiji", rarete: 1 },
  { img: "img/pikapika.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/6/66/Pika_Pika_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "pika pika no mi", porteur: "Kizaru", rarete: 1 },
  { img: "img/magumagu.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/0/07/Magu_Magu_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "magu magu no mi", porteur: "Akainu", rarete: 1 },
  { img: "img/meromero.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/9/98/Mero_Mero_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "mero mero no mi", porteur: "Boa Hancock", rarete: 1 },
  { img: "img/mokumoku.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/8/8d/Moku_Moku_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "moku moku no mi", porteur: "Smoker", rarete: 2 },
  { img: "img/sorusoru.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/9/9d/Soru_Soru_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "soru soru no mi", porteur: "Big Mom", rarete: 2 },
  { img: "img/mochimochi.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/2/2c/Mochi_Mochi_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "mochi mochi no mi", porteur: "Katakuri", rarete: 2 },
  { img: "img/gasugasu.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/c/cf/Gasu_Gasu_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "gasu gasu no mi", porteur: "Caesar Clown", rarete: 2 },
  { img: "img/horohoro.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/1/14/Horo_Horo_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "horo horo no mi", porteur: "Perona", rarete: 2 },
  { img: "img/dokudoku.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/2/21/Doku_Doku_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "doku doku no mi", porteur: "Magellan", rarete: 2 },
  { img: "img/manemane.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/1/12/Mane_Mane_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "mane mane no mi", porteur: "Bon Clay (Mr. 2)", rarete: 3 },
  { img: "img/hobihobi.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/3/3d/Hobi_Hobi_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "hobi hobi no mi", porteur: "Sugar", rarete: 3 },
  { img: "img/zushizushi.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/b/ba/Zushi_Zushi_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "zushi zushi no mi", porteur: "Fujitora", rarete: 3 },
  { img: "img/baribari.png", imgWeb: "https://static.wikia.nocookie.net/onepiece/images/d/de/Bari_Bari_no_Mi_Infobox.png/revision/latest/scale-to-width-down/400", reponse: "bari bari no mi", porteur: "Bartolomeo", rarete: 3 },
].map((f) => ({ ...f, indice: `Le porteur du fruit est ${f.porteur}` }));

// Fruits réellement jouables (image trouvée), rempli au démarrage
let fruits = [];

const QUESTIONS_PAR_PARTIE = 10;

/* ---------- Configuration des niveaux ----------
   mode    : "qcm" (4 choix) ou "text" (réponse libre)
   lives   : nombre de vies (tentatives) pour la partie
   timer   : secondes par question (0 = pas de chrono)
   effect  : "none" | "blur" (image floue) | "zoom" (gros plan)
   points  : points pour une bonne réponse
   malus   : points retirés si l'indice a été utilisé
   rarete  : rareté maximale des fruits tirés pour ce niveau       */
const LEVELS = {
  1: {
    name: "Moussaillon", icon: "⚓", mode: "qcm", lives: 5, timer: 0,
    effect: "none", points: 10, malus: 5, rarete: 1,
    desc: "QCM à 4 choix · fruits célèbres · sans chrono",
  },
  2: {
    name: "Pirate", icon: "🏴‍☠️", mode: "qcm", lives: 4, timer: 15,
    effect: "none", points: 15, malus: 5, rarete: 2,
    desc: "QCM à 4 choix · chrono 15 s · 4 vies",
  },
  3: {
    name: "Supernova", icon: "⭐", mode: "text", lives: 5, timer: 0,
    effect: "none", points: 20, malus: 10, rarete: 2,
    desc: "Réponse libre · image nette · sans chrono",
  },
  4: {
    name: "Grand Corsaire", icon: "⚔️", mode: "text", lives: 4, timer: 30,
    effect: "blur", points: 30, malus: 15, rarete: 3,
    desc: "Réponse libre · image floue · chrono 30 s · tous les fruits",
  },
  5: {
    name: "Empereur", icon: "👑", mode: "text", lives: 3, timer: 20,
    effect: "zoom", points: 50, malus: 25, rarete: 3,
    desc: "Réponse libre · gros plan · chrono 20 s · 3 vies",
  },
  shuffle: {
    name: "Shuffle", icon: "🔀", lives: 5, rarete: 3,
    desc: "Tous les fruits · chaque question tire un niveau de 1 à 5 au hasard",
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
function isCorrect(userAnswer, q) {
  const target = normalize(q.reponse);
  if (userAnswer === target || userAnswer + "nomi" === target) return true;
  // Zoan : "uo uo no mi modele seiryu" ou "uo uo no mi seiryu" sont aussi acceptés
  if (!q.modele) return false;
  const modele = normalize(q.modele);
  return userAnswer === target + modele || userAnswer === target + "modele" + modele;
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

// Nom complet affiché, avec le modèle pour les Zoan
function fullName(q) {
  return prettyName(q.reponse) + (q.modele ? `, modèle ${q.modele}` : "");
}

// Vérifie quelles images existent pour ne garder que les fruits jouables
function chargerFruits() {
  return Promise.all(
    quizz.map(
      (f) =>
        new Promise((resolve) => {
          const sources = [f.img, f.imgWeb].filter(Boolean);
          const essayer = (i) => {
            if (i >= sources.length) return resolve(null);
            const img = new Image();
            let fini = false;
            const suivant = (ok) => {
              if (fini) return;
              fini = true;
              clearTimeout(delai);
              if (ok) resolve({ ...f, img: sources[i] });
              else essayer(i + 1);
            };
            // une image qui ne répond pas en 4 s est considérée absente
            const delai = setTimeout(() => suivant(false), 4000);
            img.referrerPolicy = "no-referrer";
            img.onload = () => suivant(true);
            img.onerror = () => suivant(false);
            img.src = sources[i];
          };
          essayer(0);
        })
    )
  ).then((list) => list.filter(Boolean));
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
  const pret = fruits.length > 0; // "…" tant que les images sont vérifiées
  $("nb-fruits").textContent = pret ? fruits.length : "…";
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
            <div class="level-nom">
              <span class="level-label">${isShuffle ? "Mode spécial" : "Niveau " + key}</span>
              <h3>${lvl.name}</h3>
            </div>
            <span class="level-icon">${lvl.icon}</span>
          </div>
          <p class="level-desc">${lvl.desc}</p>
          <div class="level-bottom">
            <div class="pips" title="Difficulté">${pips}</div>
            <span class="level-pool">${pret ? fruits.filter((f) => f.rarete <= lvl.rarete).length : "…"} fruits</span>
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
  // Fruits autorisés pour ce niveau, puis tirage de 10 fruits au hasard
  const pool = fruits.filter((f) => f.rarete <= LEVELS[key].rarete);
  const list = shuffleArray(pool)
    .slice(0, QUESTIONS_PAR_PARTIE)
    .map((f) => ({ ...f }));

  list.forEach((q) => {
    q.level = key === "shuffle" ? 1 + Math.floor(Math.random() * 5) : Number(key);
  });

  list.forEach((q) => {
    const cfg = LEVELS[q.level];
    if (cfg.mode === "qcm") {
      // Les mauvaises réponses viennent du même groupe de fruits
      const wrong = shuffleArray(pool.filter((f) => f.reponse !== q.reponse))
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
  if (fruits.length === 0) return; // fruits pas encore chargés
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
      ${cfg.timer ? `<span class="timer-text"><span id="timer-text">${cfg.timer}</span> s</span>` : ""}
      <span class="q-points">+${cfg.points} pts</span>
    </div>
    ${cfg.timer ? `<div class="timer" aria-hidden="true"><div class="timer-fill" id="timer-fill"></div></div>` : ""}

    <div class="fruit-zone">
      <div class="fruit-frame fx-${cfg.effect} anime" id="fruit-frame">
        <img src="${q.img}" referrerpolicy="no-referrer" alt="Fruit du démon à deviner" ${q.origin ? `style="transform-origin:${q.origin}"` : ""} />
      </div>
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

  if (isCorrect(userAnswer, q)) {
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
      <strong>Bravo ! ${fullName(q)}</strong>
      <span class="reveal-sub">Porteur : ${q.porteur} · +${gained.total} pts${extras.length ? ` (${extras.join(", ")})` : ""}</span>`;
  } else {
    feedback.className = "feedback bad";
    feedback.innerHTML = `
      <strong>${reason} C'était ${fullName(q)}</strong>
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
        <li class="recap-item ${status}" title="${status === "unplayed" ? "Non joué" : fullName(q) + " · " + q.porteur}">
          <img src="${q.img}" referrerpolicy="no-referrer" alt="" />
          <div>
            <strong>${status === "unplayed" ? "???" : prettyName(q.reponse)}</strong>
            <span>${status === "unplayed" ? "" : q.porteur + " · "}${label}</span>
          </div>
          <span class="recap-mark">${status === "found" ? "✓" : status === "missed" ? "✗" : "–"}</span>
        </li>`;
    })
    .join("");

  $("end-container").innerHTML = `
    <div class="fin-titre">
      <div class="trophee ${survived ? "" : "perdu"}">${survived ? "🏆" : "☠️"}</div>
      <div>
        <p class="eyebrow">${LEVELS[levelKey].icon} ${levelKey === "shuffle" ? "" : "Niveau " + levelKey + " · "}${LEVELS[levelKey].name}</p>
        <h2 class="end-titre">${title}</h2>
      </div>
    </div>

    <div class="fin-score">
      <div class="stars big">${starsHtml(stars)}</div>
      <p class="final-score"><span>${score}</span> pts</p>
    </div>
    ${isRecord && score > 0 ? `<p class="record">Nouveau record !</p>` : best ? `<p class="record muted">Record : ${best.score} pts</p>` : ""}

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

// Le menu déroulant « Comment jouer ? » se ferme en cliquant ailleurs ou avec Échap
const deroulant = document.querySelector(".deroulant");
document.addEventListener("click", (e) => {
  if (deroulant.open && !deroulant.contains(e.target)) deroulant.open = false;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") deroulant.open = false;
});

renderMenu();
chargerFruits().then((list) => {
  fruits = list;
  renderMenu();
});
