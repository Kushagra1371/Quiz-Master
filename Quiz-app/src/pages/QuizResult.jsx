import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function QuizResult(){
  const { state } = useLocation();
  const { score = 0, total = 0 } = state || {};
  const { id } = useParams();

  return (
    <div className="page">
      <div className="card">
        <h2>Result</h2>
        <p>Quiz ID: {id}</p>
        <p className="big">{score} / {total}</p>
        <a className="btn btn-ghost" href="/quizzes">Back to quizzes</a>
      </div>
    </div>
  );
}
