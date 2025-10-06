import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function TakeQuiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;

    api.get(`/quizservice/quiz/quizQ/${id}`)
      .then(res => setQuestions(res.data || []))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, [id]);

  const pick = (qId, opt) => {
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const submit = async () => {
    // Backend expects list of {id, response}
    const payload = questions.map(q => ({
      id: q.id,
      response: answers[q.id]
    })).filter(r => r.response);
    

    if (!payload.length) {
      alert("Please answer at least one question");
      return;
    }

    try {
      const res = await api.post(`/quizservice/quiz/submit`, payload);
      const score = res.data;
      nav(`/quiz/${id}/result`, { state: { score, total: questions.length } });
    } catch (err) {
      console.error("Submission error:", err.response || err);
      alert("Submission error. Check console for details.");
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <h2>Quiz</h2>
      {questions.map(q => (
        <div className="card question" key={q.id}>
          <p className="q-title">{q.question}</p>
          <div className="options">
            {[q.option1, q.option2, q.option3, q.option4].map((opt, idx) => (
              <label key={idx} className={`option ${answers[q.id] === opt ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  onChange={() => pick(q.id, opt)}
                  checked={answers[q.id] === opt}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="btn" onClick={submit}>Submit Quiz</button>
    </div>
  );
}
