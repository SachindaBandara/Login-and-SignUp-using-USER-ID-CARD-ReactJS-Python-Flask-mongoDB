import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [idCard, setIdCard] = useState(null);
  const [signupData, setSignupData] = useState(null);

  const handleFileChange = (e) => {
    setIdCard(e.target.files[0]);
  };

  const handleSignup = async () => {
    if (idCard) {
      const formData = new FormData();
      formData.append('file', idCard);
      
      try {
        const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const { name, idNumber } = response.data;
        const userData = { name, idNumber };
        localStorage.setItem('userData', JSON.stringify(userData));
        setSignupData(userData);
        alert('Signup successful!');
      } catch (error) {
        console.error(error);
        alert('Error during signup.');
      }
    } else {
      alert('Please upload an ID card.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <div className="mb-4">
        <label className="block mb-2">ID Card Photo:</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={handleSignup} className="w-full bg-blue-500 text-white p-2 rounded">
        Signup
      </button>
      {signupData && (
        <div className="mt-4">
          <h3 className="text-xl">Extracted Information:</h3>
          <p>Name: {signupData.name}</p>
          <p>ID Number: {signupData.idNumber}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
