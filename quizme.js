

// 🔐 Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYEol3wDIUihPTLaM1EjqVkpvjvJ-1_O4",
  authDomain: "my-website-backend-957db.firebaseapp.com",
  projectId: "my-website-backend-957db",
  storageBucket: "my-website-backend-957db.appspot.com",
  messagingSenderId: "75667291929",
  appId: "1:75667291929:web:10878882c9c30574144f88",
  measurementId: "G-8H93W7QZGT"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// ✅ Export for global use
export { auth, db };

const quizData = {
  physics1: [
    { q: "What is the SI unit of force?", o: ["Newton", "Pascal", "Joule", "Watt"], a: 0 },
    { q: "What is the formula for speed?", o: ["distance/time", "time/distance", "mass × acceleration", "force/mass"], a: 0 },
    { q: "Which of these is not a type of friction?", o: ["Static", "Kinetic", "Fluid", "Thermal"], a: 3 },
    { q: "1 newton is equal to?", o: ["1 kg·m/s²", "1 kg·m²/s", "1 m/s²", "10 m/s²"], a: 0 },
    { q: "Which quantity is a vector?", o: ["Speed", "Distance", "Velocity", "Mass"], a: 2 },
    { q: "Acceleration is rate of change of?", o: ["Distance", "Speed", "Velocity", "Mass"], a: 2 },
    { q: "What does inertia depend on?", o: ["Mass", "Speed", "Area", "Length"], a: 0 },
    { q: "Unit of momentum is?", o: ["kg·m/s", "N", "J", "W"], a: 0 },
    { q: "Which law gives F = ma?", o: ["First Law", "Second Law", "Third Law", "Law of Gravitation"], a: 1 },
    { q: "Which force pulls objects towards Earth?", o: ["Friction", "Magnetism", "Gravity", "Electric"], a: 2 },
    { q: "Which is a non-contact force?", o: ["Friction", "Gravity", "Tension", "Normal"], a: 1 },
    { q: "Which law relates action and reaction?", o: ["First Law", "Second Law", "Third Law", "None"], a: 2 },
    { q: "What is the unit of work?", o: ["Watt", "Joule", "Newton", "Pascal"], a: 1 },
    { q: "What is required to change the state of motion?", o: ["Energy", "Force", "Power", "Pressure"], a: 1 },
    { q: "Which of these is scalar?", o: ["Force", "Acceleration", "Speed", "Momentum"], a: 2 }
  ],
  physics2: [
    { q: "Which law explains the relationship between force, mass, and acceleration?", o: ["Newton's First Law", "Second Law", "Third Law", "Gravitation"], a: 1 },
    { q: "What is the SI unit of pressure?", o: ["N/m²", "J", "W", "kg"], a: 0 },
    { q: "Gravitational force is an example of?", o: ["Contact force", "Non-contact force", "Magnetic force", "Electrostatic force"], a: 1 },
    { q: "The force of friction always acts?", o: ["Along motion", "Against motion", "At 90°", "Downwards"], a: 1 },
    { q: "Inertia of rest means?", o: ["Body moves", "Body changes speed", "Body resists starting", "Body rotates"], a: 2 },
    { q: "Unit of energy?", o: ["Watt", "Joule", "Newton", "Volt"], a: 1 },
    { q: "What is mass × acceleration?", o: ["Speed", "Momentum", "Force", "Energy"], a: 2 },
    { q: "Action and reaction forces are?", o: ["Equal & Opposite", "Unequal", "Same Direction", "None"], a: 0 },
    { q: "What is the unit of power?", o: ["Joule", "Watt", "N", "kg"], a: 1 },
    { q: "Momentum is?", o: ["mass × speed", "mass × acceleration", "mass × velocity", "mass × force"], a: 2 },
    { q: "Free fall occurs due to?", o: ["Air resistance", "Friction", "Gravity", "Inertia"], a: 2 },
    { q: "Which is not a unit of energy?", o: ["Joule", "Calorie", "Watt", "kWh"], a: 2 },
    { q: "Which force prevents slipping?", o: ["Gravity", "Tension", "Friction", "Normal"], a: 2 },
    { q: "Formula of kinetic energy?", o: ["½mv²", "mv", "ma", "mgh"], a: 0 },
    { q: "Which quantity does not change in space?", o: ["Weight", "Mass", "Force", "Energy"], a: 1 }
  ],
  chemistry1: [
    { q: "Which gas is released during photosynthesis?", o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], a: 0 },
    { q: "Chemical formula of water?", o: ["H2O", "CO2", "NaCl", "CH4"], a: 0 },
    { q: "Which acid is in vinegar?", o: ["Acetic acid", "Citric acid", "Hydrochloric acid", "Sulfuric acid"], a: 0 },
    { q: "Litmus turns red in?", o: ["Base", "Acid", "Salt", "Water"], a: 1 },
    { q: "Which metal reacts with acid to release hydrogen?", o: ["Copper", "Gold", "Zinc", "Silver"], a: 2 },
    { q: "Common salt formula?", o: ["NaCl", "KCl", "CaCl2", "MgCl2"], a: 0 },
    { q: "Which is not a chemical change?", o: ["Rusting", "Melting", "Combustion", "Cooking"], a: 1 },
    { q: "What is the symbol of sodium?", o: ["So", "Sn", "Na", "S"], a: 2 },
    { q: "Which element is a noble gas?", o: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"], a: 2 },
    { q: "What is pH range of acid?", o: ["0-7", "7", "7-14", "Above 14"], a: 0 },
    { q: "Formula of carbon dioxide?", o: ["CO", "CO2", "C2O", "C2O2"], a: 1 },
    { q: "Which is a base?", o: ["NaOH", "HCl", "H2SO4", "CH3COOH"], a: 0 },
    { q: "What is the atomic number of carbon?", o: ["6", "8", "12", "14"], a: 0 },
    { q: "Acid + Base → ?", o: ["Salt + Water", "Gas", "Precipitate", "Metal"], a: 0 },
    { q: "Which gas is used in balloons?", o: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"], a: 2 }
  ],
  chemistry2: [
    { q: "What is the pH of pure water?", o: ["0", "7", "14", "5"], a: 1 },
    { q: "Which chemical turns blue litmus red?", o: ["Base", "Acid", "Salt", "Sugar"], a: 1 },
    { q: "Which metal is liquid at room temp?", o: ["Mercury", "Gold", "Sodium", "Zinc"], a: 0 },
    { q: "Atomic number of oxygen?", o: ["6", "7", "8", "9"], a: 2 },
    { q: "Chemical name of HCl?", o: ["Sulfuric acid", "Hydrochloric acid", "Nitric acid", "Acetic acid"], a: 1 },
    { q: "Which is used to test acid?", o: ["Water", "Phenolphthalein", "Litmus", "Soap"], a: 2 },
    { q: "Which of these is not a salt?", o: ["NaCl", "KNO3", "H2SO4", "MgCl2"], a: 2 },
    { q: "Which gas turns lime water milky?", o: ["O2", "CO2", "N2", "H2"], a: 1 },
    { q: "Which is a noble gas?", o: ["Neon", "Oxygen", "Nitrogen", "Carbon"], a: 0 },
    { q: "Which element is most reactive?", o: ["Fluorine", "Chlorine", "Bromine", "Iodine"], a: 0 },
    { q: "Which is not a metal?", o: ["Iron", "Carbon", "Aluminum", "Copper"], a: 1 },
    { q: "Water is?", o: ["Element", "Compound", "Mixture", "Salt"], a: 1 },
    { q: "Which base is used in soap?", o: ["NaOH", "HCl", "HNO3", "CH3COOH"], a: 0 },
    { q: "Full form of LPG?", o: ["Liquid Petroleum Gas", "Light Petrol Gas", "Long Petrol Gas", "Liquid Propane Gas"], a: 0 },
    { q: "Which gas is used in soft drinks?", o: ["CO2", "O2", "H2", "N2"], a: 0 }
  ],
  biology1: [
    { q: "What is the powerhouse of the cell?", o: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], a: 1 },
    { q: "Which organ pumps blood?", o: ["Lungs", "Heart", "Liver", "Kidney"], a: 1 },
    { q: "What is the basic unit of life?", o: ["Tissue", "Organ", "Cell", "Atom"], a: 2 },
    { q: "Where does digestion begin?", o: ["Stomach", "Mouth", "Small intestine", "Esophagus"], a: 1 },
    { q: "Which system controls body functions?", o: ["Respiratory", "Nervous", "Digestive", "Circulatory"], a: 1 },
    { q: "Which gas is used in respiration?", o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], a: 0 },
    { q: "Which is not part of circulatory system?", o: ["Heart", "Veins", "Arteries", "Lungs"], a: 3 },
    { q: "Function of white blood cells?", o: ["Clotting", "Fighting infection", "Carrying oxygen", "Digestion"], a: 1 },
    { q: "Which part controls voluntary actions?", o: ["Spinal cord", "Brain", "Heart", "Liver"], a: 1 },
    { q: "Which organ filters blood?", o: ["Heart", "Kidney", "Liver", "Lungs"], a: 1 },
    { q: "What is the function of hemoglobin?", o: ["Fight disease", "Help digestion", "Carry oxygen", "Absorb nutrients"], a: 2 },
    { q: "Which organ stores bile?", o: ["Stomach", "Gall bladder", "Liver", "Pancreas"], a: 1 },
    { q: "Which organ is responsible for coordination?", o: ["Brain", "Kidney", "Lung", "Skin"], a: 0 },
    { q: "Which system helps in movement?", o: ["Muscular", "Digestive", "Nervous", "Respiratory"], a: 0 },
    { q: "What is the function of red blood cells?", o: ["Fight infection", "Carry oxygen", "Form bones", "Digest food"], a: 1 }
  ]
};

