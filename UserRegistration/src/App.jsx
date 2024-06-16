import React from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';

const App = () => {
  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-center my-10">User ID System</h1>
      <div className="flex justify-around">
        <Signup />
        <Login />
      </div>
    </div>
  );
};

export default App;
