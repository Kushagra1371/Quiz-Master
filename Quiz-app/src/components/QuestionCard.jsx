export default function QuestionCard({ question, answers, setAnswers }) {
    const handleChange = (e) => {
      setAnswers(prev => ({ ...prev, [question.id]: e.target.value }));
    };
  
    return (
      <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
        <p>{question.question}</p>
        {[question.option1, question.option2, question.option3, question.option4].map((opt, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name={`q${question.id}`}
              value={opt}
              checked={answers[question.id] === opt}
              onChange={handleChange}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  }
  