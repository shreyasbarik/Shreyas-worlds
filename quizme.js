// quizme.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

const quizzes = {
  physics1: [
    { q: "What is the SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], answer: 0 },
    { q: "Which law states F=ma?", options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravitation"], answer: 1 },
    { q: "What is the acceleration due to gravity on Earth?", options: ["9.8 m/s²", "10 m/s²", "9 m/s²", "8.9 m/s²"], answer: 0 },
    { q: "What is the formula for work done?", options: ["Force x Distance", "Mass x Acceleration", "Power / Time", "Energy x Time"], answer: 0 },
    { q: "Energy cannot be created or destroyed. This law is called?", options: ["Law of Conservation of Mass", "Law of Conservation of Energy", "Newton's Law", "Law of Thermodynamics"], answer: 1 },
    { q: "Speed is the rate of change of?", options: ["Distance", "Velocity", "Time", "Acceleration"], answer: 0 },
    { q: "What device measures electric current?", options: ["Voltmeter", "Ammeter", "Ohmmeter", "Galvanometer"], answer: 1 },
    { q: "Power is defined as?", options: ["Work done / Time", "Force / Distance", "Energy x Time", "Speed x Time"], answer: 0 },
    { q: "Which energy is stored in a stretched spring?", options: ["Kinetic", "Potential", "Thermal", "Sound"], answer: 1 },
    { q: "What is the speed of light?", options: ["3x10^8 m/s", "3x10^6 m/s", "3x10^5 m/s", "3x10^7 m/s"], answer: 0 },
    { q: "Which phenomenon explains the bending of light?", options: ["Reflection", "Refraction", "Diffraction", "Interference"], answer: 1 },
    { q: "Pressure is defined as?", options: ["Force / Area", "Force x Area", "Mass / Volume", "Energy / Time"], answer: 0 },
    { q: "What is the main source of energy on Earth?", options: ["Moon", "Sun", "Stars", "Electricity"], answer: 1 },
    { q: "What type of lens is used to correct myopia?", options: ["Convex", "Concave", "Cylindrical", "Bifocal"], answer: 1 },
    { q: "Unit of frequency is?", options: ["Hertz", "Pascal", "Newton", "Joule"], answer: 0 }
  ],
  physics2: [
    { q: "What is the formula for momentum?", options: ["Mass x Velocity", "Force x Distance", "Mass x Acceleration", "Energy / Time"], answer: 0 },
    { q: "Which gas law relates pressure and volume?", options: ["Boyle's Law", "Charles' Law", "Gay-Lussac's Law", "Avogadro's Law"], answer: 0 },
    { q: "Light travels fastest in?", options: ["Air", "Vacuum", "Water", "Glass"], answer: 1 },
    { q: "What is the unit of electric resistance?", options: ["Ohm", "Volt", "Ampere", "Watt"], answer: 0 },
    { q: "What force keeps planets in orbit?", options: ["Magnetic Force", "Electrostatic Force", "Gravitational Force", "Nuclear Force"], answer: 2 },
    { q: "What type of mirror is used in vehicle side mirrors?", options: ["Concave", "Convex", "Plane", "Parabolic"], answer: 1 },
    { q: "The energy of motion is called?", options: ["Potential Energy", "Kinetic Energy", "Thermal Energy", "Chemical Energy"], answer: 1 },
    { q: "Which of these is a scalar quantity?", options: ["Velocity", "Acceleration", "Force", "Speed"], answer: 3 },
    { q: "What is the unit of work?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 0 },
    { q: "Electric current is measured in?", options: ["Volts", "Amperes", "Ohms", "Watts"], answer: 1 },
    { q: "What is the freezing point of water?", options: ["0°C", "32°C", "100°C", "-273°C"], answer: 0 },
    { q: "Sound travels fastest in?", options: ["Air", "Vacuum", "Water", "Steel"], answer: 3 },
    { q: "What is the basic unit of length?", options: ["Meter", "Centimeter", "Kilometer", "Millimeter"], answer: 0 },
    { q: "Which color has the shortest wavelength?", options: ["Red", "Blue", "Violet", "Green"], answer: 2 },
    { q: "What happens when light passes through a prism?", options: ["Reflection", "Refraction", "Dispersion", "Diffraction"], answer: 2 }
  ],
  chemistry1: [
    { q: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: 0 },
    { q: "Which gas is released during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 0 },
    { q: "What is the atomic number of Hydrogen?", options: ["1", "2", "3", "4"], answer: 0 },
    { q: "Which acid is found in lemons?", options: ["Sulfuric acid", "Citric acid", "Hydrochloric acid", "Nitric acid"], answer: 1 },
    { q: "pH value of pure water is?", options: ["7", "0", "14", "1"], answer: 0 },
    { q: "What is the formula for table salt?", options: ["NaCl", "KCl", "H2SO4", "CaCO3"], answer: 0 },
    { q: "Which element is a noble gas?", options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"], answer: 2 },
    { q: "What is the main gas in the Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], answer: 1 },
    { q: "Which is a metal?", options: ["Oxygen", "Sodium", "Chlorine", "Hydrogen"], answer: 1 },
    { q: "Water boils at?", options: ["100°C", "0°C", "50°C", "200°C"], answer: 0 },
    { q: "What is the process of solid turning directly into gas?", options: ["Sublimation", "Condensation", "Evaporation", "Freezing"], answer: 0 },
    { q: "What do acids release in water?", options: ["OH- ions", "H+ ions", "Na+ ions", "Cl- ions"], answer: 1 },
    { q: "Which gas causes global warming?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
    { q: "What is the chemical formula of ammonia?", options: ["NH3", "H2O", "CO2", "CH4"], answer: 0 },
    { q: "The periodic table was invented by?", options: ["Mendeleev", "Newton", "Einstein", "Curie"], answer: 0 }
  ],
  chemistry2: [
    { q: "Which element has atomic number 6?", options: ["Carbon", "Oxygen", "Nitrogen", "Hydrogen"], answer: 0 },
    { q: "What is a mixture?", options: ["Two or more substances physically combined", "Chemically bonded substances", "Pure substance", "Element"], answer: 0 },
    { q: "The symbol 'Fe' stands for?", options: ["Iron", "Fluorine", "Francium", "Fermium"], answer: 0 },
    { q: "What is electrolysis?", options: ["Chemical reaction using electricity", "Boiling", "Freezing", "Melting"], answer: 0 },
    { q: "What color does litmus paper turn in acid?", options: ["Red", "Blue", "Green", "Yellow"], answer: 0 },
    { q: "Which is a compound?", options: ["Water", "Oxygen", "Hydrogen", "Nitrogen"], answer: 0 },
    { q: "What is the atomic mass of Hydrogen?", options: ["1", "2", "3", "4"], answer: 0 },
    { q: "What is rust?", options: ["Iron oxide", "Iron chloride", "Iron nitrate", "Iron sulfate"], answer: 0 },
    { q: "Which is the lightest element?", options: ["Hydrogen", "Helium", "Oxygen", "Carbon"], answer: 0 },
    { q: "Which acid is used in batteries?", options: ["Sulfuric acid", "Hydrochloric acid", "Nitric acid", "Acetic acid"], answer: 0 },
    { q: "What is an isotope?", options: ["Atoms of the same element with different neutrons", "Different elements", "Compounds", "Mixtures"], answer: 0 },
    { q: "Which is a gas at room temperature?", options: ["Oxygen", "Iron", "Copper", "Gold"], answer: 0 },
    { q: "What is neutralization?", options: ["Acid + Base reaction", "Acid + Acid reaction", "Base + Base reaction", "Salt + Water reaction"], answer: 0 },
    { q: "Which is a base?", options: ["Sodium hydroxide", "Hydrochloric acid", "Sulfuric acid", "Carbon dioxide"], answer: 0 },
    { q: "What is distilled water?", options: ["Pure water", "Salty water", "Polluted water", "Tap water"], answer: 0 }
  ],
  biology1: [
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], answer: 1 },
    { q: "Which system pumps blood in the body?", options: ["Respiratory", "Circulatory", "Digestive", "Nervous"], answer: 1 },
    { q: "What carries genetic information?", options: ["Proteins", "DNA", "Lipids", "Carbohydrates"], answer: 1 },
    { q: "Plants make food by?", options: ["Photosynthesis", "Respiration", "Digestion", "Transpiration"], answer: 0 },
    { q: "Which vitamin is produced in skin with sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: 3 },
    { q: "Blood cells that fight infections are called?", options: ["Red Blood Cells", "White Blood Cells", "Platelets", "Plasma"], answer: 1 },
    { q: "Which organ filters blood in the human body?", options: ["Liver", "Kidney", "Heart", "Lungs"], answer: 1 },
    { q: "The basic unit of life is?", options: ["Atom", "Cell", "Tissue", "Organ"], answer: 1 },
    { q: "Which part of the plant transports water?", options: ["Phloem", "Xylem", "Roots", "Stem"], answer: 1 },
    { q: "Which is not a mammal?", options: ["Dolphin", "Bat", "Shark", "Elephant"], answer: 2 },
    { q: "What do herbivores eat?", options: ["Plants", "Meat", "Both", "Fruits only"], answer: 0 },
    { q: "What is the process of cell division?", options: ["Mitosis", "Meiosis", "Fission", "Fusion"], answer: 0 },
    { q: "What type of blood does arteries carry?", options: ["Oxygenated", "Deoxygenated", "Both", "None"], answer: 0 },
    { q: "The human skeleton is made of?", options: ["Cartilage", "Bone", "Muscle", "Ligament"], answer: 1 },
    { q: "Which gas do plants absorb?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 1 }
  ]
};

const totalTime = 60; // seconds per question

let currentSubject = 'physics1';
let currentQuestionIndex = 0;
let score = 0;
let timerId = null;
let timeLeft = totalTime;
let quizStarted = false;

const subjectButtons = document.querySelectorAll('.subject-btn');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsListEl = document.getElementById('options-list');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');
const quizContainer = document.getElementById('quiz-container');

function startTimer() {
  clearInterval(timerId);
  timeLeft = totalTime;
  timerEl.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      disableOptions();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function showQuestion() {
  const quiz = quizzes[currentSubject];
  if (currentQuestionIndex >= quiz.length) {
    showResult();
    return;
  }

  quizStarted = true;
  nextBtn.style.display = 'none';
  nextBtn.disabled = true;
  timerEl.style.display = 'block';

  const questionObj = quiz[currentQuestionIndex];
  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${quiz.length}`;
  questionTextEl.textContent = questionObj.q;

  // Clear previous options
  optionsListEl.innerHTML = '';

  questionObj.options.forEach((optionText, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = optionText;
    button.classList.add('option-btn');
    button.setAttribute('data-index', index);
    button.setAttribute('type', 'button');
    button.addEventListener('click', selectOption);
    li.appendChild(button);
    optionsListEl.appendChild(li);
  });

  startTimer();
}

function selectOption(e) {
  if (!quizStarted) return;
  const selectedBtn = e.target;
  const selectedIndex = Number(selectedBtn.getAttribute('data-index'));

  clearInterval(timerId);
  disableOptions();

  const correctIndex = quizzes[currentSubject][currentQuestionIndex].answer;
  if (selectedIndex === correctIndex) {
    score++;
    selectedBtn.classList.add('correct');
  } else {
    selectedBtn.classList.add('wrong');
    // Highlight correct answer
    const optionButtons = optionsListEl.querySelectorAll('.option-btn');
    optionButtons[correctIndex].classList.add('correct');
  }
  nextBtn.disabled = false;
  nextBtn.style.display = 'inline-block';
  quizStarted = false;
}

function disableOptions() {
  const optionButtons = optionsListEl.querySelectorAll('.option-btn');
  optionButtons.forEach(btn => {
    btn.disabled = true;
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizzes[currentSubject].length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.style.display = 'none';
  resultContainer.hidden = false;
  scoreText.textContent = `You scored ${score} out of ${quizzes[currentSubject].length}.`;
  restartBtn.style.display = 'inline-block';

  // Optional: Save result to Firestore if logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      saveResult(user.uid, currentSubject, score, quizzes[currentSubject].length);
    }
  });
}

async function saveResult(uid, subject, score, total) {
  try {
    await addDoc(collection(db, 'quizResults'), {
      userId: uid,
      subject,
      score,
      total,
      timestamp: serverTimestamp()
    });
    console.log('Result saved');
  } catch (error) {
    console.error('Error saving result:', error);
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.style.display = 'block';
  resultContainer.hidden = true;
  showQuestion();
  nextBtn.style.display = 'none';
  restartBtn.style.display = 'none';
}

function switchSubject(e) {
  const clickedBtn = e.target;
  if (!clickedBtn.classList.contains('subject-btn')) return;

  subjectButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
    btn.setAttribute('tabindex', '-1');
  });
  clickedBtn.classList.add('active');
  clickedBtn.setAttribute('aria-selected', 'true');
  clickedBtn.setAttribute('tabindex', '0');

  currentSubject = clickedBtn.getAttribute('data-subject');
  currentQuestionIndex = 0;
  score = 0;

  quizContainer.style.display = 'block';
  resultContainer.hidden = true;
  nextBtn.style.display = 'none';
  restartBtn.style.display = 'none';

  showQuestion();
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
document.querySelector('.subject-select').addEventListener('click', switchSubject);

// Initialize quiz
showQuestion();
