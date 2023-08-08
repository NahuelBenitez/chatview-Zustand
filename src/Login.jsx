import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from './store';

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogin = () => {
    useStore.setState({ username: inputValue });
    console.log(inputValue);
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
  <h1 className="text-6xl font-semibold text-blue-800 mb-4 p-1 shadow-xl shadow-blue-900">Bienvenidos a ChatGPT</h1>
  <div className="flex flex-col items-center space-y-2">
    <div className='mt-6'>
    <label className="text-white font-semibold bg-blue-600 p-2.5 rounded-lg">USUARIO:</label>
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Ingrese un usuario"
      className="px-4 py-2 rounded-lg border border-blue-400 shadow-sm focus:outline-none focus:border-blue-600 bg-blue-100"
    />
    </div>
    
  </div>
  <button
    onClick={handleLogin}
    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:bg-blue-700"
  >
    INGRESAR
  </button>
</div>

  );
};

export default Login;
