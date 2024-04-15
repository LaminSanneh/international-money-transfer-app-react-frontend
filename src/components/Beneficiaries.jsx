import { useState } from "react";
import { Typography, TextField, Button, List, ListItem, IconButton } from "@material-ui/core";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { Delete } from "@material-ui/icons";
import { authHeader } from "../reducers/authSlice";

const Beneficiaries = () => {
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);

  const handleNameChange = (e) => {
    setBeneficiaryName(e.target.value);
  };

  const handleAccountChange = (e) => {
    setBeneficiaryAccount(e.target.value);
  };

  const handleAddBeneficiary = async () => {
    try {
      const beneficiaryData = {
        name: beneficiaryName,
        saverId: 1
      };

      // TODO: Move this api call and use redux toolkit slice here to make call
      const response = await axios.post(`${API_URL}/api/beneficiaries`, beneficiaryData);
      setBeneficiaries([...beneficiaries, response.data])
    } catch (error) {
      console.log("Error creating beneficiary");
    }
  };

  const handleDeleteBeneficiary = async (id) => {
    if (confirm("Are you sure you want to delete this beneficiary?") === false) {
      return;
    }

    axios.delete(`${API_URL}/api/beneficiaries/${id}`).then(() => {
      const remainingItems = beneficiaries.filter((val) => {
        return val.id !== id;
      })
      setBeneficiaries([...remainingItems]);
    }).catch((error) => {
    });
  }

  useEffect(() => {
    // Fetch beneficiaries when component mounts
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/beneficiaries`, { headers: authHeader() });
      setBeneficiaries(response.data);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Manage Beneficiaries</Typography>
      <TextField
        label="Beneficiary Name"
        value={beneficiaryName}
        onChange={handleNameChange}
      />
      <TextField
        label="Beneficiary Account"
        value={beneficiaryAccount}
        onChange={handleAccountChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddBeneficiary}
      >
        Add Beneficiary
      </Button>
      <div>
        <Typography variant="h4" gutterBottom>
          Saved Beneficiaries
        </Typography>
        {beneficiaries.length === 0 ? (
          <Typography variant="body1">
            You have no saved beneficiaries.
          </Typography>
        ) : (
          <List>
            {beneficiaries.map((beneficiary) => (
              <ListItem key={beneficiary.id}>
                {beneficiary.name} &nbsp;
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => { handleDeleteBeneficiary(beneficiary.id) }}
                >
                  Delete
                </Button>
                <IconButton onClick={() => { handleDeleteBeneficiary(beneficiary.id) }} aria-label="delete" size="medium">
                  <Delete fontSize="inherit" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default Beneficiaries;
