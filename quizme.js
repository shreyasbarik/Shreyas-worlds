// Firebase config - replace with your config if different
const firebaseConfig = {
  apiKey: "AIzaSyBYEol3wDIUihPTLaM1EjqVkpvjvJ-1_O4",
  authDomain: "my-website-backend-957db.firebaseapp.com",
  projectId: "my-website-backend-957db",
  storageBucket: "my-website-backend-957db.appspot.com",
  messagingSenderId: "75667291929",
  appId: "1:75667291929:web:10878882c9c30574144f88",
  measurementId: "G-8H93W7QZGT"
};

// Initialize Firebase Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const quizzes = {
  "physics-1": [
    {
      question: "What is the unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      answer: 0,
    },
    {
      question: "Which law explains inertia?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
      answer: 0,
    },
    {
      question: "Speed of light is approximately?",
      options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^4 m/s", "3 x 10^3 m/s"],
      answer: 0,
    },
    {
      question: "Which device measures electric current?",
      options: ["Voltmeter", "Ammeter", "Ohmmeter", "Galvanometer"],
      answer: 1,
    },
    {
      question: "Energy is measured in?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      answer: 0,
    },
    {
      question: "The acceleration due to gravity on earth is?",
      options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "9.2 m/s²"],
      answer: 0,
    },
    {
      question: "The formula for kinetic energy is?",
      options: ["1/2 mv²", "mv", "mgh", "F = ma"],
      answer: 0,
    },
    {
      question: "Which of the following is scalar quantity?",
      options: ["Velocity", "Acceleration", "Speed", "Force"],
      answer: 2,
    },
    {
      question: "A device that converts chemical energy into electrical energy is?",
      options: ["Generator", "Battery", "Transformer", "Motor"],
      answer: 1,
    },
    {
      question: "Unit of pressure is?",
      options: ["Pascal", "Newton", "Joule", "Watt"],
      answer: 0,
    },
    {
      question: "Light year is a unit of?",
      options: ["Time", "Speed", "Distance", "Energy"],
      answer: 2,
    },
    {
      question: "Which law explains action and reaction?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
      answer: 2,
    },
    {
      question: "The speed of sound in air is approx?",
      options: ["340 m/s", "300 m/s", "150 m/s", "1000 m/s"],
      answer: 0,
    },
    {
      question: "Which is a vector quantity?",
      options: ["Distance", "Speed", "Velocity", "Time"],
      answer: 2,
    },
    {
      question: "An object thrown upwards will come down due to?",
      options: ["Friction", "Gravity", "Magnetism", "Air resistance"],
      answer: 1,
    },
  ],

  "physics-2": [
    {
      question: "What is the formula for work done?",
      options: ["Force x Distance", "Mass x Velocity", "Force / Distance", "Mass / Velocity"],
      answer: 0,
    },
    {
      question: "The SI unit of power is?",
      options: ["Watt", "Newton", "Joule", "Pascal"],
      answer: 0,
    },
    {
      question: "Which one is renewable energy source?",
      options: ["Coal", "Petroleum", "Solar", "Natural gas"],
      answer: 2,
    },
    {
      question: "The device used to measure temperature is?",
      options: ["Thermometer", "Barometer", "Hygrometer", "Speedometer"],
      answer: 0,
    },
    {
      question: "Speed is defined as?",
      options: ["Distance/Time", "Displacement/Time", "Force/Time", "Mass/Time"],
      answer: 0,
    },
    {
      question: "Energy cannot be created or destroyed is which law?",
      options: ["Law of Conservation of Energy", "Newton's First Law", "Law of Thermodynamics", "Law of Motion"],
      answer: 0,
    },
    {
      question: "Which one is a conductor?",
      options: ["Copper", "Rubber", "Glass", "Plastic"],
      answer: 0,
    },
    {
      question: "Which is the fastest planet?",
      options: ["Earth", "Mercury", "Venus", "Mars"],
      answer: 1,
    },
    {
      question: "The unit of electric resistance is?",
      options: ["Ohm", "Volt", "Ampere", "Watt"],
      answer: 0,
    },
    {
      question: "Light bends when it passes from one medium to another called?",
      options: ["Reflection", "Refraction", "Diffraction", "Absorption"],
      answer: 1,
    },
    {
      question: "The phenomenon of splitting of light into colors is called?",
      options: ["Reflection", "Refraction", "Dispersion", "Diffraction"],
      answer: 2,
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      answer: 1,
    },
    {
      question: "Sound needs a medium to travel. True or False?",
      options: ["True", "False", "Sometimes", "None"],
      answer: 0,
    },
    {
      question: "A ray of light falling on a mirror is called?",
      options: ["Incident ray", "Reflected ray", "Refracted ray", "Diffused ray"],
      answer: 0,
    },
    {
      question: "Force = Mass x ?",
      options: ["Velocity", "Acceleration", "Speed", "Time"],
      answer: 1,
    },
  ],

  "chemistry-1": [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      answer: 0,
    },
    {
      question: "Which gas is released when an acid reacts with metal?",
      options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"],
      answer: 1,
    },
    {
      question: "pH of pure water is?",
      options: ["7", "1", "14", "0"],
      answer: 0,
    },
    {
      question: "Which element is a noble gas?",
      options: ["Helium", "Oxygen", "Hydrogen", "Nitrogen"],
      answer: 0,
    },
    {
      question: "Salt is formed when an acid reacts with?",
      options: ["Base", "Metal", "Water", "Gas"],
      answer: 0,
    },
    {
      question: "The process of converting solid directly into gas is called?",
      options: ["Sublimation", "Condensation", "Evaporation", "Melting"],
      answer: 0,
    },
    {
      question: "What is the atomic number of Carbon?",
      options: ["6", "12", "14", "8"],
      answer: 0,
    },
    {
      question: "Which of these is an alkali?",
      options: ["Sodium hydroxide", "Hydrochloric acid", "Carbon dioxide", "Water"],
      answer: 0,
    },
    {
      question: "Chemical formula of table salt is?",
      options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
      answer: 0,
    },
    {
      question: "Which of these is not a metal?",
      options: ["Copper", "Gold", "Sulfur", "Silver"],
      answer: 2,
    },
    {
      question: "Which acid is found in vinegar?",
      options: ["Acetic acid", "Citric acid", "Sulfuric acid", "Hydrochloric acid"],
      answer: 0,
    },
    {
      question: "Which gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      answer: 2,
    },
    {
      question: "Which is the lightest element?",
      options: ["Hydrogen", "Helium", "Lithium", "Oxygen"],
      answer: 0,
    },
    {
      question: "Water boils at?",
      options: ["100°C", "90°C", "80°C", "120°C"],
      answer: 0,
    },
    {
      question: "What is the chemical formula of methane?",
      options: ["CH4", "CO2", "C2H6", "C3H8"],
      answer: 0,
    },
  ],

  "chemistry-2": [
    {
      question: "What is the valency of oxygen?",
      options: ["2", "1", "3", "4"],
      answer: 0,
    },
    {
      question: "Which element has atomic number 1?",
      options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
      answer: 0,
    },
    {
      question: "Which gas causes rusting of iron?",
      options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"],
      answer: 0,
    },
    {
      question: "Which is a physical change?",
      options: ["Melting ice", "Burning paper", "Rusting iron", "Cooking food"],
      answer: 0,
    },
    {
      question: "Which element is used in making glass?",
      options: ["Silicon", "Iron", "Carbon", "Oxygen"],
      answer: 0,
    },
    {
      question: "Which acid is used in car batteries?",
      options: ["Sulfuric acid", "Hydrochloric acid", "Nitric acid", "Acetic acid"],
      answer: 0,
    },
    {
      question: "Which of the following is a compound?",
      options: ["Water", "Oxygen", "Nitrogen", "Helium"],
      answer: 0,
    },
    {
      question: "Salt is a?",
      options: ["Compound", "Element", "Mixture", "Atom"],
      answer: 0,
    },
    {
      question: "Which element is essential for hemoglobin?",
      options: ["Iron", "Calcium", "Potassium", "Magnesium"],
      answer: 0,
    },
    {
      question: "The process of separating liquids based on boiling points is?",
      options: ["Distillation", "Filtration", "Evaporation", "Condensation"],
      answer: 0,
    },
    {
      question: "An atom consists of electrons, protons, and?",
      options: ["Neutrons", "Photons", "Neutrinos", "Positrons"],
      answer: 0,
    },
    {
      question: "Which gas is used in refrigerators?",
      options: ["Chlorofluorocarbon", "Oxygen", "Nitrogen", "Hydrogen"],
      answer: 0,
    },
    {
      question: "Which element is liquid at room temperature?",
      options: ["Mercury", "Gold", "Silver", "Copper"],
      answer: 0,
    },
    {
      question: "The pH of lemon juice is?",
      options: ["2", "7", "14", "10"],
      answer: 0,
    },
    {
      question: "Which element is used in pencils?",
      options: ["Carbon", "Graphite", "Lead", "Iron"],
      answer: 1,
    },
  ],

  "biology-1": [
    {
      question: "The powerhouse of the cell is?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
      answer: 0,
    },
    {
      question: "Which blood cells fight infection?",
      options: ["White blood cells", "Red blood cells", "Platelets", "Plasma"],
      answer: 0,
    },
    {
      question: "Photosynthesis takes place in?",
      options: ["Chloroplast", "Mitochondria", "Nucleus", "Ribosome"],
      answer: 0,
    },
    {
      question: "Which vitamin is produced in the skin by sunlight?",
      options: ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B12"],
      answer: 0,
    },
    {
      question: "Which organ filters blood in the human body?",
      options: ["Kidneys", "Liver", "Heart", "Lungs"],
      answer: 0,
    },
    {
      question: "Which blood group is known as universal donor?",
      options: ["O negative", "AB positive", "A positive", "B negative"],
      answer: 0,
    },
    {
      question: "The basic unit of life is?",
      options: ["Cell", "Atom", "Molecule", "Tissue"],
      answer: 0,
    },
    {
      question: "Which part of the plant conducts water?",
      options: ["Xylem", "Phloem", "Root", "Stem"],
      answer: 0,
    },
    {
      question: "Which gas do humans exhale?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      answer: 0,
    },
    {
      question: "Which organ is responsible for digestion?",
      options: ["Stomach", "Heart", "Lungs", "Brain"],
      answer: 0,
    },
    {
      question: "DNA stands for?",
      options: [
        "Deoxyribonucleic Acid",
        "Deoxyribose Acid",
        "Deoxy Nucleic Acid",
        "Dioxin Acid",
      ],
      answer: 0,
    },
    {
      question: "Which vitamin helps in blood clotting?",
      options: ["Vitamin K", "Vitamin A", "Vitamin C", "Vitamin D"],
      answer: 0,
    },
    {
      question: "Which of these is not a part of the respiratory system?",
      options: ["Heart", "Lungs", "Trachea", "Bronchi"],
      answer: 0,
    },
    {
      question: "Humans have how many pairs of chromosomes?",
      options: ["23", "46", "22", "44"],
      answer: 0,
    },
    {
      question: "Which part of the brain controls balance?",
      options: ["Cerebellum", "Cerebrum", "Medulla", "Pons"],
      answer: 0,
    },
  ],
};

