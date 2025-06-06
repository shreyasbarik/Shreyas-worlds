// quiz.js
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { app } from './firebase-config.js';

const db = getFirestore(app);
const auth = getAuth();

const quizSelect = document.getElementById('quiz-select');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
const timerEl = document.getElementById('timer');

let currentQuizIndex = null;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;

// 10 Quizzes, each with 15 questions (CBSE Class 10 Science)
const quizzes = [
  {
    title: "Physics - Quiz 1",
    questions: [
      {question:"What is the SI unit of force?", options:["Newton","Joule","Watt","Pascal"], answer:"Newton"},
      {question:"The speed of light in vacuum is approximately?", options:["3x10^8 m/s","3x10^6 m/s","3x10^5 m/s","3x10^7 m/s"], answer:"3x10^8 m/s"},
      {question:"Which device is used to measure electric current?", options:["Voltmeter","Ammeter","Galvanometer","Ohmmeter"], answer:"Ammeter"},
      {question:"Formula for work done is?", options:["Force x distance","Power x time","Energy x time","Force / distance"], answer:"Force x distance"},
      {question:"Energy possessed by a body due to its motion is called?", options:["Potential energy","Kinetic energy","Thermal energy","Chemical energy"], answer:"Kinetic energy"},
      {question:"The unit of electric resistance is?", options:["Ohm","Volt","Ampere","Watt"], answer:"Ohm"},
      {question:"Ohm’s law states the relation between?", options:["Voltage, Current, Resistance","Voltage, Power, Current","Current, Resistance, Time","Voltage, Energy, Resistance"], answer:"Voltage, Current, Resistance"},
      {question:"Which material is a good conductor of electricity?", options:["Rubber","Glass","Copper","Plastic"], answer:"Copper"},
      {question:"Light travels fastest in which medium?", options:["Vacuum","Water","Air","Glass"], answer:"Vacuum"},
      {question:"What is the formula for Power?", options:["Work / Time","Force x Distance","Energy x Time","Voltage x Current"], answer:"Work / Time"},
      {question:"Speed is the rate of change of?", options:["Displacement","Distance","Time","Acceleration"], answer:"Distance"},
      {question:"The unit of frequency is?", options:["Hertz","Joule","Newton","Watt"], answer:"Hertz"},
      {question:"Which force keeps planets in orbit around the sun?", options:["Electromagnetic","Gravitational","Nuclear","Frictional"], answer:"Gravitational"},
      {question:"What is the value of acceleration due to gravity on Earth?", options:["9.8 m/s²","10 m/s²","9 m/s²","8.9 m/s²"], answer:"9.8 m/s²"},
      {question:"The mirror used in headlights of vehicles is?", options:["Convex","Concave","Plane","None"], answer:"Concave"}
    ]
  },
  {
    title: "Physics - Quiz 2",
    questions: [
      {question:"What kind of lens is used in a magnifying glass?", options:["Concave","Convex","Plane","None"], answer:"Convex"},
      {question:"What causes refraction of light?", options:["Change in speed","Reflection","Diffraction","Interference"], answer:"Change in speed"},
      {question:"Unit of electric charge is?", options:["Coulomb","Ampere","Volt","Ohm"], answer:"Coulomb"},
      {question:"The image formed by a plane mirror is?", options:["Real and inverted","Virtual and upright","Real and upright","Virtual and inverted"], answer:"Virtual and upright"},
      {question:"Which phenomenon explains rainbow formation?", options:["Diffraction","Reflection","Dispersion","Refraction"], answer:"Dispersion"},
      {question:"Speed of sound is fastest in?", options:["Air","Water","Steel","Vacuum"], answer:"Steel"},
      {question:"Which color has the shortest wavelength?", options:["Red","Green","Blue","Violet"], answer:"Violet"},
      {question:"Energy cannot be created or destroyed is the law of?", options:["Conservation of energy","Thermodynamics","Motion","Gravity"], answer:"Conservation of energy"},
      {question:"The path followed by light is called?", options:["Ray","Beam","Wave","Particle"], answer:"Ray"},
      {question:"What is the energy stored in a stretched spring called?", options:["Kinetic energy","Potential energy","Thermal energy","Chemical energy"], answer:"Potential energy"},
      {question:"In an electric circuit, the path is?", options:["Open","Closed","Partial","None"], answer:"Closed"},
      {question:"Which metal is used in making electric wires?", options:["Iron","Copper","Aluminium","Gold"], answer:"Copper"},
      {question:"The unit of electric power is?", options:["Watt","Joule","Ampere","Volt"], answer:"Watt"},
      {question:"A current of 1 Ampere means?", options:["1 Coulomb per second","1 Joule per second","1 Watt per second","1 Volt per second"], answer:"1 Coulomb per second"},
      {question:"A device to store electric charge is called?", options:["Battery","Capacitor","Resistor","Inductor"], answer:"Capacitor"}
    ]
  },
  {
    title: "Chemistry - Quiz 3",
    questions: [
      {question:"What is the chemical formula of water?", options:["H2O","CO2","NaCl","O2"], answer:"H2O"},
      {question:"The pH value of pure water is?", options:["7","0","14","1"], answer:"7"},
      {question:"Salt is chemically called?", options:["Sodium chloride","Calcium carbonate","Potassium nitrate","Sodium bicarbonate"], answer:"Sodium chloride"},
      {question:"Which gas is released when an acid reacts with a metal?", options:["Hydrogen","Oxygen","Nitrogen","Carbon dioxide"], answer:"Hydrogen"},
      {question:"Which element has the atomic number 1?", options:["Hydrogen","Oxygen","Carbon","Nitrogen"], answer:"Hydrogen"},
      {question:"Common salt is made of which ions?", options:["Na+ and Cl-","Na+ and O2-","K+ and Cl-","Ca2+ and Cl-"], answer:"Na+ and Cl-"},
      {question:"Which acid is found in vinegar?", options:["Acetic acid","Citric acid","Sulfuric acid","Nitric acid"], answer:"Acetic acid"},
      {question:"What is the chemical formula of baking soda?", options:["NaHCO3","NaCl","CaCO3","KCl"], answer:"NaHCO3"},
      {question:"Which gas do plants absorb?", options:["Carbon dioxide","Oxygen","Nitrogen","Hydrogen"], answer:"Carbon dioxide"},
      {question:"Water boils at what temperature in Celsius?", options:["100","0","50","212"], answer:"100"},
      {question:"The chemical name of chalk is?", options:["Calcium carbonate","Calcium oxide","Sodium carbonate","Magnesium carbonate"], answer:"Calcium carbonate"},
      {question:"Which metal is liquid at room temperature?", options:["Mercury","Iron","Copper","Aluminium"], answer:"Mercury"},
      {question:"pH less than 7 indicates a?", options:["Acid","Base","Neutral","Salt"], answer:"Acid"},
      {question:"Common gas released during photosynthesis?", options:["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"], answer:"Oxygen"},
      {question:"Rust is a compound of?", options:["Iron oxide","Copper oxide","Aluminium oxide","Zinc oxide"], answer:"Iron oxide"}
    ]
  },
  {
    title: "Chemistry - Quiz 4",
    questions: [
      {question:"What is the process of solid turning directly into gas?", options:["Sublimation","Condensation","Evaporation","Melting"], answer:"Sublimation"},
      {question:"The atomic number of carbon is?", options:["6","12","14","8"], answer:"6"},
      {question:"Which is the lightest gas?", options:["Hydrogen","Helium","Oxygen","Nitrogen"], answer:"Hydrogen"},
      {question:"Which compound is called quicklime?", options:["Calcium oxide","Calcium carbonate","Sodium chloride","Magnesium oxide"], answer:"Calcium oxide"},
      {question:"Water is a?", options:["Compound","Element","Mixture","Solution"], answer:"Compound"},
      {question:"Which gas is responsible for global warming?", options:["Carbon dioxide","Oxygen","Nitrogen","Hydrogen"], answer:"Carbon dioxide"},
      {question:"Acid taste is usually?", options:["Sour","Sweet","Bitter","Salty"], answer:"Sour"},
      {question:"Which acid is used in car batteries?", options:["Sulfuric acid","Hydrochloric acid","Nitric acid","Acetic acid"], answer:"Sulfuric acid"},
      {question:"The chemical formula of ammonia is?", options:["NH3","NO2","CO2","H2O"], answer:"NH3"},
      {question:"A solution with pH 8 is?", options:["Basic","Acidic","Neutral","Salty"], answer:"Basic"},
      {question:"The element used in making pencil leads is?", options:["Carbon","Graphite","Lead","Silicon"], answer:"Graphite"},
      {question:"Which is the hardest natural substance?", options:["Diamond","Graphite","Gold","Silver"], answer:"Diamond"},
      {question:"The chemical name of washing soda is?", options:["Sodium carbonate","Sodium chloride","Sodium bicarbonate","Calcium carbonate"], answer:"Sodium carbonate"},
      {question:"The process of rusting requires?", options:["Oxygen and moisture","Oxygen only","Moisture only","Carbon dioxide"], answer:"Oxygen and moisture"},
      {question:"Electrolysis is a process of?", options:["Decomposition by electricity","Combination","Oxidation","Reduction"], answer:"Decomposition by electricity"}
    ]
  },
  {
    title: "Biology - Quiz 5",
    questions: [
      {question:"What is the basic unit of life?", options:["Cell","Tissue","Organ","Organism"], answer:"Cell"},
      {question:"Which blood group is called the universal donor?", options:["O negative","AB positive","A positive","B negative"], answer:"O negative"},
      {question:"Which organ pumps blood in the human body?", options:["Heart","Lungs","Kidneys","Liver"], answer:"Heart"},
      {question:"Photosynthesis occurs in which part of the plant?", options:["Leaves","Stem","Roots","Flowers"], answer:"Leaves"},
      {question:"The process by which plants lose water is called?", options:["Transpiration","Respiration","Photosynthesis","Germination"], answer:"Transpiration"},
      {question:"Which gas do humans breathe in?", options:["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"], answer:"Oxygen"},
      {question:"The genetic material is?", options:["DNA","RNA","Protein","Lipids"], answer:"DNA"},
      {question:"Which vitamin is produced in the skin?", options:["Vitamin D","Vitamin C","Vitamin A","Vitamin B12"], answer:"Vitamin D"},
      {question:"The largest organ in the human body is?", options:["Skin","Heart","Liver","Lungs"], answer:"Skin"},
      {question:"Which part of the brain controls balance?", options:["Cerebellum","Cerebrum","Medulla","Hypothalamus"], answer:"Cerebellum"},
      {question:"Red blood cells carry?", options:["Oxygen","Carbon dioxide","Nitrogen","Glucose"], answer:"Oxygen"},
      {question:"What is the process of cell division called?", options:["Mitosis","Meiosis","Fission","Fusion"], answer:"Mitosis"},
      {question:"Which part of the plant anchors it to the soil?", options:["Roots","Stem","Leaves","Flowers"], answer:"Roots"},
      {question:"Which hormone controls blood sugar level?", options:["Insulin","Adrenaline","Thyroxine","Estrogen"], answer:"Insulin"},
      {question:"Which is a producer in the food chain?", options:["Plant","Tiger","Lion","Human"], answer:"Plant"}
    ]
  },
  {
    title: "Biology - Quiz 6",
    questions: [
      {question:"Which blood cells fight infection?", options:["White blood cells","Red blood cells","Platelets","Plasma"], answer:"White blood cells"},
      {question:"Which organ filters blood?", options:["Kidneys","Liver","Lungs","Heart"], answer:"Kidneys"},
      {question:"The food pipe is called?", options:["Esophagus","Trachea","Larynx","Bronchi"], answer:"Esophagus"},
      {question:"What pigment gives plants their green color?", options:["Chlorophyll","Carotene","Xanthophyll","Anthocyanin"], answer:"Chlorophyll"},
      {question:"The human skeleton is made of?", options:["Bones","Muscles","Cartilage","Tendons"], answer:"Bones"},
      {question:"Which part controls voluntary movements?", options:["Cerebrum","Cerebellum","Medulla","Spinal cord"], answer:"Cerebrum"},
      {question:"What is the function of platelets?", options:["Clotting blood","Carrying oxygen","Fighting infection","Producing hormones"], answer:"Clotting blood"},
      {question:"Which vitamin is important for blood clotting?", options:["Vitamin K","Vitamin C","Vitamin D","Vitamin A"], answer:"Vitamin K"},
      {question:"What type of joint is the knee?", options:["Hinge","Ball and socket","Pivot","Gliding"], answer:"Hinge"},
      {question:"The male reproductive organ is?", options:["Testes","Ovary","Uterus","Penis"], answer:"Testes"},
      {question:"Which part of the eye controls amount of light?", options:["Iris","Cornea","Lens","Retina"], answer:"Iris"},
      {question:"Plants prepare food by?", options:["Photosynthesis","Respiration","Transpiration","Osmosis"], answer:"Photosynthesis"},
      {question:"The excretory organ in humans is?", options:["Kidneys","Liver","Lungs","Skin"], answer:"Kidneys"},
      {question:"The study of inheritance is called?", options:["Genetics","Botany","Zoology","Ecology"], answer:"Genetics"},
      {question:"The smallest bone in the human body is found in?", options:["Ear","Hand","Foot","Nose"], answer:"Ear"}
    ]
  },
  {
    title: "Biology - Quiz 7",
    questions: [
      {question:"Which blood component transports oxygen?", options:["Hemoglobin","Plasma","Platelets","White blood cells"], answer:"Hemoglobin"},
      {question:"Which gas exchange occurs in plants?", options:["Oxygen and carbon dioxide","Nitrogen and oxygen","Hydrogen and oxygen","Carbon monoxide and oxygen"], answer:"Oxygen and carbon dioxide"},
      {question:"What is the study of living organisms called?", options:["Biology","Physics","Chemistry","Geology"], answer:"Biology"},
      {question:"Which part of the brain controls heartbeat?", options:["Medulla","Cerebrum","Cerebellum","Hypothalamus"], answer:"Medulla"},
      {question:"The process by which plants lose water is called?", options:["Transpiration","Respiration","Photosynthesis","Germination"], answer:"Transpiration"},
      {question:"Which vitamin prevents scurvy?", options:["Vitamin C","Vitamin A","Vitamin D","Vitamin B12"], answer:"Vitamin C"},
      {question:"Blood is pumped from the heart to the lungs by?", options:["Pulmonary artery","Aorta","Pulmonary vein","Vena cava"], answer:"Pulmonary artery"},
      {question:"Which hormone controls metabolism?", options:["Thyroxine","Insulin","Adrenaline","Testosterone"], answer:"Thyroxine"},
      {question:"The cell wall is found in?", options:["Plants","Animals","Fungi","Bacteria"], answer:"Plants"},
      {question:"The process of cell division in sex cells is called?", options:["Meiosis","Mitosis","Binary fission","Budding"], answer:"Meiosis"},
      {question:"Which organ is responsible for digestion?", options:["Stomach","Heart","Lungs","Kidneys"], answer:"Stomach"},
      {question:"The sugar present in milk is called?", options:["Lactose","Glucose","Fructose","Sucrose"], answer:"Lactose"},
      {question:"Which part of the plant transports water?", options:["Xylem","Phloem","Roots","Stem"], answer:"Xylem"},
      {question:"The female reproductive organ is?", options:["Ovary","Testes","Uterus","Penis"], answer:"Ovary"},
      {question:"The outer layer of skin is called?", options:["Epidermis","Dermis","Hypodermis","Subcutaneous"], answer:"Epidermis"}
    ]
  },
  {
    title: "Physics - Quiz 8",
    questions: [
      {question:"The property of a body to resist change in its state of motion is called?", options:["Inertia","Momentum","Force","Energy"], answer:"Inertia"},
      {question:"Which force opposes motion between two surfaces?", options:["Friction","Gravity","Magnetism","Electric force"], answer:"Friction"},
      {question:"The energy possessed by a body due to its position is?", options:["Potential energy","Kinetic energy","Thermal energy","Sound energy"], answer:"Potential energy"},
      {question:"Light travels in?", options:["Straight line","Curved path","Circle","Zigzag"], answer:"Straight line"},
      {question:"The SI unit of pressure is?", options:["Pascal","Newton","Joule","Watt"], answer:"Pascal"},
      {question:"Sound needs which medium to travel?", options:["Medium","Vacuum","Space","None"], answer:"Medium"},
      {question:"Which of the following is a renewable source of energy?", options:["Solar energy","Coal","Petroleum","Natural gas"], answer:"Solar energy"},
      {question:"The angle of incidence is equal to?", options:["Angle of reflection","Angle of refraction","Angle of deviation","None"], answer:"Angle of reflection"},
      {question:"The basic unit of electric current is?", options:["Ampere","Volt","Ohm","Watt"], answer:"Ampere"},
      {question:"What is the unit of work?", options:["Joule","Watt","Newton","Pascal"], answer:"Joule"},
      {question:"The bending of light when it passes from one medium to another is called?", options:["Refraction","Reflection","Diffraction","Dispersion"], answer:"Refraction"},
      {question:"The speed of sound is affected by?", options:["Temperature","Humidity","Pressure","All"], answer:"All"},
      {question:"The electrical resistance depends on?", options:["Length and area","Material and temperature","Both","None"], answer:"Both"},
      {question:"The magnetic effect of current was discovered by?", options:["Oersted","Faraday","Tesla","Newton"], answer:"Oersted"},
      {question:"The SI unit of electric charge is?", options:["Coulomb","Volt","Ampere","Ohm"], answer:"Coulomb"}
    ]
  },
  {
    title: "Chemistry - Quiz 9",
    questions: [
      {question:"The chemical symbol of gold is?", options:["Au","Ag","Gd","Ga"], answer:"Au"},
      {question:"The chemical formula of table salt is?", options:["NaCl","KCl","CaCl2","MgCl2"], answer:"NaCl"},
      {question:"Which acid is found in lemon?", options:["Citric acid","Sulfuric acid","Nitric acid","Hydrochloric acid"], answer:"Citric acid"},
      {question:"Which is a base?", options:["NaOH","HCl","H2SO4","CH4"], answer:"NaOH"},
      {question:"What is the pH of neutral substances?", options:["7","0","14","1"], answer:"7"},
      {question:"Water is?", options:["Polar molecule","Non-polar molecule","Gas","Solid"], answer:"Polar molecule"},
      {question:"Which element is used in bulbs?", options:["Tungsten","Copper","Aluminium","Iron"], answer:"Tungsten"},
      {question:"Which gas causes acid rain?", options:["Sulfur dioxide","Carbon dioxide","Oxygen","Nitrogen"], answer:"Sulfur dioxide"},
      {question:"Which of these is a noble gas?", options:["Helium","Oxygen","Nitrogen","Hydrogen"], answer:"Helium"},
      {question:"The formula for methane is?", options:["CH4","CO2","C2H6","H2O"], answer:"CH4"},
      {question:"The process of converting gas to liquid is called?", options:["Condensation","Evaporation","Sublimation","Melting"], answer:"Condensation"},
      {question:"An example of a mixture is?", options:["Air","Water","Salt","Sugar"], answer:"Air"},
      {question:"The most abundant element in the Earth's crust is?", options:["Oxygen","Silicon","Aluminium","Iron"], answer:"Oxygen"},
      {question:"Which element is used in making fertilizers?", options:["Nitrogen","Oxygen","Carbon","Hydrogen"], answer:"Nitrogen"},
      {question:"Which of these is a hydrocarbon?", options:["Propane","Water","Oxygen","Carbon dioxide"], answer:"Propane"}
    ]
  },
  {
    title: "Biology - Quiz 10",
    questions: [
      {question:"The process by which plants make their food?", options:["Photosynthesis","Respiration","Transpiration","Osmosis"], answer:"Photosynthesis"},
      {question:"Which organ produces insulin?", options:["Pancreas","Liver","Kidney","Heart"], answer:"Pancreas"},
      {question:"Which blood vessels carry blood away from the heart?", options:["Arteries","Veins","Capillaries","Venules"], answer:"Arteries"},
      {question:"The largest part of the brain is?", options:["Cerebrum","Cerebellum","Medulla","Hypothalamus"], answer:"Cerebrum"},
      {question:"Which part of the cell controls activities?", options:["Nucleus","Mitochondria","Ribosome","Golgi body"], answer:"Nucleus"},
      {question:"The system responsible for transport in plants is?", options:["Xylem and phloem","Roots","Leaves","Stem"], answer:"Xylem and phloem"},
      {question:"The human body's first line of defense?", options:["Skin","Blood","Lungs","Heart"], answer:"Skin"},
      {question:"Which gas do humans exhale?", options:["Carbon dioxide","Oxygen","Nitrogen","Hydrogen"], answer:"Carbon dioxide"},
      {question:"The smallest blood vessels are called?", options:["Capillaries","Arteries","Veins","Venules"], answer:"Capillaries"},
      {question:"Which part of the eye detects light?", options:["Retina","Lens","Cornea","Iris"], answer:"Retina"},
      {question:"The process by which cells divide to form two identical cells is?", options:["Mitosis","Meiosis","Fission","Fusion"], answer:"Mitosis"},
      {question:"Which vitamin is essential for blood clotting?", options:["Vitamin K","Vitamin C","Vitamin D","Vitamin A"], answer:"Vitamin K"},
      {question:"Which part of the plant absorbs water?", options:["Roots","Leaves","Stem","Flowers"], answer:"Roots"},
      {question:"Which organ stores bile?", options:["Gall bladder","Liver","Kidneys","Pancreas"], answer:"Gall bladder"},
      {question:"The process of breathing is called?", options:["Respiration","Photosynthesis","Transpiration","Germination"], answer:"Respiration"}
    ]
  }
];

