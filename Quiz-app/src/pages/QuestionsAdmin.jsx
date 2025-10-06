import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

export default function QuestionsAdmin(){
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await api.get('/questionservice/questions/getAll');
      setQuestions(res.data || []);
    } catch (err) {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> { fetchAll(); }, []);

  const del = async (id) => {
    if (!confirm('Delete question?')) return;
    try {
      await api.delete(`/questionservice/questions/delete/${id}`);
      fetchAll();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <div className="card">
        <h2>Manage Questions</h2>
        <Link className="btn" to="/questions/new">Add New Question</Link>
        <div className="table-wrap">
          <table className="questions-table">
            <thead>
              <tr><th>ID</th><th>Question</th><th>Category</th><th>Difficulty</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {questions.map(q=>(
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.question}</td>
                  <td>{q.category}</td>
                  <td>{q.difficultylevel}</td>
                  <td>
                    <Link className="btn btn-sm" to={`/questions/edit/${q.id}`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={()=>del(q.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