let currentQuiz = [], currentIndex = 0, score = 0, timer;

function startQuiz() {
  const selector = document.getElementById("quiz-select");
  const quizId = selector.value;
  if (!quizId) return alert("Please select a quiz first.");

  currentQuiz = quizData[quizId];
  currentIndex = 0;
  score = 0;
  document.querySelector(".quiz-selector").classList.remove("active");
  document.querySelector(".question-box").classList.add("active");
  showQuestion();
}

function showQuestion() {
  if (currentIndex >= currentQuiz.length) return endQuiz();

  const q = currentQuiz[currentIndex];
  document.getElementById("question").innerText = q.q;
  const optionBox = document.getElementById("options");
  optionBox.innerHTML = "";

  q.o.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => selectOption(div, i);
    optionBox.appendChild(div);
  });

  startTimer();
}

function startTimer() {
  let time = 60;
  document.getElementById("timer").innerText = time;
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;
    if (time <= 0) {
      clearInterval(timer);
      autoMove();
    }
  }, 1000);
}

function selectOption(elem, index) {
  clearInterval(timer);
  const correct = currentQuiz[currentIndex].a;

  document.querySelectorAll(".option").forEach((opt, i) => {
    opt.classList.add(i === correct ? "correct" : (i === index ? "wrong" : ""));
    opt.onclick = null;
  });

  if (index === correct) score++;
  setTimeout(() => {
    currentIndex++;
    showQuestion();
  }, 1000);
}

function autoMove() {
  currentIndex++;
  showQuestion();
}

function endQuiz() {
  document.querySelector(".question-box").classList.remove("active");
  document.querySelector(".result-box").classList.add("active");
  document.getElementById("score").innerText = `✅ You scored ${score}/${currentQuiz.length}`;
  document.getElementById("message").innerText = score > 10 ? "💪 Great Job! You're a Quiz Champ!" : "🔥 Keep Practicing and You'll Shine!";

  const quizId = document.getElementById("quiz-select").value;
  db.collection("quizResults").add({
    subject: quizId.split(/\d/)[0],
    quiz: quizId,
    score: score,
    timestamp: new Date()
  });
}
