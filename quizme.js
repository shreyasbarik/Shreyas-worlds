import React, { useMemo, useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CircleHelp, Clock3, Moon, SunMedium, Sparkles, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ------------------------------
// 🎯 CONFIG
// ------------------------------
const PER_QUESTION_SECONDS_DEFAULT = 45; // you can tweak from UI

// Utility: shuffle a copy
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ------------------------------
// 📚 QUESTION BANK (6 chapters × 15 Q each = 90 MCQs)
// Aligned to CBSE Class 10 Science core concepts.
// ------------------------------
const BANK = {
  "Physics – Light: Reflection & Refraction": [
    { q: "The focal length f of a concave mirror with radius of curvature 40 cm is:", opts: ["40 cm", "20 cm", "10 cm", "–20 cm"], a: 1, hint: "f = R/2, by sign convention f is –ve for concave but magnitude is 20 cm." },
    { q: "An object between pole and focus of a concave mirror forms an image that is:", opts: ["Real, inverted, enlarged", "Virtual, erect, enlarged", "Virtual, erect, diminished", "Real, inverted, diminished"], a: 1 },
    { q: "Convex mirrors used as vehicle side mirrors are preferred because they:", opts: ["Give real images", "Provide a wider field of view", "Magnify nearby traffic", "Have shorter focal length"], a: 1 },
    { q: "Refractive index n is defined as:", opts: ["sin r / sin i", "sin i / sin r", "v/v₀", "c/v"], a: 3, hint: "n = c/v; also Snell's law: n = sin i / sin r." },
    { q: "Power of a lens is measured in:", opts: ["Dioptre", "Tesla", "Joule", "Newton"], a: 0 },
    { q: "A light ray through the optical centre of a thin lens:", opts: ["Bends towards normal", "Emerges undeviated", "Gets reflected", "Forms no image"], a: 1 },
    { q: "Critical angle increases when light travels from:", opts: ["Air → glass", "Water → diamond", "Glass → air", "Diamond → air"], a: 2 },
    { q: "A concave lens always forms an image that is:", opts: ["Real, inverted", "Real, erect", "Virtual, erect", "Real, magnified"], a: 2 },
    { q: "For a convex lens of f = 25 cm, the power is:", opts: ["+0.25 D", "+2 D", "+4 D", "–4 D"], a: 2, hint: "P (in D) = 1/f(m) = 1/0.25 = 4 D." },
    { q: "In a concave mirror, the image of an object at C (centre of curvature) is formed:", opts: ["At focus, enlarged", "At infinity, inverted", "At C, same size, inverted", "Between F and P, virtual"], a: 2 },
    { q: "When the object moves closer to a concave mirror (beyond C → towards F), the image:", opts: ["Becomes smaller and farther", "Becomes larger and moves away", "Stays same", "Disappears"], a: 1 },
    { q: "Dispersion is:", opts: ["Bending of light at a boundary", "Splitting of white light into colours", "Scattering by particles", "Total internal reflection"], a: 1 },
    { q: "Mirror formula is:", opts: ["1/f = 1/u − 1/v", "1/f = 1/v + 1/u", "f = u + v", "v/u = f"], a: 1 },
    { q: "Magnification m for mirrors is:", opts: ["m = hₒ/hᵢ", "m = v/u", "m = u/v", "m = f/u"], a: 1 },
    { q: "A glass slab produces lateral displacement because:", opts: ["refraction at both faces is equal and opposite", "it has plane surfaces only", "reflection dominates", "c = v in glass"], a: 0 }
  ],

  "Physics – Electricity": [
    { q: "SI unit of electric charge is:", opts: ["Ampere", "Coulomb", "Ohm", "Volt"], a: 1 },
    { q: "Ohm’s law states that:", opts: ["V ∝ R", "I ∝ V at constant R", "R ∝ I", "V ∝ 1/I"], a: 1 },
    { q: "Slope of V–I graph for a conductor gives:", opts: ["Resistance", "Resistivity", "Conductance", "Power"], a: 0 },
    { q: "Unit of electrical energy used in homes:", opts: ["W", "kW", "kWh", "J/s"], a: 2 },
    { q: "Resistivity depends on:", opts: ["Length only", "Area only", "Material and temperature", "Potential difference"], a: 2 },
    { q: "Two 2 Ω resistors in series have equivalent:", opts: ["1 Ω", "2 Ω", "3 Ω", "4 Ω"], a: 3 },
    { q: "Two 2 Ω resistors in parallel have equivalent:", opts: ["1 Ω", "2 Ω", "3 Ω", "4 Ω"], a: 1 },
    { q: "Electrical power P can be written as:", opts: ["VI", "I²R", "V²/R", "All of these"], a: 3 },
    { q: "A fuse works on the principle of:", opts: ["Magnetic effect", "Joule heating", "Electromagnetic induction", "Photoelectric effect"], a: 1 },
    { q: "The device used to measure potential difference:", opts: ["Ammeter", "Voltmeter", "Galvanometer", "Photometer"], a: 1 },
    { q: "In household circuits, devices are connected in:", opts: ["Series", "Parallel", "Mixed", "Random"], a: 1 },
    { q: "1 kWh equals:", opts: ["3.6×10³ J", "3.6×10⁶ J", "3.6×10⁵ J", "36 J"], a: 1 },
    { q: "Graph of a filament bulb on V–I plane is:", opts: ["Straight line", "Curve concave down", "Curve concave up", "Circle"], a: 2 },
    { q: "Resistivity unit is:", opts: ["Ω", "Ω m", "Ω/m", "S"], a: 1 },
    { q: "Kirchhoff’s junction rule follows from:", opts: ["Conservation of energy", "Conservation of charge", "Ohm’s law", "Coulomb’s law"], a: 1 }
  ],

  "Physics – Magnetic Effects of Electric Current": [
    { q: "The magnetic field inside a long straight current-carrying conductor is:", opts: ["Zero", "Concentric circles", "Radial lines", "Parallel lines"], a: 1 },
    { q: "Right-hand thumb rule helps to find:", opts: ["Direction of current", "Direction of magnetic field", "Magnitude of force", "Polarity of magnet"], a: 1 },
    { q: "A current-carrying coil placed in a magnetic field experiences:", opts: ["Only torque", "Only force", "Torque and sometimes force", "No effect"], a: 2 },
    { q: "Fleming’s left-hand rule gives direction of:", opts: ["Induced current", "Magnetic field", "Force on a conductor", "Electric field"], a: 2 },
    { q: "A soft iron core in an electromagnet is used because it:", opts: ["Has low permeability", "Retains magnetism", "Quickly magnetizes/demagnetizes", "Is non-magnetic"], a: 2 },
    { q: "The device that converts mechanical energy to electrical energy:", opts: ["Motor", "Generator", "Transformer", "Galvanometer"], a: 1 },
    { q: "Electromagnetic induction refers to:", opts: ["Heating due to current", "Production of current due to changing magnetic field", "Magnetization of iron", "Hall effect"], a: 1 },
    { q: "Domestic power is transmitted at high voltage to:", opts: ["Increase current", "Reduce I²R loss", "Improve safety", "Reduce frequency"], a: 1 },
    { q: "A transformer works on:", opts: ["DC only", "AC only", "Both AC & DC", "Static electricity"], a: 1 },
    { q: "Magnetic field lines:", opts: ["Cross each other", "Emerge from N and enter S", "Start and end at same pole", "Do not form closed loops"], a: 1 },
    { q: "Direction of induced current (generator) is given by:", opts: ["Right-hand thumb rule", "Fleming’s right-hand rule", "Left-hand rule", "Ampere’s law"], a: 1 },
    { q: "A DC motor uses a split ring (commutator) to:", opts: ["Reverse current every half turn", "Increase voltage", "Reduce heating", "Change magnetic field"], a: 0 },
    { q: "The SI unit of magnetic flux is:", opts: ["Weber", "Tesla", "Henry", "Newton"], a: 0 },
    { q: "Magnetic field at the centre of a circular coil is proportional to:", opts: ["Radius", "1/Radius", "Current × turns / radius", "Current × radius"], a: 2 },
    { q: "A relay in circuits is used to:", opts: ["Store charge", "Switch a high-current circuit via a low-current signal", "Measure current", "Reduce voltage"], a: 1 }
  ],

  "Chemistry – Chemical Reactions & Equations": [
    { q: "Which is a displacement reaction?", opts: ["Fe + CuSO₄ → FeSO₄ + Cu", "HCl + NaOH → NaCl + H₂O", "AgNO₃ + NaCl → AgCl + NaNO₃", "CaO + H₂O → Ca(OH)₂"], a: 0 },
    { q: "Balanced form of H₂ + O₂ → H₂O is:", opts: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + ½O₂ → H₂O", "2H₂ + 2O₂ → 2H₂O"], a: 1 },
    { q: "CaCO₃ → CaO + CO₂ is:", opts: ["Combination", "Decomposition", "Displacement", "Double displacement"], a: 1 },
    { q: "Photosynthesis is:", opts: ["Endothermic", "Exothermic", "Neutralisation", "No reaction"], a: 0 },
    { q: "Evolution of CO₂ is tested with:", opts: ["Litmus", "Limewater", "Benedict’s", "KMnO₄"], a: 1 },
    { q: "Rusting of iron is:", opts: ["Reduction", "Oxidation", "Neutralisation", "Precipitation"], a: 1 },
    { q: "A white insoluble solid formed is called:", opts: ["Salt", "Base", "Precipitate", "Oxide"], a: 2 },
    { q: "Electrolysis is a:", opts: ["Precipitation", "Redox process", "No reaction", "Neutralisation"], a: 1 },
    { q: "Thermite reaction 2Al + Fe₂O₃ → 2Fe + Al₂O₃ is:", opts: ["Endothermic", "Displacement (redox)", "Neutralisation", "Photochemical"], a: 1 },
    { q: "Bubbling, heat, colour change usually indicate:", opts: ["Physical change", "Chemical reaction", "Dissolution only", "No change"], a: 1 },
    { q: "Decomposition of AgBr in light is used in:", opts: ["Photography", "Electroplating", "Corrosion", "Neutralisation"], a: 0 },
    { q: "In Zn + H₂SO₄ → ZnSO₄ + H₂, hydrogen is:", opts: ["Oxidised", "Reduced", "Precipitated", "Hydrated"], a: 1 },
    { q: "Which is not a redox reaction?", opts: ["Combustion", "Displacement", "Neutralisation", "Rusting"], a: 2 },
    { q: "Electrolytic decomposition of water gives:", opts: ["H₂ only", "O₂ only", "H₂ and O₂", "H₂O₂"], a: 2 },
    { q: "A balanced equation obeys:", opts: ["Law of multiple proportions", "Law of definite proportions", "Law of conservation of mass", "Raoult’s law"], a: 2 }
  ],

  "Chemistry – Acids, Bases & Salts": [
    { q: "Aqueous solution of an acid has excess of:", opts: ["OH⁻", "H⁺/H₃O⁺", "Na⁺", "Cl⁻"], a: 1 },
    { q: "pH of a neutral solution at 25 °C is:", opts: ["0", "7", "14", "1"], a: 1 },
    { q: "Which indicator is colourless in acid and pink in base?", opts: ["Methyl orange", "Phenolphthalein", "Litmus", "Turmeric"], a: 1 },
    { q: "Common name of NaHCO₃ is:", opts: ["Washing soda", "Baking soda", "Bleaching powder", "Caustic soda"], a: 1 },
    { q: "Bleaching powder is:", opts: ["CaOCl₂", "CaCl₂", "NaOCl", "Ca(OH)₂"], a: 0 },
    { q: "Acid rain mainly due to:", opts: ["CO", "SO₂/NOₓ", "CH₄", "O₃"], a: 1 },
    { q: "A strong acid is one that:", opts: ["Has low pH and ionises almost completely", "Is highly concentrated always", "Is always dangerous", "Has high pH"], a: 0 },
    { q: "Milk of magnesia relieves acidity because it is:", opts: ["Acidic", "Neutral", "Basic (Mg(OH)₂)", "Salt"], a: 2 },
    { q: "Brine used in chlor-alkali process is:", opts: ["Conc. NaCl(aq)", "KCl(aq)", "NaOH(aq)", "HCl(aq)"], a: 0 },
    { q: "Plaster of Paris formula is:", opts: ["CaSO₄·2H₂O", "CaSO₄·½H₂O", "CaCO₃", "CaO"], a: 1 },
    { q: "Tooth decay occurs more below pH:", opts: ["5.5", "7.0", "8.5", "10.0"], a: 0 },
    { q: "An alkali is:", opts: ["Any base", "Water-soluble base", "Neutral salt", "Acidic salt"], a: 1 },
    { q: "Acid + Base → Salt + Water is:", opts: ["Neutralisation", "Combustion", "Displacement", "Decomposition"], a: 0 },
    { q: "pH paper turns which colour for strong base?", opts: ["Red", "Orange", "Green", "Deep blue/purple"], a: 3 },
    { q: "Tartaric acid is added in baking powder to:", opts: ["Provide taste only", "Control pH and avoid bitter Na₂CO₃", "Increase moisture", "Increase saltiness"], a: 1 }
  ],

  "Biology – Life Processes": [
    { q: "Enzyme in saliva that digests starch:", opts: ["Pepsin", "Amylase", "Lipase", "Trypsin"], a: 1 },
    { q: "Site of aerobic respiration in a cell:", opts: ["Cytoplasm", "Nucleus", "Mitochondria", "Chloroplast"], a: 2 },
    { q: "Main function of stomata:", opts: ["Water absorption", "Gas exchange and transpiration", "Transport of food", "Respiration only"], a: 1 },
    { q: "Protein digestion begins in:", opts: ["Mouth", "Stomach", "Small intestine", "Large intestine"], a: 1 },
    { q: "Respiratory pigment in humans:", opts: ["Chlorophyll", "Myoglobin", "Haemoglobin", "Insulin"], a: 2 },
    { q: "Which vessels carry blood away from heart?", opts: ["Veins", "Capillaries", "Arteries", "Venules"], a: 2 },
    { q: "Bile is produced by:", opts: ["Pancreas", "Liver", "Gall bladder", "Duodenum"], a: 1 },
    { q: "Translocation of food in plants occurs through:", opts: ["Xylem", "Phloem", "Stomata", "Cuticle"], a: 1 },
    { q: "Epiglottis prevents entry of food into:", opts: ["Oesophagus", "Trachea (windpipe)", "Pharynx", "Larynx"], a: 1 },
    { q: "Excretion in amoeba via:", opts: ["Anal pore", "Contractile vacuole", "Cilia", "Pseudopodia"], a: 1 },
    { q: "Largest site of nutrient absorption:", opts: ["Stomach", "Large intestine", "Small intestine", "Rectum"], a: 2 },
    { q: "The functional unit of kidney:", opts: ["Neuron", "Nephron", "Neurilemma", "Neuroglia"], a: 1 },
    { q: "In photosynthesis, light is captured by:", opts: ["Chlorophyll", "Carotene only", "Mitochondria", "Stroma"], a: 0 },
    { q: "Guard cells regulate:", opts: ["Opening/closing of stomata", "Rate of heartbeat", "Nerve impulses", "Bone growth"], a: 0 },
    { q: "Anaerobic respiration in muscles forms:", opts: ["Ethanol", "Lactic acid", "Pyruvate", "Acetyl-CoA"], a: 1 }
  ],
};

const CHAPTERS = Object.keys(BANK);

// ------------------------------
// 🔊 Tiny SFX (optional)
// ------------------------------
const beep = (freq = 880, dur = 80) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine"; o.frequency.value = freq; o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    o.start();
    setTimeout(() => { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02); o.stop(); ctx.close(); }, dur);
  } catch {}
};

