import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmpHomePage from './modules/empHomePage';
import LoginPage from './modules/loginPage';
import PrivateRoute from './routes/privateRoutes';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<PrivateRoute Element={EmpHomePage}/>}/>

      </Routes>  
   
    </div>
  );
}

export default App;
