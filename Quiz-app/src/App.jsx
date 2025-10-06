import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/DashBoard';
import QuizList from './pages/QuizList';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import QuizResult from './pages/QuizResult';
import QuestionsAdmin from './pages/QuestionsAdmin';
import AddEditQuestion from './pages/AddEditQuestion';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
       

        {/* protected for USER & ADMIN */}
        <Route>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quiz/:id" element={<TakeQuiz />} />
          <Route path="/quiz/:id/result" element={<QuizResult />} />
        </Route>

        {/* admin-only pages */}
        <Route>
          <Route path="/questions" element={<QuestionsAdmin />} />
          <Route path="/questions/new" element={<AddEditQuestion />} />
          <Route path="/questions/edit/:id" element={<AddEditQuestion />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
