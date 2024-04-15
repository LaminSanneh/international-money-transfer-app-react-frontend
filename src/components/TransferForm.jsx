import { useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button, Checkbox, Select, MenuItem, Grid } from "@material-ui/core";
import { addTransaction } from "../reducers/transactionSlice";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect } from "react";
import axios from "axios";
import { authHeader } from "../reducers/authSlice";
import { API_URL } from "../constants";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

const TransferForm = () => {

  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const [newRecipientCheckActive, setNewRecipientCheckActive] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [transferType, setTransferType] = useState("local");
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    fetchSavedRecipients();
  }, []);

  const fetchSavedRecipients = async () => {
    const response = await axios.get(`${API_URL}/api/beneficiaries`, {
      headers: authHeader(),
    });
    setBeneficiaries(response.data);
  };

  const handleChangeTransferType = (e) => {
    setTransferType(e.target.value);
  };

  const handleNewRecipientChange = (e) => {
    setNewRecipient(e.target.value);
  };

  const handleNewRecipientCheckActiveChange = (e) => {
    setNewRecipientCheckActive(e.target.checked);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencySelectChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = () => {
    const senderId = 1;

    let recipientName = "";
    if (newRecipientCheckActive) {
      recipientName = newRecipient;
    } else {
      recipientName = recipient;
    }

    if (
      recipientName.trim() === "" ||
      amount.trim() === "" ||
      currency.trim() === ""
    ) {
      // TODO: Display error message for incomplete form
      return;
    }

    const recipientObject = {
      // name: "Transaction Receiver" + (new Date()).toDateString()
      name: recipientName,
    };


    // TODO: Additional validation logic as needed
    dispatch(
      addTransaction({ recipient: recipientObject, amount, currency, senderId })
    ).then((results) => {
    });
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={transferType}
        exclusive
        onChange={handleChangeTransferType}
        aria-label="Platform"
      >
        <ToggleButton value="local">Local Transfer</ToggleButton>
        <ToggleButton value="international">International Transfer</ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="h4">
        New Transfer - Select a saved recipient or enter a new one manually
      </Typography>
      <form>
        <Autocomplete
          disabled={newRecipientCheckActive}
          options={beneficiaries}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Saved Recipients"
              variant="outlined"
              value={recipient}
              // Change when filtering drpdown
              // onChange={(event) => {
              //   console.log(event.target.value);
              //   setRecipient(event.target.value)
              // }
              // }
            />
          )}
          onChange={(event, value) => {
            if (value) {
              console.log("Selected Beneficiary:", value);
              setRecipient(value.name);
            }
          }}
        />
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <div>
            New Recipient
              <Checkbox
                label="New Recipient"
                checked={newRecipientCheckActive}
                onChange={handleNewRecipientCheckActiveChange}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!newRecipientCheckActive}
              label="New Recipient"
              value={newRecipient}
              onChange={handleNewRecipientChange}
            />
        </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              value={currency}
              label="Currency"
              onChange={handleCurrencySelectChange}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Transfer
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default TransferForm;
