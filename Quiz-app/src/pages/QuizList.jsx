import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import QuizCard from '../shared/QuizCard';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/quizservice/quiz/all')
      .then(res => setQuizzes(res.data || []))
      .catch(err => {
        console.error("Error fetching quizzes:", err);
        setQuizzes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p>Loading quizzes...</p></div>;

  return (
    <div className="page">
      <h2>Available Quizzes</h2>
      <div className="grid">
        {quizzes.length === 0 ? (
          <div className="card">No quizzes available</div>
        ) : (
          quizzes.map(q => <QuizCard key={q.id} quiz={q} />)
        )}
      </div>
    </div>
  );
}
