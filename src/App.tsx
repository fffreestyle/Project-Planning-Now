import React from 'react';
import { Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import UserPage from '../src/pages/User'
import './App.css';

function App() {
  const user = {
    name: 'GoHmoe'
  }
  return (
    <UserPage user={user} />
  );
}

export default App;
