import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await signup(username, password, role);
      nav('/');
    } catch (error) {
      setErr('Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <h2>Sign Up</h2>
        {err && <div className="error">{err}</div>}
        <input required placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button className="btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
