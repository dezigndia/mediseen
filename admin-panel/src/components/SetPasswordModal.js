import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { fetchCall } from "services/services";
import { Button } from "@material-ui/core";

export default function SetPasswordModal({ setShow = null, email }) {
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  async function handleSubmit() {
    console.log("calling set password", {
      password,
      confirmPassword,
      email,
    });

    if (password === confirmPassword) {
      let body = {
        password,
        confirmPassword,
        email,
      };
      let data = await fetchCall("set_password", body);

      console.log(data);
      if (data && data.success) {
        handleClose();
      } else {
        window.alert("something went wrong");
      }
    }
  }
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Set Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          After setting the password you willl only be able to access the
          account by logging in with the password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Confirm Password"
          type="password"
          onChange={(e) => {
            setconfirmPassword(e.target.value);
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
