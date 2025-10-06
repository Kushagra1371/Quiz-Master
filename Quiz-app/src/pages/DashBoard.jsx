import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import QuizCard from '../shared/QuizCard';

export default function DashBoard(){
  const [quizzes, setQuizzes] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(0);

  useEffect(()=>{
    // We don't have endpoint to list quizzes in your code, but quizzes are saved in DB.
    // QuizService doesn't expose a getAll in original code; if not present, you can call your own endpoint later.
    // For now we fetch questions as available and build simple stats.
    api.get('/questionservice/questions/getAll').then(r=>{
      setQuestionsCount(r.data.length || 0);
    }).catch(()=>{ setQuestionsCount(0); });

    // If you add QuizService endpoint to list quizzes, call it here:
    // api.get('/quiz/all').then(r => setQuizzes(r.data));
  },[]);

  return (
    <div className="page">
      <div className="dashboard-grid">
        <div className="card stat">
          <h3>Total Questions</h3>
          <p className="stat-value">{questionsCount}</p>
        </div>

        <div className="card stat">
          <h3>Quizzes (open)</h3>
          <p className="stat-value">{quizzes.length}</p>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div className="actions">
          <a className="btn" href="/quizzes">Take a Quiz</a>
          <a className="btn btn-ghost" href="/questions">Manage Questions</a>
        </div>
      </div>
    </div>
  );
}