function populateQuizSelect() {
  quizzes.forEach((quiz, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = quiz.title;
    quizSelect.appendChild(option);
  });
}

function startTimer() {
  timeLeft = 60;
  timerEl.textContent = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      // Auto move to next question
      nextBtn.disabled = false;
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  nextBtn.disabled = true;
  const currentQuiz = quizzes[currentQuizIndex];
  const currentQ = currentQuiz.questions[currentQuestionIndex];
  questionEl.textContent = `Q${currentQuestionIndex + 1}. ${currentQ.question}`;
  optionsEl.innerHTML = "";

  currentQ.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.style.padding = "0.6rem 1rem";
    btn.style.fontSize = "1rem";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "5px";
    btn.style.border = "1px solid #ccc";
    btn.style.backgroundColor = "white";

    btn.onclick = () => {
      // Disable all buttons after selection
      Array.from(optionsEl.children).forEach(b => b.disabled = true);
      nextBtn.disabled = false;

      if (opt === currentQ.answer) {
        score++;
        btn.style.backgroundColor = "#4caf50"; // green
      } else {
        btn.style.backgroundColor = "#f44336"; // red
        // Highlight correct answer
        Array.from(optionsEl.children).forEach(b => {
          if (b.textContent === currentQ.answer) {
            b.style.backgroundColor = "#4caf50";
          }
        });
      }
      clearInterval(timer);
    };
    optionsEl.appendChild(btn);
  });

  startTimer();
}

