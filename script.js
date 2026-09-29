const questions = [
  {
    question: "Что делает document.getElementById()?",
    options: ["Создаёт элемент", "Находит элемент по id", "Удаляет элемент", "Меняет стиль"],
    correct: 1   // индекс правильного ответа (считаем с нуля)
  },
  {
    question: "Какой тег делает текст жирным?",
    options: ["<b>", "<i>", "<strong>", "Оба: <b> и <strong>"],
    correct: 3
  },
  {
    question: "Что вернёт 10 % 3?",
    options: ["3", "1", "0", "3.33"],
    correct: 1
  },
  {
    question: "Как добавить элемент в конец массива?",
    options: ["array.add()", "array.push()", "array.append()", "array.insert()"],
    correct: 1
  },
  {
    question: "Что означает === в JavaScript?",
    options: ["Присвоить значение", "Сравнить только значение", "Сравнить значение и тип", "Логическое ИЛИ"],
    correct: 2
  },
  {
    question: "Как объявить переменную, которую нельзя переопределить?",
  options: ["let x", "const x", "var x", "Все варианты"],
  correct: 1
},
{
  question: "Что вернёт typeof null?",
  options: ["'null'", "'object'", "'undefined'", "'boolean'"],
  correct: 1
},
];

let currentQuestion = 0;   // индекс текущего вопроса
let score = 0;              // счёт
let answered = false;       // защита от повторного клика

// Находим элементы
let questionText = document.getElementById("questionText");
let optionsContainer = document.getElementById("optionsContainer");
let nextBtn = document.getElementById("nextBtn");
let progressText = document.getElementById("progressText");
let progressFill = document.getElementById("progressFill");
let quizCard = document.getElementById("quizCard");
let resultCard = document.getElementById("resultCard");
let resultTitle = document.getElementById("resultTitle");
let resultScore = document.getElementById("resultScore");
let restartBtn = document.getElementById("restartBtn");

function showQuestion() {
  let q = questions[currentQuestion];
  answered = false;
  nextBtn.style.display = "none";

  // Прогресс
  let progress = ((currentQuestion) / questions.length) * 100;
  progressFill.style.width = progress + "%";
  progressText.textContent = "Вопрос " + (currentQuestion + 1) + " из " + questions.length;

  // Вопрос
  questionText.textContent = q.question;

  // Варианты ответов
  optionsContainer.innerHTML = "";
  q.options.forEach(function(option, index) {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", function() {
      selectAnswer(index, btn);
    });
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, selectedBtn) {
  if (answered) return;   // защита от повторного клика
  answered = true;

  let correct = questions[currentQuestion].correct;

  if (selectedIndex === correct) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    // Подсветить правильный ответ
    optionsContainer.children[correct].classList.add("correct");
  }

  nextBtn.style.display = "block";
}

function showResult() {
  quizCard.style.display = "none";
  resultCard.style.display = "block";

  let percent = Math.round((score / questions.length) * 100);

  if (percent === 100) {
    resultTitle.textContent = "Идеально! 🏆";
  } else if (percent >= 60) {
    resultTitle.textContent = "Хороший результат! 👍";
  } else {
    resultTitle.textContent = "Можно лучше 💪";
  }

  resultScore.textContent = "Правильных ответов: " + score + " из " + questions.length + " (" + percent + "%)";
}

nextBtn.addEventListener("click", function() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", function() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  quizCard.style.display = "block";
  resultCard.style.display = "none";
  showQuestion();
});

// Запуск
showQuestion();