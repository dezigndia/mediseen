import React, { useEffect, useState } from "react";
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
  Tabs,
  Tab,
  Box,
  Typography,
} from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";
import { Label } from "reactstrap";
import { fetchCall } from "services/services";
import { isLoggedIn } from "services/services";
import { useHistory } from "react-router";
import { notify } from "services/services";
import { alert } from "variables/constants";
import AlertMessages from "components/CommonComponents/AlertMessages";
import { alertMessages } from "variables/constants";
import { createSemanticDiagnosticsBuilderProgram } from "typescript";
import SetPasswordModal from "components/SetPasswordModal";
const styles = makeStyles((theme) => ({
  container: {
    width: "50%",
    backgroundColor: "white",
  },
  input: {
    padding: "0 10px",
    borderRadius: "10px",
  },
  tabs: {
    backgroundColor: "white",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };
function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [otp, setotp] = useState("");
  const [notify, setnotify] = useState({
    message: "",
    type: null,
  });
  const [value, setValue] = React.useState(0);
  const [showPasswordModal, setshowPasswordModal] = useState(false);
  const [token, settoken] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = styles();
  const history = useHistory();
  async function onsubmit(type = "admin_login") {
    let body = {
      email: type === "admin_login" ? email : undefined,
      password: type === "admin_login" ? password : undefined,
      phoneNumber: type === "login_by_otp" ? phoneNumber : undefined,
      otp: type === "login_by_otp" ? otp - "0" : undefined,
    };
    let response = await fetchCall(type, body);
    if (response && response.success) {
      if (response.data && response.data.payload)
        settoken(response.data.payload.token);
      if (value === 0) {
        signInSuccess(response.data.payload.token);
      } else {
        setemail(response.data.payload.email);
        setshowPasswordModal(true);
      }
    } else if (response && !response.success) {
      setnotify({
        message: response.data.message,
        type: alert.error,
      });
    } else {
      setnotify({
        message: alertMessages.unexpectedError,
      });
    }
  }

  function signInSuccess(token) {
    console.log("here");
    localStorage.setItem("userData", JSON.stringify({ token: token }));
    history.push("/admin/dashboard");
  }

  async function sendOtp() {
    if (phoneNumber) {
      let body = {
        phoneNumber,
      };

      let data = await fetchCall("send_otp", body);
      console.log(data);
    }
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
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
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab
          label="Sign in(with password)"
          style={{
            backgroundColor: "white",
            borderRadius: "10px 10px 0px 0px",
          }}
          {...a11yProps(0)}
        />
        <Tab
          label="Sign in(logging in for the first time)"
          {...a11yProps(1)}
          style={{
            backgroundColor: "white",
            borderRadius: "10px 10px 0px 0px",
          }}
        />
      </Tabs>

      <div
        style={{
          width: "100%",
          alignItems: "center",
          padding: "10% 10%",
          backgroundColor: "white",
          borderRadius: "0px 10px 10px 10px",
        }}
      >
        <TabPanel value={value} index={0}>
          {/* <Label style={{ fontSize: "2rem" }}>Sign In(admin only)</Label> */}
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face htmlColor="black" />
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
                classes={{
                  root: classes.input,
                }}
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint htmlColor="black" />
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
                classes={{
                  root: classes.input,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <Label style={{ fontSize: "2rem" }}>Sign In(admin only)</Label> */}
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <Input
                id="phone number"
                label="Phone Number"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                placeholder="Phone Number"
                onChange={(e) => {
                  setphoneNumber(e.target.value);
                }}
                classes={{
                  root: classes.input,
                }}
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <Input
                id="otp"
                label="OTP"
                type="text"
                name="otp"
                value={otp}
                placeholder="OTP"
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                classes={{
                  root: classes.input,
                }}
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
        </TabPanel>

        <Grid container justify="flex-end" style={{ marginTop: "10px" }}>
          <Button
            color="primary"
            onClick={() => {
              onsubmit(
                value === 0
                  ? "admin_login"
                  : value === 1
                  ? "login_by_otp"
                  : undefined
              );
            }}
          >
            Login
          </Button>
          {value === 1 && (
            <Button
              color="primary"
              onClick={() => {
                sendOtp();
              }}
            >
              Send OTP
            </Button>
          )}
        </Grid>
      </div>
      <AlertMessages state={notify} />
      {showPasswordModal && (
        <SetPasswordModal
          email={email}
          setShow={(value) => {
            setshowPasswordModal(value);
            signInSuccess(token);
          }}
        />
      )}
    </div>
  );
}

export default Signin;
