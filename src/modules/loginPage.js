import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../components/textfield';
import AuthService from '../services/authServices';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Make a POST request to your login API endpoint
      const data = await AuthService.login( username, password );
      navigate('/home');
    } catch (err) {
      // Handle login error
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally { 
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            disabled={isLoading}
            className="mb-4"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={isLoading}
            className="mb-4"
          />
          <button 
            type="submit" 
            className={`w-full bg-blue-500 text-white p-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;