import React from 'react';
import { Link } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  return (
    <div className="card quiz-card">
      <h4>{quiz.title}</h4>
      <p>Questions: {quiz.questionIds?.length ?? 'N/A'}</p>
      <Link to={`/quiz/${quiz.id}`} className="btn">Take Quiz</Link>
    </div>
  );
}