const subjectSelector = document.getElementById("subjectSelector");
const startBtn = document.getElementById("startBtn");
const quizArea = document.getElementById("quizArea");
const questionEl = document.getElementById("question");
const optionsList = document.getElementById("optionsList");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const resultArea = document.getElementById("resultArea");
const scoreEl = document.getElementById("score");
const motivationalMsg = document.getElementById("motivationalMsg");
const restartBtn = document.getElementById("restartBtn");

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let selectedAnswerIndex = null;

subjectSelector.addEventListener("change", () => {
  startBtn.disabled = !subjectSelector.value;
});

startBtn.addEventListener("click", () => {
  startQuiz(subjectSelector.value);
});

nextBtn.addEventListener("click", () => {
  if (selectedAnswerIndex === null) {
    alert("Please select an option.");
    return;
  }
  checkAnswer(selectedAnswerIndex);
  selectedAnswerIndex = null;
  nextBtn.disabled = true;
});

restartBtn.addEventListener("click", () => {
  resetQuiz();
});

function startQuiz(subjectKey) {
  currentQuiz = quizzes[subjectKey].slice(0, 15);
  currentQuestionIndex = 0;
  score = 0;
  startBtn.style.display = "none";
  subjectSelector.style.display = "none";
  quizArea.style.display = "block";
  resultArea.style.display = "none";
  nextBtn.disabled = true;
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  resetOptions();
  if (currentQuestionIndex >= currentQuiz.length) {
    endQuiz();
    return;
  }
  const q = currentQuiz[currentQuestionIndex];
  questionEl.textContent = `Q${currentQuestionIndex + 1}. ${q.question}`;
  optionsList.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.className = "option";
    li.tabIndex = 0;
    li.addEventListener("click", () => selectOption(idx, li));
    li.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectOption(idx, li);
      }
    });
    optionsList.appendChild(li);
  });
}

