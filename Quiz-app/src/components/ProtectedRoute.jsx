import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="page"><p>Loading...</p></div>;

  if (!user) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <div className="page"><h2>Unauthorized</h2><p>You don't have permission to access this page.</p></div>;
  }

  return <Outlet />;
}
