import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const res = await api.get('/questionservice/questions/getAll');
    setQuestions(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/questionservice/questions/delete/${id}`);
    fetchQuestions();
  };

  useEffect(() => { fetchQuestions(); }, []);

  return (
    <div>
      <h2>Questions</h2>
      <Link to="/questionservice/questions/add">Add Question</Link>
      <ul>
        {questions.map(q => (
          <li key={q.id}>
            {q.question} ({q.category})
            <Link to={`/questionservice/questions/edit/${q.id}`}>Edit</Link>
            <button onClick={() => handleDelete(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
