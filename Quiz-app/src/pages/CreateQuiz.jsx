import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function CreateQuiz(){
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, categoryName: category, numQuestions: Number(numQuestions) };
      await api.post('/quizservice/quiz/create', payload);
      setMsg('Quiz created successfully');
      // optionally navigate to quizzes
      nav('/quizzes');
    } catch (err) {
      setMsg('Error creating quiz');
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h3>Create Quiz</h3>
        <form onSubmit={submit} className="form">
          <input required placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input required placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
          <input required type="number" min="1" placeholder="Number of Questions" value={numQuestions} onChange={e=>setNumQuestions(e.target.value)} />
          <button className="btn" type="submit">Create</button>
        </form>
        {msg && <p className="muted">{msg}</p>}
      </div>
    </div>
  );
}