async function saveResult(score, total, quizTitle, userId) {
  try {
    const docRef = await addDoc(collection(db, "quizResults"), {
      userId: userId,
      quizTitle: quizTitle,
      score: score,
      total: total,
      timestamp: new Date()
    });
    console.log("Result saved with ID:", docRef.id);
  } catch (e) {
    console.error("Error saving result:", e);
  }
}

function showResult() {
  quizContainer.style.display = "none";
  resultEl.style.display = "block";
  scoreEl.textContent = `${score} / ${quizzes[currentQuizIndex].questions.length}`;
}

function resetQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  resultEl.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= quizzes[currentQuizIndex].questions.length) {
    showResult();
    // Save result to Firestore
    const user = auth.currentUser;
    if (user) {
      saveResult(score, quizzes[currentQuizIndex].questions.length, quizzes[currentQuizIndex].title, user.uid);
    }
  } else {
    showQuestion();
  }
}

quizSelect.addEventListener('change', () => {
  if (!auth.currentUser) {
    alert("Please login to start the quiz.");
    quizSelect.value = "";
    return;
  }
  currentQuizIndex = parseInt(quizSelect.value);
  score = 0;
  currentQuestionIndex = 0;
  resultEl.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
});

restartBtn.addEventListener("click", () => {
  resetQuiz();
});

// On load
populateQuizSelect();
