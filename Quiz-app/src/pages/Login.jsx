import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(username, password);
      nav('/');
    } catch (error) {
      setErr('Invalid credentials');
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <h2>Login</h2>
        {err && <div className="error">{err}</div>}
        <input required placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
