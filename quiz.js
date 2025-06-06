
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYEol3wDIUihPTLaM1EjqVkpvjvJ-1_O4",
  authDomain: "my-website-backend-957db.firebaseapp.com",
  projectId: "my-website-backend-957db",
  storageBucket: "my-website-backend-957db.appspot.com",
  messagingSenderId: "75667291929",
  appId: "1:75667291929:web:10878882c9c30574144f88",
  measurementId: "G-8H93W7QZGT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const quizData = {
  physics: [
    { q: "What is the SI unit of force?", a: ["Newton", "Pascal", "Joule", "Watt"], c: 0 },
    { q: "What is the speed of light?", a: ["3x10^8 m/s", "5x10^6 m/s", "1.5x10^3 m/s", "None"], c: 0 },
    { q: "Who formulated the three laws of motion?", a: ["Newton", "Einstein", "Galileo", "Maxwell"], c: 0 },
    { q: "What is the formula for kinetic energy?", a: ["(1/2)mv²", "mv", "mgh", "mg"], c: 0 },
    { q: "What is the unit of electric current?", a: ["Ampere", "Volt", "Ohm", "Watt"], c: 0 },
    { q: "Which phenomenon explains the bending of light?", a: ["Refraction", "Reflection", "Diffraction", "Dispersion"], c: 0 },
    { q: "What is the gravitational acceleration on Earth?", a: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "9.2 m/s²"], c: 0 },
    { q: "What device is used to measure current?", a: ["Ammeter", "Voltmeter", "Galvanometer", "Thermometer"], c: 0 },
    { q: "What is the unit of resistance?", a: ["Ohm", "Ampere", "Volt", "Watt"], c: 0 },
    { q: "Which particle carries a negative charge?", a: ["Electron", "Proton", "Neutron", "Photon"], c: 0 },
    { q: "What is the energy stored in a stretched spring called?", a: ["Elastic potential energy", "Kinetic energy", "Chemical energy", "Thermal energy"], c: 0 },
    { q: "What type of lens is used to correct myopia?", a: ["Concave lens", "Convex lens", "Plane mirror", "Concave mirror"], c: 0 },
    { q: "Which law relates current, voltage and resistance?", a: ["Ohm's Law", "Newton's Law", "Faraday's Law", "Hooke's Law"], c: 0 },
    { q: "What does a voltmeter measure?", a: ["Voltage", "Current", "Resistance", "Power"], c: 0 },
    { q: "What is the principle behind a transformer?", a: ["Electromagnetic induction", "Photoelectric effect", "Nuclear fission", "Magnetic resonance"], c: 0 }
  ],

  chemistry: [
    { q: "What is the chemical formula of water?", a: ["H2O", "CO2", "NaCl", "O2"], c: 0 },
    { q: "Atomic number of carbon?", a: ["6", "8", "12", "14"], c: 0 },
    { q: "What is the pH value of pure water?", a: ["7", "1", "14", "0"], c: 0 },
    { q: "What is the gas released when an acid reacts with a metal?", a: ["Hydrogen", "Oxygen", "Carbon dioxide", "Nitrogen"], c: 0 },
    { q: "What is the chemical name of baking soda?", a: ["Sodium bicarbonate", "Sodium chloride", "Potassium nitrate", "Calcium carbonate"], c: 0 },
    { q: "Which element is called the 'king of chemicals'?", a: ["Sulfuric acid", "Hydrochloric acid", "Nitric acid", "Acetic acid"], c: 0 },
    { q: "What is the molecular formula of glucose?", a: ["C6H12O6", "CH4", "CO2", "C2H5OH"], c: 0 },
    { q: "Which gas is essential for combustion?", a: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"], c: 0 },
    { q: "What type of bond is formed by sharing electrons?", a: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"], c: 0 },
    { q: "What is the product of neutralization reaction?", a: ["Salt and water", "Acid and base", "Hydrogen gas", "Oxygen gas"], c: 0 },
    { q: "What is the main constituent of natural gas?", a: ["Methane", "Propane", "Butane", "Ethane"], c: 0 },
    { q: "Which acid is found in vinegar?", a: ["Acetic acid", "Citric acid", "Sulfuric acid", "Nitric acid"], c: 0 },
    { q: "Which metal is liquid at room temperature?", a: ["Mercury", "Lead", "Gold", "Silver"], c: 0 },
    { q: "What is rust chemically?", a: ["Iron oxide", "Copper oxide", "Aluminium oxide", "Zinc oxide"], c: 0 },
    { q: "Which element is most abundant in the Earth's crust?", a: ["Oxygen", "Silicon", "Aluminium", "Iron"], c: 0 }
  ],

  biology: [
    { q: "What is the powerhouse of the cell?", a: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"], c: 0 },
    { q: "Which vitamin is made in skin by sunlight?", a: ["Vitamin D", "Vitamin C", "Vitamin B", "Vitamin A"], c: 0 },
    { q: "What is the basic unit of life?", a: ["Cell", "Atom", "Molecule", "Organ"], c: 0 },
    { q: "Which blood cells help fight infection?", a: ["White blood cells", "Red blood cells", "Platelets", "Plasma"], c: 0 },
    { q: "Where does photosynthesis occur?", a: ["Chloroplast", "Mitochondria", "Nucleus", "Ribosome"], c: 0 },
    { q: "What gas do plants release during photosynthesis?", a: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], c: 0 },
    { q: "What is the largest organ in the human body?", a: ["Skin", "Liver", "Heart", "Brain"], c: 0 },
    { q: "Which part of the brain controls balance?", a: ["Cerebellum", "Cerebrum", "Medulla", "Hypothalamus"], c: 0 },
    { q: "What type of reproduction involves two parents?", a: ["Sexual reproduction", "Asexual reproduction", "Budding", "Fragmentation"], c: 0 },
    { q: "Which hormone regulates blood sugar?", a: ["Insulin", "Adrenaline", "Thyroxine", "Estrogen"], c: 0 },
    { q: "What blood type is called the universal donor?", a: ["O negative", "A positive", "B positive", "AB positive"], c: 0 },
    { q: "Which system transports oxygen in the body?", a: ["Circulatory system", "Nervous system", "Digestive system", "Respiratory system"], c: 0 },
    { q: "What is the process of cell division?", a: ["Mitosis", "Meiosis", "Binary fission", "Budding"], c: 0 },
    { q: "Which organ filters blood?", a: ["Kidney", "Liver", "Lungs", "Heart"], c: 0 },
    { q: "Which vitamin is essential for blood clotting?", a: ["Vitamin K", "Vitamin A", "Vitamin C", "Vitamin D"], c: 0 }
  ]
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 60;

const quizSelector = document.getElementById("quizSelector");
const quizBox = document.getElementById("quizBox");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const qNumEl = document.getElementById("qNum");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("scoreText");

function startQuiz() {
  const selected = quizSelector.value;
  currentQuiz = quizData[selected];
  currentIndex = 0;
  score = 0;
  timeLeft = 60;

  quizBox.style.display = "block";
  resultBox.style.display = "none";
  nextBtn.style.display = "inline-block";

  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = currentQuiz[currentIndex];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  q.a.forEach((option, i) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.onclick = () => selectAnswer(i);
    optionsEl.appendChild(button);
  });

  qNumEl.textContent = currentIndex + 1;
  timerEl.textContent = timeLeft;
}

function selectAnswer(selected) {
  clearInterval(timerInterval);
  const correct = currentQuiz[currentIndex].c;

  if (selected === correct) {
    score++;
  }

  // Disable all buttons after answer
  Array.from(optionsEl.children).forEach((btn) => (btn.disabled = true));

  // Highlight correct and selected answer
  Array.from(optionsEl.children).forEach((btn, i) => {
    if (i === correct) btn.style.backgroundColor = "#4CAF50"; // green
    else if (i === selected) btn.style.backgroundColor = "#f44336"; // red
  });

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuiz.length) {
    timeLeft = 60;
    showQuestion();
    startTimer();
  } else {
    showResult();
  }
}

function startTimer() {
  timerEl.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoNext();
    }
  }, 1000);
}

function autoNext() {
  // Disable buttons if user didn't answer
  Array.from(optionsEl.children).forEach((btn) => (btn.disabled = true));
  // Highlight correct answer
  const correct = currentQuiz[currentIndex].c;
  Array.from(optionsEl.children).forEach((btn, i) => {
    if (i === correct) btn.style.backgroundColor = "#4CAF50";
  });
  nextBtn.style.display = "inline-block";
}

async function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  scoreText.textContent = score;

  // Save result to Firestore
  try {
    await addDoc(collection(db, "quizResults"), {
      quizType: quizSelector.value,
      score: score,
      total: currentQuiz.length,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving quiz result: ", error);
  }
}

window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
