import React from 'react';
import { Typography, Button } from '@material-ui/core';

const Home = () => {
  return (
    <div>
      <Typography variant="h4">Welcome to Money Transfer Service</Typography>
      <Button variant="contained" color="primary">Make Transfer</Button>
    </div>
  );
}

export default Home;
