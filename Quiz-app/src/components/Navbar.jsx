import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  

  return (
    <header className="nav">
      <div className="nav-left">
        <Link className="brand" to="/">QuizMaster</Link>
        <Link to="/quizzes" className="nav-link">Quizzes</Link>
        <Link to="/create-quiz" className="nav-link">Create Quiz</Link>
        <Link to="/questions" className="nav-link">Questions</Link>
      </div>
      <div className="nav-right">
       
      </div>
    </header>
  );
}
