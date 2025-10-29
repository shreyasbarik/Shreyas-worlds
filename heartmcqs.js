const classes = [5,6,7,8,9,10];
const subjects = ["Science", "Mathematics", "Social Science", "English"];
const topicsBySubject = {
  "Science": ["Electricity", "Life Processes", "Acids & Bases"],
  "Mathematics": ["Trigonometry", "Probability"],
  "Social Science": ["Nationalism", "Resources"],
  "English": ["Poetry", "Prose"]
};

const mcqData = {
  "Science": {
    "10": {
      "Electricity": [
        {
          "question": "What does Ohm's Law state?",
          "options": ["V = IR", "V = I/R", "V = R/I", "I = VR"],
          "answer": "V = IR"
        },
        // ... Add more questions here as previously shown ...
      ]
    }
  }
};

function MCQApp() {
  const [selClass, setClass] = React.useState(10);
  const [selSubject, setSubject] = React.useState("Science");
  const [selTopic, setTopic] = React.useState("Electricity");
  const [qIdx, setQIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [answered, setAnswered] = React.useState([]);
  const mcqs = mcqData[selSubject]?.[selClass]?.[selTopic] || [];
  function selectOption(opt) {
    if (answered[qIdx]) return;
    const correct = mcqs[qIdx]?.answer === opt;
    setAnswered(a => {
      const na = [...a];
      na[qIdx] = correct ? "correct" : "wrong";
      return na;
    });
    setScore(s => correct ? s+1 : s);
  }
  function nextQ() {
    if (qIdx < mcqs.length-1) setQIdx(qIdx+1);
  }
  return (
    <div className="mcq-main">
      <div className="mcq-header">Sharvika Premium MCQs</div>
      <div className="selector-bar">
        <select value={selClass} onChange={e=>setClass(Number(e.target.value))}>
          {classes.map(c=><option key={c} value={c}>Class {c}</option>)}
        </select>
        <select value={selSubject} onChange={e=>{
          setSubject(e.target.value);
          setTopic(topicsBySubject[e.target.value][0]);
          setQIdx(0);
          setAnswered([]);
        }}>
          {subjects.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
        <select value={selTopic} onChange={e=>{
          setTopic(e.target.value);
          setQIdx(0);
          setAnswered([]);
        }}>
          {(topicsBySubject[selSubject]||[]).map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-inner"
          style={{width: `${((qIdx+1)/mcqs.length)*100}%`}}></div>
      </div>
      <div className="mcq-score">Score: {score} / {mcqs.length}</div>
      <div className="mcq-block">
        <div className="mcq-question">{mcqs[qIdx]?.question}</div>
        <div className="mcq-options">
          {mcqs[qIdx]?.options.map(opt=>(
            <div key={opt}
              className={"mcq-option" + (answered[qIdx] && mcqs[qIdx]?.answer === opt ? " selected" : "")}
              onClick={()=>selectOption(opt)}>
              {opt}
            </div>
          ))}
        </div>
        {answered[qIdx] &&
          <div className="mcq-feedback">
            {answered[qIdx] === "correct" ? "✅ Correct!" : `❌ Wrong. Correct: ${mcqs[qIdx]?.answer}`}
          </div>
        }
        <button className="mcq-next" onClick={nextQ} disabled={qIdx >= mcqs.length-1}>
          Next
        </button>
      </div>
      <div className="badge-strip">
        {score >= mcqs.length*0.75 ? <span className="badge">Gold</span> : score >= mcqs.length*0.5 ? <span className="badge">Silver</span> : null}
      </div>
    </div>
  );
}
ReactDOM.render(<MCQApp />, document.getElementById("heartmcqs-root"));
