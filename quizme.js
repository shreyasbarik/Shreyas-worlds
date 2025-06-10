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
const quizzes = {
  "Physics Quiz 1": [
    { question: "What is the focal length of a concave mirror whose radius of curvature is 40 cm?", options: ["20 cm", "40 cm", "80 cm", "10 cm"], answer: "20 cm" },
    { question: "Which of the following always produces a virtual, erect, and diminished image?", options: ["Concave mirror", "Plane mirror", "Convex mirror", "Convex lens"], answer: "Convex mirror" },
    { question: "An object is placed 30 cm in front of a concave mirror of focal length 15 cm. Where will the image form?", options: ["At focus", "At center of curvature", "At infinity", "Between pole and focus"], answer: "At 30 cm behind the mirror" },
    { question: "Which mirror is used as a shaving mirror and why?", options: ["Concave, as it gives enlarged virtual image", "Convex, as it forms real image", "Plane, as it reflects accurately", "Convex, as it covers wider view"], answer: "Concave, as it gives enlarged virtual image" },
    { question: "Magnification produced by a plane mirror is:", options: ["Less than 1", "More than 1", "Equal to 1", "Zero"], answer: "Equal to 1" },
    { question: "Which of the following quantities is always positive in case of a convex mirror?", options: ["Focal length", "Object distance", "Image distance", "Height of object"], answer: "Focal length" },
    { question: "A concave mirror forms a real image when the object is placed:", options: ["Between focus and pole", "At focus", "Beyond center of curvature", "Very close to pole"], answer: "Beyond center of curvature" },
    { question: "If an object is placed at the center of curvature of a concave mirror, the image will be:", options: ["At infinity", "At focus", "At the center of curvature", "Between pole and focus"], answer: "At the center of curvature" },
    { question: "What is the nature of the image formed by a convex mirror?", options: ["Virtual and erect", "Real and inverted", "Real and erect", "Virtual and inverted"], answer: "Virtual and erect" },
    { question: "Which of the following is used in car side-view mirrors?", options: ["Plane mirror", "Concave mirror", "Convex mirror", "None of these"], answer: "Convex mirror" },
    { question: "An object is placed between the pole and focus of a concave mirror. The image formed is:", options: ["Virtual, erect, and enlarged", "Real and diminished", "Real and inverted", "Virtual and diminished"], answer: "Virtual, erect, and enlarged" },
    { question: "In mirror formula, what is the sign convention for focal length of a concave mirror?", options: ["Positive", "Negative", "Zero", "Depends on the object"], answer: "Negative" },
    { question: "The point where the parallel rays converge after reflection from a concave mirror is called:", options: ["Aperture", "Center", "Pole", "Focus"], answer: "Focus" },
    { question: "When the object moves closer to the mirror, the image:", options: ["Becomes larger", "Becomes smaller", "Remains the same", "Disappears"], answer: "Becomes larger" },
    { question: "What type of image is formed by plane mirrors?", options: ["Real and inverted", "Virtual and erect", "Real and erect", "Inverted and magnified"], answer: "Virtual and erect" }
  ],

  "Physics Quiz 2": [
    { question: "A ray of light enters from air to glass. What happens to its speed?", options: ["Increases", "Decreases", "Remains same", "Becomes zero"], answer: "Decreases" },
    { question: "Refractive index of a medium is defined as:", options: ["1/sin i", "sin i/sin r", "sin r/sin i", "speed in medium / speed in vacuum"], answer: "sin i/sin r" },
    { question: "What is the unit of refractive index?", options: ["m", "cm", "no unit", "m/s"], answer: "no unit" },
    { question: "The image formed by a convex lens when object is placed between optical center and focus is:", options: ["Real and inverted", "Virtual and erect", "Real and erect", "Enlarged and inverted"], answer: "Virtual and erect" },
    { question: "In a lens, the distance between the optical center and principal focus is called:", options: ["Aperture", "Radius", "Focal length", "Height"], answer: "Focal length" },
    { question: "Which lens is used in magnifying glasses?", options: ["Concave", "Convex", "Plano-convex", "Bi-concave"], answer: "Convex" },
    { question: "Power of lens is measured in:", options: ["Meter", "Dioptre", "Joule", "Candela"], answer: "Dioptre" },
    { question: "A lens with focal length of 50 cm has power:", options: ["+2 D", "+0.5 D", "+5 D", "+10 D"], answer: "+2 D" },
    { question: "A diverging lens always forms an image that is:", options: ["Real, inverted", "Virtual, erect", "Real, erect", "Inverted and enlarged"], answer: "Virtual, erect" },
    { question: "A light ray passing through the optical center of lens:", options: ["Gets reflected", "Refracted", "Passes undeviated", "Bends twice"], answer: "Passes undeviated" },
    { question: "Which device uses total internal reflection?", options: ["Lens", "Mirror", "Optical fiber", "Projector"], answer: "Optical fiber" },
    { question: "Critical angle increases when light goes from:", options: ["Air to glass", "Glass to air", "Water to diamond", "Diamond to air"], answer: "Glass to air" },
    { question: "The bending of light at the boundary of two mediums is called:", options: ["Reflection", "Refraction", "Dispersion", "Scattering"], answer: "Refraction" },
    { question: "Which medium has the highest refractive index?", options: ["Water", "Glass", "Air", "Diamond"], answer: "Diamond" },
    { question: "What is the sign of power of a concave lens?", options: ["Positive", "Negative", "Zero", "Infinite"], answer: "Negative" }
  ],

  "Chemistry Quiz 1": [
    { question: "Which of the following reactions is a displacement reaction?", options: ["Fe + CuSO₄ → FeSO₄ + Cu", "HCl + NaOH → NaCl + H₂O", "AgNO₃ + NaCl → AgCl + NaNO₃", "CaO + H₂O → Ca(OH)₂"], answer: "Fe + CuSO₄ → FeSO₄ + Cu" },
    { question: "Which of the following is an endothermic reaction?", options: ["Photosynthesis", "Combustion", "Neutralisation", "Respiration"], answer: "Photosynthesis" },
    { question: "Which of the following changes is not a chemical change?", options: ["Burning of paper", "Rusting of iron", "Melting of ice", "Cooking food"], answer: "Melting of ice" },
    { question: "What is the balanced form of: H₂ + O₂ → H₂O", options: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + ½O₂ → H₂O", "2H₂ + 2O₂ → 2H₂O"], answer: "2H₂ + O₂ → 2H₂O" },
    { question: "What type of reaction is: CaCO₃ → CaO + CO₂?", options: ["Combination", "Decomposition", "Displacement", "Double Displacement"], answer: "Decomposition" },
    { question: "Which is used to detect evolution of CO₂ gas in lab?", options: ["Limewater", "Litmus", "Benedict solution", "Phenolphthalein"], answer: "Limewater" },
    { question: "Corrosion of iron is an example of:", options: ["Oxidation", "Reduction", "Decomposition", "Combination"], answer: "Oxidation" },
    { question: "A white insoluble substance formed in a chemical reaction is called:", options: ["Salt", "Acid", "Base", "Precipitate"], answer: "Precipitate" },
    { question: "In the reaction Zn + H₂SO₄ → ZnSO₄ + H₂, H₂ is:", options: ["Oxidised", "Reduced", "Precipitated", "Neutralised"], answer: "Reduced" },
    { question: "Which of these is not a redox reaction?", options: ["Combustion", "Displacement", "Neutralization", "Rusting"], answer: "Neutralization" },
    { question: "Color change in reactions is an indicator of:", options: ["Physical change", "Endothermic reaction", "Chemical change", "No change"], answer: "Chemical change" },
    { question: "Which of the following is a photochemical reaction?", options: ["Photosynthesis", "Rusting", "Respiration", "Neutralization"], answer: "Photosynthesis" },
    { question: "Which of these is not a characteristic of chemical reactions?", options: ["Gas evolution", "Color change", "Melting", "Temperature change"], answer: "Melting" },
    { question: "Decomposition of water into H₂ and O₂ is a:", options: ["Thermal decomposition", "Electrolytic decomposition", "Photochemical decomposition", "Combination reaction"], answer: "Electrolytic decomposition" },
    { question: "The rusting of iron involves which reaction?", options: ["Redox", "Acid-base", "Precipitation", "Combination"], answer: "Redox" }
  ],

  "Chemistry Quiz 2": [
    { question: "What is the product of: 2Al + Fe₂O₃ → ?", options: ["Fe and Al₂O₃", "Fe and AlO", "FeO and Al", "Fe₂O₃ and Al"], answer: "Fe and Al₂O₃" },
    { question: "Which reaction is used in black and white photography?", options: ["Decomposition of AgBr", "Combustion", "Displacement", "Neutralization"], answer: "Decomposition of AgBr" },
    { question: "What type of reaction is: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl?", options: ["Double displacement", "Combination", "Displacement", "Decomposition"], answer: "Double displacement" },
    { question: "What is the gas released when dilute HCl reacts with Zn?", options: ["O₂", "H₂", "CO₂", "Cl₂"], answer: "H₂" },
    { question: "Which of the following is used as an oxidising agent?", options: ["Oxygen", "Hydrogen", "Chlorine", "Sulfur"], answer: "Oxygen" },
    { question: "The reaction Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag is:", options: ["Displacement", "Double displacement", "Decomposition", "Combustion"], answer: "Displacement" },
    { question: "Color of copper sulphate solution?", options: ["Blue", "Green", "Red", "White"], answer: "Blue" },
    { question: "Burning of LPG is a:", options: ["Exothermic reaction", "Endothermic reaction", "Neutralization", "Displacement"], answer: "Exothermic reaction" },
    { question: "Which is a thermal decomposition reaction?", options: ["CaCO₃ → CaO + CO₂", "NaOH + HCl → NaCl + H₂O", "Fe + CuSO₄ → FeSO₄ + Cu", "NaCl → Na + Cl"], answer: "CaCO₃ → CaO + CO₂" },
    { question: "Which one is not a sign of a chemical reaction?", options: ["Bubbling", "Heat production", "Color change", "Change of state"], answer: "Change of state" },
    { question: "Rust is a compound of:", options: ["Fe and O₂", "Fe and H₂", "Fe and Cl₂", "Fe and N₂"], answer: "Fe and O₂" },
    { question: "Which gas smells like rotten eggs in reactions?", options: ["Hydrogen sulfide", "Carbon dioxide", "Ammonia", "Methane"], answer: "Hydrogen sulfide" },
    { question: "Electrolysis is a:", options: ["Redox process", "Neutralization", "Precipitation", "No reaction"], answer: "Redox process" },
    { question: "Which compound is formed in a neutralization reaction?", options: ["Salt and water", "Acid and base", "Only salt", "Gas and water"], answer: "Salt and water" },
    { question: "Which of these is a balanced equation?", options: ["2H₂ + O₂ → 2H₂O", "H₂ + O₂ → H₂O", "H₂O + H → H₂", "NaCl → Na + Cl"], answer: "2H₂ + O₂ → 2H₂O" }
  ],

  "Biology Quiz 1": [
    { question: "What enzyme is responsible for breakdown of starch in saliva?", options: ["Amylase", "Lipase", "Pepsin", "Trypsin"], answer: "Amylase" },
    { question: "In photosynthesis, light energy is absorbed by:", options: ["Chlorophyll", "Mitochondria", "Xylem", "Nucleus"], answer: "Chlorophyll" },
    { question: "Which part of the alimentary canal absorbs water?", options: ["Small intestine", "Stomach", "Large intestine", "Mouth"], answer: "Large intestine" },
    { question: "The process of breaking food into simpler forms is called:", options: ["Assimilation", "Ingestion", "Digestion", "Egestion"], answer: "Digestion" },
    { question: "Which blood vessels carry oxygenated blood away from the heart?", options: ["Veins", "Arteries", "Capillaries", "Venules"], answer: "Arteries" },
    { question: "Which organ produces bile?", options: ["Pancreas", "Liver", "Gallbladder", "Stomach"], answer: "Liver" },
    { question: "What is the main function of stomata?", options: ["Respiration", "Water absorption", "Transpiration and gas exchange", "Photosynthesis"], answer: "Transpiration and gas exchange" },
    { question: "What is the respiratory pigment in humans?", options: ["Myoglobin", "Hemoglobin", "Chlorophyll", "Insulin"], answer: "Hemoglobin" },
    { question: "Which process in plants uses energy from sunlight?", options: ["Respiration", "Photosynthesis", "Translocation", "Osmosis"], answer: "Photosynthesis" },
    { question: "What is the site of aerobic respiration in a cell?", options: ["Nucleus", "Chloroplast", "Mitochondria", "Cytoplasm"], answer: "Mitochondria" },
    { question: "Where does digestion of proteins begin?", options: ["Mouth", "Stomach", "Small intestine", "Large intestine"], answer: "Stomach" },
    { question: "Which structure prevents food from entering windpipe?", options: ["Larynx", "Trachea", "Epiglottis", "Pharynx"], answer: "Epiglottis" },
    { question: "Excretion in amoeba takes place through:", options: ["Contractile vacuole", "Cilia", "Anal pore", "Pseudopodia"], answer: "Contractile vacuole" },
    { question: "Which process removes metabolic wastes?", options: ["Respiration", "Photosynthesis", "Excretion", "Transpiration"], answer: "Excretion" },
    { question: "The process by which green plants make food is:", options: ["Photosynthesis", "Respiration", "Fermentation", "Glycolysis"], answer: "Photosynthesis" }
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
