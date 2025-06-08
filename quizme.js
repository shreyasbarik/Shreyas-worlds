const quizSelect = document.getElementById('quiz-select');
const quizContainer = document.getElementById('quiz-container');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const choicesList = document.querySelector('.choices');
const timerDisplay = document.getElementById('timer');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 60;
let answered = false;

const quizzes = {
  quiz1: {
    name: "Science Quiz",
    questions: [
      {q: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "HO"], answer: 1},
      {q: "What planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: 2},
      {q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2},
      {q: "What part of the cell contains DNA?", options: ["Cytoplasm", "Nucleus", "Cell Membrane", "Mitochondria"], answer: 1},
      {q: "What force keeps us on the ground?", options: ["Magnetism", "Gravity", "Friction", "Electricity"], answer: 1},
      {q: "What organ pumps blood through the body?", options: ["Brain", "Heart", "Lungs", "Liver"], answer: 1},
      {q: "What is the boiling point of water?", options: ["100°C", "90°C", "80°C", "110°C"], answer: 0},
      {q: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B12"], answer: 2},
      {q: "What is the hardest natural substance?", options: ["Gold", "Diamond", "Iron", "Quartz"], answer: 1},
      {q: "What gas do humans breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 0},
      {q: "Which planet has rings?", options: ["Venus", "Mars", "Saturn", "Mercury"], answer: 2},
      {q: "What do bees collect from flowers?", options: ["Nectar", "Pollen", "Water", "Leaves"], answer: 0},
      {q: "What is the main source of energy for the Earth?", options: ["Moon", "Sun", "Stars", "Volcanoes"], answer: 1},
      {q: "What type of energy comes from the sun?", options: ["Thermal", "Solar", "Kinetic", "Electric"], answer: 1},
      {q: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "Na2SO4", "CaCl2"], answer: 0}
    ]
  },
  quiz2: {
    name: "Mathematics Quiz",
    questions: [
      {q: "What is 12 × 12?", options: ["144", "124", "134", "142"], answer: 0},
      {q: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: 2},
      {q: "What is 15% of 200?", options: ["25", "30", "35", "40"], answer: 1},
      {q: "What is the next prime number after 7?", options: ["9", "10", "11", "13"], answer: 2},
      {q: "What is 9 + 10?", options: ["18", "19", "20", "21"], answer: 1},
      {q: "What is the value of π (pi) approximately?", options: ["3.12", "3.14", "3.15", "3.13"], answer: 1},
      {q: "What is the perimeter of a square with side 5?", options: ["10", "15", "20", "25"], answer: 2},
      {q: "If x + 5 = 12, what is x?", options: ["5", "6", "7", "8"], answer: 2},
      {q: "What is 7 × 8?", options: ["54", "56", "58", "60"], answer: 1},
      {q: "What is 100 ÷ 4?", options: ["20", "25", "30", "35"], answer: 1},
      {q: "What is the sum of angles in a triangle?", options: ["90°", "180°", "270°", "360°"], answer: 1},
      {q: "What is 2³?", options: ["6", "8", "10", "12"], answer: 1},
      {q: "What is 0.5 as a fraction?", options: ["1/4", "1/3", "1/2", "2/3"], answer: 2},
      {q: "What is the area of a rectangle with length 8 and width 3?", options: ["24", "22", "26", "30"], answer: 0},
      {q: "What is 5 squared?", options: ["10", "20", "25", "30"], answer: 2}
    ]
  },
  quiz3: {
    name: "General Knowledge Quiz",
    questions: [
      {q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], answer: 1},
      {q: "Who wrote 'Harry Potter'?", options: ["J.K. Rowling", "Tolkien", "C.S. Lewis", "Roald Dahl"], answer: 0},
      {q: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2},
      {q: "What is the tallest mountain in the world?", options: ["K2", "Everest", "Kangchenjunga", "Lhotse"], answer: 1},
      {q: "Who was the first President of the USA?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: 1},
      {q: "Which country is known as the Land of the Rising Sun?", options: ["China", "South Korea", "Japan", "Thailand"], answer: 2},
      {q: "What is the smallest continent?", options: ["Europe", "Australia", "Antarctica", "South America"], answer: 1},
      {q: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Tesla"], answer: 1},
      {q: "Which language is primarily spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "English"], answer: 1},
      {q: "What is the main ingredient in sushi?", options: ["Chicken", "Fish", "Beef", "Pork"], answer: 1},
      {q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2},
      {q: "Which planet is closest to the sun?", options: ["Earth", "Mercury", "Venus", "Mars"], answer: 1},
      {q: "What color do you get by mixing red and white?", options: ["Pink", "Purple", "Orange", "Brown"], answer: 0},
      {q: "What is the currency of Japan?", options: ["Yen", "Won", "Dollar", "Euro"], answer: 0},
      {q: "Which animal is known as the King of the Jungle?", options: ["Tiger", "Elephant", "Lion", "Cheetah"], answer: 2}
    ]
  }
};

function shuffleArray(arr) {
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startQuiz(quizKey) {
  if (!quizzes[quizKey]) return;
  currentQuiz = quizzes[quizKey];
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  resultDiv.textContent = '';
  restartBtn.style.display = 'none';
  quizContainer.style.display = 'block';
  nextBtn.style.display = 'inline-block';
  nextBtn.disabled = true;
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  timeLeft = 60;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableChoices();
      nextBtn.disabled = false;
      if (!answered) {
        answered = true;
      }
    }
  }, 1000);

  const q = currentQuiz.questions[currentQuestionIndex];
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
  questionText.textContent = q.q;

  // Clear previous choices
  choicesList.innerHTML = '';
  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.setAttribute('role', 'option');
    li.tabIndex = 0;
    li.addEventListener('click', () => selectAnswer(i));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectAnswer(i);
      }
    });
    choicesList.appendChild(li);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const q = currentQuiz.questions[currentQuestionIndex];
  const correctIndex = q.answer;

  // Highlight all choices
  Array.from(choicesList.children).forEach((li, i) => {
    li.classList.remove('selected');
    li.style.pointerEvents = 'none';
    if (i === correctIndex) {
      li.style.backgroundColor = '#4CAF50'; // green correct
      li.style.color = '#fff';
    } else if (i === index) {
      li.style.backgroundColor = '#f44336'; // red wrong
      li.style.color = '#fff';
    }
  });

  if (index === correctIndex) {
    score++;
  }
  nextBtn.disabled = false;
}

function disableChoices() {
  Array.from(choicesList.children).forEach(li => {
    li.style.pointerEvents = 'none';
  });
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex >= currentQuiz.questions.length) {
    endQuiz();
  } else {
    loadQuestion();
  }
});

restartBtn.addEventListener('click', () => {
  quizContainer.style.display = 'none';
  restartBtn.style.display = 'none';
  resultDiv.textContent = '';
  quizSelect.value = '';
});

quizSelect.addEventListener('change', () => {
  if (quizSelect.value) {
    startQuiz(quizSelect.value);
  } else {
    quizContainer.style.display = 'none';
    resultDiv.textContent = '';
    restartBtn.style.display = 'none';
  }
});

function endQuiz() {
  clearInterval(timer);
  quizContainer.style.display = 'none';
  resultDiv.innerHTML = `<p>You scored <strong>${score}</strong> out of <strong>${currentQuiz.questions.length}</strong> in the <em>${currentQuiz.name}</em>!</p>`;
  restartBtn.style.display = 'inline-block';
}
