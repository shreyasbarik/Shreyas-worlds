const quizSelect = document.getElementById("quiz-select");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("time-left");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let answered = false;

// Question data for all quizzes
const quizData = {
  "Physics Quiz 1": [
    { question: "What is the SI unit of electric current?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ampere" },
    { question: "A body is moving in a circle of radius 10 m with speed 5 m/s. What is its centripetal acceleration?", options: ["2.5 m/s²", "5 m/s²", "10 m/s²", "25 m/s²"], answer: "2.5 m/s²" },
    { question: "Which law explains why a ship floats on water?", options: ["Newton's First Law", "Archimedes' Principle", "Pascal's Law", "Ohm's Law"], answer: "Archimedes' Principle" },
    { question: "In a series circuit, the current is:", options: ["Same at all points", "Different at each resistor", "Zero", "Increases"], answer: "Same at all points" },
    { question: "Which device converts chemical energy into electrical energy?", options: ["Generator", "Battery", "Transformer", "Motor"], answer: "Battery" },
    { question: "The frequency of a wave is 50 Hz. Its time period is:", options: ["0.02 s", "0.05 s", "20 s", "50 s"], answer: "0.02 s" },
    { question: "What is the power consumed by a device using 100 J of energy in 5 seconds?", options: ["5 W", "20 W", "500 W", "50 W"], answer: "20 W" },
    { question: "Which of the following is a scalar quantity?", options: ["Displacement", "Velocity", "Acceleration", "Speed"], answer: "Speed" },
    { question: "The slope of a distance-time graph represents:", options: ["Velocity", "Acceleration", "Displacement", "Speed"], answer: "Speed" },
    { question: "If the resistance of a wire is doubled, the current through it:", options: ["Doubles", "Halves", "Quadruples", "Remains same"], answer: "Halves" },
    { question: "Light travels fastest in:", options: ["Vacuum", "Air", "Water", "Glass"], answer: "Vacuum" },
    { question: "Which of these is NOT a form of energy?", options: ["Kinetic", "Potential", "Momentum", "Thermal"], answer: "Momentum" },
    { question: "Heat transfer by convection occurs in:", options: ["Solids", "Liquids and gases", "Vacuum", "All states"], answer: "Liquids and gases" },
    { question: "What is the relation between current (I), voltage (V), and resistance (R)?", options: ["V = IR", "I = VR", "R = IV", "V = I/R"], answer: "V = IR" },
    { question: "Which phenomenon explains the bending of light around obstacles?", options: ["Reflection", "Refraction", "Diffraction", "Polarization"], answer: "Diffraction" }
  ],
  "Physics Quiz 2": [
    { question: "The displacement-time graph of a moving object is a straight line parallel to the time axis. The object is:", options: ["Moving with constant velocity", "At rest", "Accelerating", "Moving with increasing speed"], answer: "At rest" },
    { question: "Which physical quantity is represented by the area under a velocity-time graph?", options: ["Displacement", "Acceleration", "Speed", "Force"], answer: "Displacement" },
    { question: "The heat required to convert 1 kg of a solid into liquid without change in temperature is called:", options: ["Specific heat capacity", "Latent heat of fusion", "Latent heat of vaporization", "Calorific value"], answer: "Latent heat of fusion" },
    { question: "What is the momentum of a 2 kg ball moving at 3 m/s?", options: ["6 kg·m/s", "5 kg·m/s", "1.5 kg·m/s", "0.67 kg·m/s"], answer: "6 kg·m/s" },
    { question: "Ohm's law is not obeyed by:", options: ["Resistors", "Conductors", "Semiconductors", "Superconductors"], answer: "Semiconductors" },
    { question: "The angle of incidence equals angle of reflection is a law of:", options: ["Refraction", "Reflection", "Diffraction", "Dispersion"], answer: "Reflection" },
    { question: "Which wave requires a medium for propagation?", options: ["Light wave", "Sound wave", "Radio wave", "X-ray"], answer: "Sound wave" },
    { question: "Which of the following is a renewable source of energy?", options: ["Coal", "Petroleum", "Solar energy", "Natural gas"], answer: "Solar energy" },
    { question: "The instrument used to measure atmospheric pressure is called:", options: ["Thermometer", "Barometer", "Hydrometer", "Ammeter"], answer: "Barometer" },
    { question: "What happens to resistance of a wire when its length is tripled and cross-sectional area is halved?", options: ["Resistance is 1.5 times", "Resistance is 6 times", "Resistance is half", "Resistance remains same"], answer: "Resistance is 6 times" },
    { question: "Energy stored in a stretched spring is called:", options: ["Kinetic energy", "Potential energy", "Elastic potential energy", "Chemical energy"], answer: "Elastic potential energy" },
    { question: "Which of the following is not a vector quantity?", options: ["Force", "Velocity", "Work", "Displacement"], answer: "Work" },
    { question: "The time period of a pendulum depends on:", options: ["Mass of the bob", "Length of the string", "Amplitude", "Shape of the bob"], answer: "Length of the string" },
    { question: "Which of the following causes tides on Earth?", options: ["Sun's gravity", "Moon's gravity", "Earth's rotation", "Solar wind"], answer: "Moon's gravity" },
    { question: "What is the unit of power?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: "Watt" }
  ],
  "Chemistry Quiz 1": [
    { question: "What is the chemical formula of baking soda?", options: ["NaHCO₃", "NaCl", "KCl", "CaCO₃"], answer: "NaHCO₃" },
    { question: "Which gas is released when an acid reacts with a metal?", options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Nitrogen"], answer: "Hydrogen" },
    { question: "What is the pH value of pure water?", options: ["7", "1", "14", "0"], answer: "7" },
    { question: "Which is an example of a physical change?", options: ["Melting of ice", "Rusting of iron", "Burning of wood", "Digesting food"], answer: "Melting of ice" },
    { question: "What is the valency of oxygen?", options: ["2", "1", "3", "4"], answer: "2" },
    { question: "What happens when iron reacts with steam?", options: ["Forms iron oxide", "Forms iron hydroxide", "Produces hydrogen gas", "No reaction"], answer: "Produces hydrogen gas" },
    { question: "Which acid is found in vinegar?", options: ["Acetic acid", "Sulfuric acid", "Hydrochloric acid", "Citric acid"], answer: "Acetic acid" },
    { question: "What is the molecular formula of glucose?", options: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "CH₄", "C₂H₆O"], answer: "C₆H₁₂O₆" },
    { question: "What is rust chemically known as?", options: ["Iron oxide", "Copper oxide", "Aluminium oxide", "Calcium oxide"], answer: "Iron oxide" },
    { question: "Which element is a noble gas?", options: ["Argon", "Nitrogen", "Oxygen", "Hydrogen"], answer: "Argon" },
    { question: "Which is the correct formula for water?", options: ["H₂O", "HO₂", "OH", "H₂O₂"], answer: "H₂O" },
    { question: "What kind of bond is formed by sharing electrons?", options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"], answer: "Covalent bond" },
    { question: "Which is the most abundant element in Earth's crust?", options: ["Oxygen", "Silicon", "Aluminium", "Iron"], answer: "Oxygen" },
    { question: "What is the atomic number of Carbon?", options: ["6", "12", "14", "8"], answer: "6" },
    { question: "Which gas is responsible for photosynthesis?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" }
  ],
  "Chemistry Quiz 2": [
    { question: "What is the oxidation state of hydrogen in water?", options: ["+1", "-1", "0", "+2"], answer: "+1" },
    { question: "Which is the lightest metal?", options: ["Lithium", "Sodium", "Potassium", "Calcium"], answer: "Lithium" },
    { question: "What is the main gas responsible for acid rain?", options: ["Sulfur dioxide", "Carbon dioxide", "Nitrogen", "Oxygen"], answer: "Sulfur dioxide" },
    { question: "Which element has the highest electronegativity?", options: ["Fluorine", "Oxygen", "Nitrogen", "Chlorine"], answer: "Fluorine" },
    { question: "What is the chemical name of washing soda?", options: ["Sodium carbonate", "Sodium bicarbonate", "Calcium carbonate", "Potassium carbonate"], answer: "Sodium carbonate" },
    { question: "Which metal is liquid at room temperature?", options: ["Mercury", "Lead", "Gold", "Silver"], answer: "Mercury" },
    { question: "What is the pH of lemon juice?", options: ["2", "7", "5", "9"], answer: "2" },
    { question: "Which element is essential for making hemoglobin?", options: ["Iron", "Calcium", "Magnesium", "Potassium"], answer: "Iron" },
    { question: "Which process separates mixtures based on boiling points?", options: ["Filtration", "Distillation", "Evaporation", "Chromatography"], answer: "Distillation" },
    { question: "Which gas is liberated when zinc reacts with dilute sulfuric acid?", options: ["Hydrogen", "Oxygen", "Nitrogen", "Carbon dioxide"], answer: "Hydrogen" },
    { question: "What is the chemical formula for methane?", options: ["CH₄", "C₂H₆", "CO₂", "C₆H₁₂O₆"], answer: "CH₄" },
    { question: "Which of these is an example of an alkali?", options: ["Sodium hydroxide", "Hydrochloric acid", "Carbonic acid", "Sulfuric acid"], answer: "Sodium hydroxide" },
    { question: "Which element is used in pencils?", options: ["Carbon", "Graphite", "Lead", "Tin"], answer: "Graphite" },
    { question: "What is the chemical symbol for potassium?", options: ["K", "P", "Pt", "Po"], answer: "K" },
    { question: "What is the chemical formula for common salt?", options: ["NaCl", "KCl", "Na₂SO₄", "CaCl₂"], answer: "NaCl" }
  ],
  "Biology Quiz 1": [
    { question: "Which part of the cell contains genetic material?", options: ["Cytoplasm", "Nucleus", "Cell membrane", "Mitochondria"], answer: "Nucleus" },
    { question: "What is the process by which plants make their food?", options: ["Photosynthesis", "Respiration", "Transpiration", "Germination"], answer: "Photosynthesis" },
    { question: "Which blood cells help in clotting?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"], answer: "Platelets" },
    { question: "What is the basic unit of life?", options: ["Tissue", "Organ", "Cell", "Organism"], answer: "Cell" },
    { question: "Which organ is responsible for pumping blood?", options: ["Lungs", "Heart", "Kidneys", "Liver"], answer: "Heart" },
    { question: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D" },
    { question: "The process of cell division is called:", options: ["Mitosis", "Meiosis", "Fertilization", "Pollination"], answer: "Mitosis" },
    { question: "Which part of the brain controls balance and coordination?", options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], answer: "Cerebellum" },
    { question: "What do herbivores primarily eat?", options: ["Meat", "Plants", "Both", "None"], answer: "Plants" },
    { question: "Which gas is exchanged during respiration?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
    { question: "Which organ filters blood to produce urine?", options: ["Liver", "Kidney", "Pancreas", "Heart"], answer: "Kidney" },
    { question: "What pigment gives leaves their green color?", options: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"], answer: "Chlorophyll" },
    { question: "The study of heredity is called:", options: ["Genetics", "Botany", "Zoology", "Ecology"], answer: "Genetics" },
    { question: "Which blood group is known as the universal donor?", options: ["A", "B", "O", "AB"], answer: "O" },
    { question: "Which is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Lungs"], answer: "Skin" }
  ]
};

// Enable start button only when quiz selected
quizSelect.addEventListener("change", () => {
  startBtn.disabled = quizSelect.value === "";
});

// Start quiz
startBtn.addEventListener("click", () => {
  if (!quizSelect.value) return;
  currentQuiz = quizSelect.value;
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  answered = false;
  quizSelect.disabled = true;
  startBtn.style.display = "none";
  quizContainer.style.display = "block";
  scoreContainer.style.display = "none";
  nextBtn.disabled = true;
  loadQuestion();
  startTimer();
});

// Load current question
function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  timeLeft = 60;
  timerEl.textContent = timeLeft;

  const questionObj = quizData[currentQuiz][currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${questionObj.question}`;

  optionsContainer.innerHTML = "";

  questionObj.options.forEach(option => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.textContent = option;
    optionDiv.tabIndex = 0; // Make focusable
    optionDiv.setAttribute("role", "button");
    optionDiv.setAttribute("aria-pressed", "false");

    optionDiv.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      selectOption(optionDiv, option, questionObj.answer);
    });

    optionDiv.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !answered) {
        e.preventDefault();
        answered = true;
        selectOption(optionDiv, option, questionObj.answer);
      }
    });

    optionsContainer.appendChild(optionDiv);
  });
}

// Select an option
function selectOption(optionDiv, selected, correct) {
  clearInterval(timer);
  nextBtn.disabled = false;

  // Mark options correct or wrong
  Array.from(optionsContainer.children).forEach(opt => {
    opt.classList.remove("selected", "correct", "wrong");
    opt.setAttribute("aria-pressed", "false");
  });

  optionDiv.classList.add("selected");
  optionDiv.setAttribute("aria-pressed", "true");

  // Highlight correct and wrong answers
  Array.from(optionsContainer.children).forEach(opt => {
    if (opt.textContent === correct) {
      opt.classList.add("correct");
    } else if (opt === optionDiv && selected !== correct) {
      opt.classList.add("wrong");
    }
    // Disable all options after answer selected
    opt.style.pointerEvents = "none";
  });

  if (selected === correct) {
    score++;
  }
}

// Timer function
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!answered) {
        answered = true;
        nextBtn.disabled = false;
        // Highlight correct answer if time runs out without selection
        Array.from(optionsContainer.children).forEach(opt => {
          if (opt.textContent === quizData[currentQuiz][currentQuestionIndex].answer) {
            opt.classList.add("correct");
          }
          opt.style.pointerEvents = "none";
        });
      }
    }
  }, 1000);
}

// Next button click
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData[currentQuiz].length) {
    loadQuestion();
    startTimer();
  } else {
    showScore();
  }
});

// Show final score
function showScore() {
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";
  scoreEl.textContent = score;
  totalEl.textContent = quizData[currentQuiz].length;
  quizSelect.disabled = false;
  startBtn.style.display = "inline-block";
  startBtn.disabled = true;
  quizSelect.value = "";
}

// Restart quiz
restartBtn.addEventListener("click", () => {
  scoreContainer.style.display = "none";
  quizSelect.disabled = false;
  startBtn.style.display = "inline-block";
  startBtn.disabled = true;
  quizSelect.value = "";
});
