import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';

const TransferForm = () => {
  return (
    <div>
      <Typography variant="h4">New Transfer</Typography>
      <TextField label="Recipient Name" />
      <TextField label="Amount" type="number" />
      {/* Additional fields for currency, transfer notes, etc. */}
      <Button variant="contained" color="primary">Submit Transfer</Button>
    </div>
  );
}

export default TransferForm;