function resetOptions() {
  selectedAnswerIndex = null;
  nextBtn.disabled = true;
  optionsList.querySelectorAll("li").forEach((li) => {
    li.classList.remove("selected", "correct", "wrong");
    li.style.pointerEvents = "auto";
  });
}

function selectOption(idx, li) {
  if (selectedAnswerIndex !== null) return; // already selected

  selectedAnswerIndex = idx;
  optionsList.querySelectorAll("li").forEach((li2, i) => {
    li2.classList.toggle("selected", i === idx);
  });
  nextBtn.disabled = false;
}

function checkAnswer(selectedIdx) {
  clearInterval(timer);
  const q = currentQuiz[currentQuestionIndex];
  const correctIdx = q.answer;

  // mark answers
  optionsList.querySelectorAll("li").forEach((li, i) => {
    li.style.pointerEvents = "none";
    if (i === correctIdx) {
      li.classList.add("correct");
    }
    if (i === selectedIdx && selectedIdx !== correctIdx) {
      li.classList.add("wrong");
    }
  });

  if (selectedIdx === correctIdx) {
    score++;
  }

  currentQuestionIndex++;
  setTimeout(() => {
    if (currentQuestionIndex < currentQuiz.length) {
      timeLeft = 60;
      startTimer();
      loadQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
}

function startTimer() {
  timerEl.textContent = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      // Automatically mark no answer, move on:
      checkAnswer(-1); // -1 means no selection, wrong by default
    }
  }, 1000);
}

function endQuiz() {
  quizArea.style.display = "none";
  resultArea.style.display = "block";
  scoreEl.textContent = score;

  motivationalMsg.textContent = getMotivationalMessage(score);

  saveResultToFirestore(subjectSelector.value, score);
}

function resetQuiz() {
  startBtn.style.display = "block";
  subjectSelector.style.display = "block";
  quizArea.style.display = "none";
  resultArea.style.display = "none";
  subjectSelector.value = "";
  startBtn.disabled = true;
}

function getMotivationalMessage(score) {
  if (score >= 13) return "🌟 Amazing! You're a Quiz Master!";
  if (score >= 10) return "👍 Great job! Keep it up!";
  if (score >= 7) return "😊 Good effort! Practice makes perfect!";
  return "💪 Don't worry! Keep learning and try again!";
}

async function saveResultToFirestore(subject, score) {
  try {
    const timestamp = new Date();
    await db.collection("quizResults").add({
      subject: subject,
      score: score,
      timestamp: timestamp.toISOString(),
    });
    console.log("Quiz result saved successfully!");
  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
}
