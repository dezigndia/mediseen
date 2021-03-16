import React, { useState } from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Input,
} from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";
import { Label } from "reactstrap";
import { fetchCall } from "services/services";
import { isLoggedIn } from "services/services";
import { useHistory } from "react-router";
const styles = makeStyles((theme) => ({
  container: {
    width: "50%",
    backgroundColor: "white",
  },
}));

function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const classes = styles();
  const history = useHistory();
  async function onsubmit() {
    let body = {
      email,
      password,
    };
    let response = await fetchCall("admin_login", body);

    if (response && response.success) {
      if (response.data && response.data.payload)
        localStorage.setItem(
          "userData",
          JSON.stringify({ token: response.data.payload.token })
        );
      history.push("/");
    } else {
      localStorage.clear();
      console.log("login again!");
    }
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        padding: "10% 20%",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <Label style={{ fontSize: "2rem" }}>Sign In(admin only)</Label>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <Input
              id="username"
              label="Username"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              fullWidth
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <Input
              id="username"
              label="Password"
              name="password"
              value={password}
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end" style={{ marginTop: "10px" }}>
          <Button
            color="primary"
            onClick={() => {
              onsubmit();
            }}
          >
            Login
          </Button>
        </Grid>
      </div>
    </div>
  );
}

export default Signin;
