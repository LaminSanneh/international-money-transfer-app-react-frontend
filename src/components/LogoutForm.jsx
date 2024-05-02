import { Button, Typography } from "@material-ui/core";
import React from "react";
import { logoutUser } from "../reducers/authSlice";
import { useDispatch } from "react-redux";

export const LogoutForm = () => {
  const dispatch = useDispatch();

  const handleAcceptLogout = () => {
    dispatch(logoutUser());
  };

  const handleCancelLogout = () => {
    alert("cancelled");
  };

  return (
    <div>
      <Typography variant="h4">Are you sure you want to logout</Typography>
      <Button variant="contained" color="primary" onClick={handleAcceptLogout}>
        Yes
      </Button>{" "}
      &nbsp;
      <Button variant="contained" color="primary" onClick={handleCancelLogout}>
        No
      </Button>
    </div>
  );
};
