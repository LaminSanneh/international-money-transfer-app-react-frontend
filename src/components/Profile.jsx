import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';

const Profile = () => {
  return (
    <div>
      <Typography variant="h4">User Profile</Typography>
      <TextField label="Full Name" />
      <TextField label="Email" />
      {/* Additional fields for address, payment preferences, etc. */}
      <Button variant="contained" color="primary">Update Profile</Button>
    </div>
  );
}

export default Profile;
