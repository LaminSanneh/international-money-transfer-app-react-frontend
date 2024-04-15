import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@material-ui/core';
import { loginUser } from '../reducers/authSlice';

const LoginForm = () => {
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
    dispatch(loginUser({ username: email, password })).then((results) =>
    {
    });
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
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
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
