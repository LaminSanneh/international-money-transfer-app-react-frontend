// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './components/Home';
import TransferForm from './components/TransferForm';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/transfer" element={<TransferForm/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
