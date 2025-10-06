import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role }
  const [loading, setLoading] = useState(true);

  // fetch profile on mount (cookie must be sent)
  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      // backend returns optional or user object; ensure shape
      const data = res.data;
      // if repository returns Optional wrapped, handle it:
      // if it's an array or object, try to normalize
      let u = data;
      if (Array.isArray(data)) u = data[0];
      if (data?.user) u = data.user;
      setUser(u);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (username, password) => {
    // server sets HttpOnly cookie; we then fetch profile
    await api.post('/auth/login', { username, password });
    await fetchProfile();
  };

  const signup = async (username, password, role = 'USER') => {
    await api.post('/auth/signup', { username, password, role });
    // optionally auto-login after signup
    await login(username, password);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refresh: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
