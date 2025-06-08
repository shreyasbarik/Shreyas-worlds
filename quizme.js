// quizme.js
// Data and logic for Quize Me feature

// Quiz questions data structured by subject + quiz number
export const quizzes = {
  physics1: [
    {
      question: "What is the unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      answer: 0,
    },
    // ... (14 more questions)
  ],
  physics2: [
    {
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "12 m/s²"],
      answer: 0,
    },
    // ... (14 more questions)
  ],
  chemistry1: [
    {
      question: "What is the chemical formula of water?",
      options: ["H2O", "CO2", "O2", "H2"],
      answer: 0,
    },
    // ... (14 more questions)
  ],
  chemistry2: [
    {
      question: "What is the pH of pure water?",
      options: ["7", "5", "3", "9"],
      answer: 0,
    },
    // ... (14 more questions)
  ],
  biology1: [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
      answer: 0,
    },
    // ... (14 more questions)
  ],
};

// Below is the quiz logic, timer, scoring, UI rendering, and Firebase saving

import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

const subjectSelect = document.getElementById("subjectSelect");
const startBtn = document.getElementById("startQuizBtn");
const quizContent = document.getElementById("quizContent");
const questionBox = document.getElementById("questionBox");
const optionsList = document.getElementById("optionsList");
const nextBtn = document.getElementById("nextBtn");
const timerDisplay = document.getElementById("timer");
const resultBox = document.getElementById("resultBox");
const scoreDisplay = document.getElementById("score");
const motivationalMsg = document.getElementById("motivationalMsg");
const restartBtn = document.getElementById("restartBtn");

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let answered = false;
let selectedSubject = "";

subjectSelect.addEventListener("change", () => {
  startBtn.disabled = !subjectSelect.value;
});

startBtn.addEventListener("click", () => {
  selectedSubject = subjectSelect.value;
  startQuiz(selectedSubject);
});

nextBtn.addEventListener("click", () => {
  if (!answered) return;
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    renderQuestion();
  } else {
    endQuiz();
  }
});

restartBtn.addEventListener("click", () => {
  resetQuiz();
});

function startQuiz(subject) {
  currentQuiz = quizzes[subject];
  currentQuestionIndex = 0;
  score = 0;
  quizContent.classList.remove("hidden");
  resultBox.classList.add("hidden");
  subjectSelect.disabled = true;
  startBtn.disabled = true;
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  nextBtn.disabled = true;
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;
  questionBox.textContent = `Q${currentQuestionIndex + 1}. ${currentQuiz[currentQuestionIndex].question}`;
  optionsList.innerHTML = "";

  currentQuiz[currentQuestionIndex].options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.classList.add("option");
    li.tabIndex = 0;
    li.addEventListener("click", () => selectAnswer(index));
    li.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") selectAnswer(index);
    });
    optionsList.appendChild(li);
  });

  startTimer();
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  nextBtn.disabled = false;
  const correctIndex = currentQuiz[currentQuestionIndex].answer;
  if (index === correctIndex) {
    score++;
  }

  // Highlight answers
  Array.from(optionsList.children).forEach((li, i) => {
    li.classList.remove("correct", "wrong");
    if (i === correctIndex) li.classList.add("correct");
    if (i === index && i !== correctIndex) li.classList.add("wrong");
  });
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      answered = true;
      nextBtn.disabled = false;
      selectAnswer(-1); // no answer selected, mark as wrong
    }
  }, 1000);
}

function endQuiz() {
  quizContent.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreDisplay.textContent = score;

  let msg = "";
  if (score === 15) msg = "Perfect! You’re a Genius! 🌟";
  else if (score >= 12) msg = "Awesome! Keep up the great work! 💪";
  else if (score >= 8) msg = "Good job! Practice more for mastery. 📚";
  else msg = "Don't give up! Try again and improve! 🔥";

  motivationalMsg.textContent = msg;

  // Save result to Firebase Firestore if user logged in
  const user = auth.currentUser;
  if (user) {
    addDoc(collection(db, "quizResults"), {
      subject,
      quizNumber: selectedSubject,
      score,
      timestamp: serverTimestamp(),
      userId: user.uid,
      userEmail: user.email,
    }).catch((error) => {
      console.error("Error saving quiz result:", error);
    });
  }
}

function resetQuiz() {
  subjectSelect.disabled = false;
  startBtn.disabled = true;
  quizContent.classList.add("hidden");
  resultBox.classList.add("hidden");
  subjectSelect.value = "";
  currentQuestionIndex = 0;
  score = 0;
}