// ------------------------------
// 🌙 Theme hook
// ------------------------------
function useTheme() {
  const [dark, setDark] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return { dark, setDark };
}

// ------------------------------
// 🧠 Main Component
// ------------------------------
export default function SharvikaProQuiz() {
  const { dark, setDark } = useTheme();
  const [chapter, setChapter] = useState("");
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [order, setOrder] = useState([]); // shuffled order of questions
  const [marked, setMarked] = useState({}); // qId -> selected index
  const [showAns, setShowAns] = useState(false);
  const [perQSeconds, setPerQSeconds] = useState(PER_QUESTION_SECONDS_DEFAULT);
  const [tick, setTick] = useState(0); // countdown
  const [mute, setMute] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Build question list when chapter changes
  const questions = useMemo(() => chapter ? BANK[chapter] : [], [chapter]);

  // Shuffle order on start
  const startQuiz = () => {
    const seq = questions.map((_, i) => i);
    setOrder(shuffle(seq));
    setMarked({});
    setQIndex(0);
    setShowAns(false);
    setReviewMode(false);
    setStarted(true);
    setTick(perQSeconds);
    if (!mute) beep(1100, 120);
  };

  // Timer per question
  useEffect(() => {
    if (!started || reviewMode) return;
    if (tick <= 0) return; // will auto reveal answer
    const id = setTimeout(() => setTick(tick - 1), 1000);
    return () => clearTimeout(id);
  }, [tick, started, reviewMode]);

  // When time runs out → show answer + enable next
  useEffect(() => {
    if (!started || reviewMode) return;
    if (tick === 0) {
      setShowAns(true);
      if (!mute) beep(420, 150);
    }
  }, [tick, started, reviewMode, mute]);

  const total = questions.length;
  const cur = order[qIndex] ?? 0;
  const q = questions[cur];

  const selectOption = (idx) => {
    if (showAns) return; // lock after reveal
    setMarked({ ...marked, [cur]: idx });
  };

  const lockAndReveal = () => {
    if (showAns) return next();
    setShowAns(true);
    if (!mute) beep(700, 120);
  };

  const next = () => {
    if (qIndex + 1 < total) {
      setQIndex(qIndex + 1);
      setShowAns(false);
      setTick(perQSeconds);
    } else {
      setReviewMode(true);
    }
  };

  const prev = () => {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
      setShowAns(false);
      setTick(perQSeconds);
    }
  };

  const resetAll = () => {
    setStarted(false);
    setChapter("");
    setOrder([]);
    setMarked({});
    setReviewMode(false);
  };

  const score = useMemo(() => Object.entries(marked).reduce((s, [qi, sel]) => s + (questions[qi]?.a === sel ? 1 : 0), 0), [marked, questions]);

  // Progress
  const progress = total ? Math.round(((qIndex) / total) * 100) : 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Sharvika | Quiz Me — Class 10 Science</h1>
            <Badge variant="outline" className="rounded-full">Pro</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Volume2 className={`w-4 h-4 ${mute ? 'hidden' : ''}`} />
              <VolumeX className={`w-4 h-4 ${mute ? '' : 'hidden'}`} />
              <Switch checked={!mute} onCheckedChange={() => setMute(!mute)} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <SunMedium className="w-4 h-4" />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6 grid sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="text-sm font-semibold">Select Chapter</label>
              <Select value={chapter} onValueChange={setChapter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a chapter" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {CHAPTERS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold">Time per Question (sec)</label>
                <Input type="number" min={10} max={180} value={perQSeconds}
                  onChange={(e) => setPerQSeconds(Math.max(10, Math.min(180, Number(e.target.value)||PER_QUESTION_SECONDS_DEFAULT)))} />
              </div>
              <div className="flex items-end">
                <Button className="w-full" disabled={!chapter} onClick={startQuiz}>Start Quiz</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Area */}
        {started && !reviewMode && (
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl font-bold">{chapter}</CardTitle>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <Clock3 className="w-4 h-4" /> {tick}s left
                </div>
              </div>
              <div className="mt-3">
                <Progress value={progress} />
                <div className="text-xs text-slate-500 mt-1">Question {qIndex + 1} / {total}</div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div key={cur} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  <div className="text-base sm:text-lg font-semibold leading-relaxed mb-4">
                    {qIndex + 1}. {q.q}
                  </div>

                  <div className="grid gap-3">
                    {q.opts.map((opt, i) => {
                      const picked = marked[cur];
                      const isCorrect = i === q.a;
                      const isChosen = picked === i;
                      const reveal = showAns || tick === 0;
                      let classes = "rounded-2xl border p-3 sm:p-4 cursor-pointer";
                      if (reveal && isCorrect) classes += " border-green-500 bg-green-50 dark:bg-green-950/30";
                      else if (reveal && isChosen && !isCorrect) classes += " border-rose-500 bg-rose-50 dark:bg-rose-950/30";
                      else if (isChosen) classes += " border-blue-500 bg-blue-50 dark:bg-blue-950/30";
                      else classes += " hover:bg-slate-50 dark:hover:bg-slate-900";
                      return (
                        <button
                          key={i}
                          onClick={() => selectOption(i)}
                          className={classes}
                          disabled={reveal}
                        >
                          <div className="flex items-start gap-3 text-left">
                            <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${isChosen ? 'border-blue-600' : 'border-slate-300'}`}>{String.fromCharCode(65 + i)}</div>
                            <div className="flex-1">{opt}</div>
                            {reveal && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {q.hint && (
                    <div className="mt-3 text-sm text-slate-500">
                      <CircleHelp className="inline w-4 h-4 mr-1" /> Hint: {q.hint}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="secondary" onClick={prev} disabled={qIndex === 0}>Prev</Button>
                    <Button onClick={lockAndReveal}>{showAns || tick === 0 ? "Next" : "Lock & Reveal"}</Button>
                    <Button variant="outline" onClick={resetAll} className="ml-auto"><RotateCcw className="w-4 h-4 mr-2"/>Restart</Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        )}

        {/* Review / Results */}
        {reviewMode && (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Stat label="Total Questions" value={total} />
                    <Stat label="Correct" value={score} />
                    <Stat label="Percent" value={`${Math.round((score/total)*100)}%`} />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => { setStarted(false); setReviewMode(false); }}>Choose Another Chapter</Button>
                    <Button variant="secondary" onClick={startQuiz}>Retry Same Chapter</Button>
                    <Button variant="outline" onClick={resetAll}><RotateCcw className="w-4 h-4 mr-2"/>Reset</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Review Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {order.map((qid, idx) => {
                      const item = questions[qid];
                      const sel = marked[qid];
                      const correct = item.a;
                      return (
                        <div key={qid} className="rounded-2xl border p-3 sm:p-4">
                          <div className="font-semibold mb-2">{idx + 1}. {item.q}</div>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm">
                            <div className="p-2 rounded-lg border bg-slate-50 dark:bg-slate-900">Your answer: {sel != null ? `${String.fromCharCode(65+sel)}. ${item.opts[sel]}` : "—"}</div>
                            <div className="p-2 rounded-lg border bg-green-50 dark:bg-green-900/20">Correct: {String.fromCharCode(65+correct)}. {item.opts[correct]}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Made for Class 10 | Chapters fully included now: 6. More can be added easily in the BANK object.</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border p-4 text-center bg-white/70 dark:bg-slate-900/40">
      <div className="text-sm text-slate-500 mb-1">{label}</div>
      <div className="text-2xl font-extrabold">{value}</div>
    </div>
  );
}
