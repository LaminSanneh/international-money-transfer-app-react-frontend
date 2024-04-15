import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@material-ui/core';
import { registerUser } from '../reducers/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(registerUser({ username: email, password })).then((results) => {
    });
    // Additional logic for handling form submission
  };

  return (
    <div>
      <Typography variant="h4">Register</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Register
      </Button>
    </div>
  );
};

export default RegisterForm;
