import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEditQuestion(){
  const { id } = useParams();
  const nav = useNavigate();
  const [q, setQ] = useState({
    question: '', option1: '', option2: '', option3: '', option4: '',
    rightOption: '', difficultylevel: '', category: ''
  });

  useEffect(()=>{
    if (id) {
      api.get('/questionservice/questions/getAll').then(res=>{
        const found = res.data.find(x=>x.id === Number(id));
        if (found) setQ(found);
      }).catch(()=>{});
    }
  },[id]);

  const change = (e)=> setQ({...q,[e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/questionservice/questions/update/${id}`, q);
      } else {
        await api.post('/questionservice/questions/add', q);
      }
      nav('/questions');
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>{id ? 'Edit' : 'Add'} Question</h2>
        <form className="form" onSubmit={submit}>
          <input name="question" placeholder="Question" value={q.question} onChange={change} required />
          <input name="option1" placeholder="Option 1" value={q.option1} onChange={change} required />
          <input name="option2" placeholder="Option 2" value={q.option2} onChange={change} required />
          <input name="option3" placeholder="Option 3" value={q.option3} onChange={change} required />
          <input name="option4" placeholder="Option 4" value={q.option4} onChange={change} required />
          <input name="rightOption" placeholder="Right Option (exact text)" value={q.rightOption} onChange={change} required />
          <input name="category" placeholder="Category" value={q.category} onChange={change} required />
          <input name="difficultylevel" placeholder="Difficulty" value={q.difficultylevel} onChange={change} required />
          <div className="form-actions">
            <button className="btn" type="submit">Save</button>
            <button type="button" className="btn btn-ghost" onClick={()=>nav('/questions')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
