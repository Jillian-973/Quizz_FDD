let quizz = [
  {
    img: "img/gomugomu.jpg",
    reponse: "gomu gomu no mi",
    indice: "le porteur du fruit est Luffy",
  },
  {
    img: "img/gorogoro.jpg",
    reponse: "goro goro no mi",
    indice: "le porteur du fruit est Ener",
  },
  {
    img: "img/guragura.png",
    reponse: "gura gura no mi",
    indice: "le porteur du fruit est Barbe blanche",
  },
  {
    img: "img/hitohito.jpg",
    reponse: "hito hito no mi",
    indice: "le porteur du fruit est Chopper",
  },
  {
    img: "img/kagekage.jpg",
    reponse: "kage kage no mi",
    indice: "le porteur du fruit est Gecko Moria",
  },
  {
    img: "img/meramera.jpg",
    reponse: "mera mera no mi",
    indice: "le porteur du fruit est Ace",
  },
  {
    img: "img/opeope.jpg",
    reponse: "ope ope no mi",
    indice: "le porteur du fruit est Trafalgar Law",
  },
  {
    img: "img/sunasuna.jpg",
    reponse: "suna suna no mi",
    indice: "le porteur du fruit est Crocodile",
  },
  {
    img: "img/yamiyami.jpg",
    reponse: "yami yami no mi",
    indice: "le porteur du fruit est Barbe Noire",
  },
  {
    img: "img/yomiyomi.jpg",
    reponse: "yomi yomi no mi",
    indice: "le porteur du fruit est Brook",
  },
];

let score = 0;
let attempts = 5;
let currentQuestion = 0;
const MALUS = 5;
const POINT_PER_ANS = 10;
let hint_asked = false;

function endGame() {
  if (currentQuestion >= quizz.length || attempts <= 0) {
    document.getElementById(
      "question-container"
    ).innerHTML = `<h2>Score final: ${score}</h2>
                        <button>Recommencer</button>`;
    return;
  }
}

function nextQuestion() {
  if (currentQuestion >= quizz.length || attempts <= 0) {
    document.getElementById(
      "question-container"
    ).innerHTML = `<h2>Score final: ${score}</h2>
                    <button>Recommencer</button>`;
    return;
  }

  const question = quizz[currentQuestion];
  document.getElementById("question-container").innerHTML = `
        <img src="${question.img}" alt="Image question" style="width:200px;height:200px;" />
        <p>Tentatives restantes: ${attempts}</p>
        <p>Score: ${score}</p>
        <input type="text" id="answer" placeholder="Votre réponse" />
        <button onclick="checkAnswer()">Valider</button>
        <button onclick="showHint()">Indice (-5 points)</button>
        <p id="hint"></p>
    `;
  hint_asked = false;
}

function update_score() {
  if (hint_asked) {
    score += POINT_PER_ANS - MALUS;
  } else {
    score += POINT_PER_ANS;
  }
}

function checkAnswer() {
  const userAnswer = document
    .getElementById("answer")
    .value.trim()
    .toLowerCase();
  const correctAnswer = quizz[currentQuestion].reponse.toLowerCase();

  if (userAnswer === correctAnswer) {
    update_score();
    currentQuestion++;
  } else {
    attempts--;
  }

  nextQuestion();
}

function showHint() {
  document.getElementById("hint").textContent = quizz[currentQuestion].indice;
  hint_asked = true;
}

nextQuestion();
