import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCurriculum from './modules/AddCurriculam';
import AssignCurriculum from './modules/AssignCurriculum';
import Certifications from './modules/Certifications';
import Management from './modules/Management';
import QuizResultPage from './modules/QuizResultPage';
import TakeQuizPage from './modules/TakeQuizPage';
import Trainings from './modules/Training';
import Home from './modules/home/Home';
import LoginPage from './modules/loginPage';
import PrivateRoute from './routes/privateRoutes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={localStorage.getItem('token') ?
          <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={<PrivateRoute Element={Home} />} />
        <Route path="/quiz/:id" element={<PrivateRoute Element={TakeQuizPage} />} />
        <Route path="/quiz-result" element={<PrivateRoute Element={QuizResultPage} />} />
        <Route path="/assign-curriculum" element={<PrivateRoute Element={AssignCurriculum} />} />
        <Route path="/add-curriculum" element={<PrivateRoute Element={AddCurriculum} />} />
        <Route path="/management" element={<PrivateRoute Element={Management} />} />
        <Route path="/trainings" element={<PrivateRoute Element={Trainings} />} />
        <Route path="/certifications" element={<PrivateRoute Element={Certifications} />} />

      </Routes>

    </div>
  );
}

export default App;
