/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import {
  CollectionsOutlined,
  ExpandLess,
  ExpandMore,
  MoreVert,
} from "@material-ui/icons";
import AlertMessages from "components/CommonComponents/AlertMessages";
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { fetchCall } from "services/services";
import { alert } from "variables/constants";
import AccountsContent from "./accounts/AccountsContent";

function Accounts() {
  const [openForm, setopenForm] = useState(false);
  const [state, setstate] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    departments: [],
  });

  const [notify, setnotify] = useState({
    message: "",
    type: null,
    change: false,
  });

  const [errors, seterrors] = useState({
    name: null,
    phoneNumber: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  function onChange(e) {
    resetErrors();
    if (e.target.name === "departments") {
      if (state["departments"].indexOf(e.target.value) >= 0) {
        let req = state["departments"].filter(
          (each) => each !== e.target.value
        );
        setstate((state) => ({
          ...state,
          departments: req,
        }));
      } else {
        setstate((state) => ({
          ...state,
          departments: [...state["departments"], e.target.value],
        }));
      }
    } else
      setstate((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
  }

  async function onSave() {
    if (validForm()) {
      let body = {
        name: state.name.trim(),
        // password: state.password.trim(),
        email: state.email.trim(),
        phoneNumber: state.phoneNumber,
        departments: state.departments,
      };

      body.departments.sort();

      const data = await fetchCall("add_admin", body);
      // console.log(data);
      if (data && data.success) {
        setnotify((state) => ({
          ...state,
          message: "Success saving account!",
          type: alert.success,
          change: !state.change,
        }));
        resetForm();
      } else {
        setnotify((state) => ({
          ...state,
          message: data.data.message,
          type: alert.error,
          change: !state.change,
        }));
      }
    }
  }

  function validForm() {
    let result = true;
    if (state.name.trim() === "") {
      seterrors((state) => ({
        ...state,
        name: "Enter name!",
      }));
      result = false;
    }
    const re = /^[^\s@]+@[^\s@]+$/;
    if (!re.test(String(state.email).toLowerCase())) {
      seterrors((state) => ({
        ...state,
        email: "Enter correct email!",
      }));
      result = false;
    }
    if (state.email.trim() === "") {
      seterrors((state) => ({
        ...state,
        email: "Enter email!",
      }));
      result = false;
    }
    if (state.phoneNumber.trim() === "") {
      seterrors((state) => ({
        ...state,
        phoneNumber: "Enter phone number!",
      }));
      result = false;
    }
    return result;
  }

  function resetErrors() {
    seterrors((state) => ({
      ...state,
      name: null,
      phoneNumber: null,
      email: null,
    }));
  }

  function resetForm() {
    setstate({
      name: "",
      phoneNumber: "",
      email: "",
      departments: [],
    });
    resetErrors();
  }

  const useStyles = makeStyles((theme) => ({
    input: {
      color: "white !important",
      paddingLeft: "5px",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (openForm) {
                    resetErrors();
                  }
                  setopenForm(!openForm);
                }}
              >
                <h3 className="title">Add Member</h3>
                <h3>{!openForm ? <ExpandMore /> : <ExpandLess />} </h3>
              </CardHeader>
              {openForm && (
                <CardBody>
                  <Form>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        {/* <label>Name</label> */}
                        <TextField
                          id="standard-full-width"
                          label="Name"
                          placeholder="Name of member"
                          type="text"
                          name="name"
                          onChange={(e) => onChange(e)}
                          value={state.name}
                          error={errors.name && errors.name.length > 0}
                          helperText={errors.name}
                          // classes={{ root: classes.input }}
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            style: { color: "rgb(255 255 255 / 81%)" },
                          }}
                          fullWidth
                        />
                      </FormGroup>
                      <FormGroup>
                        {/* <label>Email</label> */}
                        <TextField
                          id="standard-full-width"
                          label="Email"
                          placeholder="Email of member"
                          type="text"
                          onChange={(e) => onChange(e)}
                          name="email"
                          value={state.email}
                          error={errors.email && errors.email.length > 0}
                          helperText={errors.email}
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            style: { color: "rgb(255 255 255 / 81%)" },
                          }}
                          fullWidth
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        {/* <label>Mobile Number</label> */}
                        <TextField
                          id="standard-full-width"
                          label="Mobile Number"
                          placeholder="Mobile number of member"
                          type="text"
                          name="phoneNumber"
                          onChange={(e) => onChange(e)}
                          value={state.phoneNumber}
                          error={
                            errors.phoneNumber && errors.phoneNumber.length > 0
                          }
                          helperText={errors.phoneNumber}
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            style: { color: "rgb(255 255 255 / 81%)" },
                          }}
                          fullWidth
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <label>Departments Access</label>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.departments.indexOf("Search") >= 0}
                              onChange={(e) => onChange(e)}
                              name="departments"
                              color="primary"
                              value="Search"
                            />
                          }
                          label="Search"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.departments.indexOf("Orders") >= 0}
                              onChange={(e) => onChange(e)}
                              name="departments"
                              color="primary"
                              value="Orders"
                            />
                          }
                          label="Orders"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.departments.indexOf("List") >= 0}
                              onChange={(e) => onChange(e)}
                              name="departments"
                              color="primary"
                              value="List"
                            />
                          }
                          label="List"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                state.departments.indexOf("Support") >= 0
                              }
                              onChange={(e) => onChange(e)}
                              name="departments"
                              color="primary"
                              value="Support"
                            />
                          }
                          label="Support"
                        />
                      </FormGroup>
                    </Col>
                  </Form>
                </CardBody>
              )}
              {openForm && (
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    onClick={() => {
                      onSave();
                    }}
                  >
                    Save
                  </Button>
                </CardFooter>
              )}
            </Card>
          </Col>
        </Row>
        <AccountsContent />
        <AlertMessages state={notify} />
      </div>
    </>
  );
}

export default Accounts;
