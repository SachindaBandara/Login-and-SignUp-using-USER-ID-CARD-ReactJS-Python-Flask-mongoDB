import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name === name && userData.idNumber === idNumber) {
      alert('Login successful!');
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">ID Number:</label>
        <input
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;
