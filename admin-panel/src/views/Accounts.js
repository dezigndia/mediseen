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
import { Checkbox, FormControlLabel } from "@material-ui/core";
import {
  CollectionsOutlined,
  ExpandLess,
  ExpandMore,
  MoreVert,
} from "@material-ui/icons";
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
import AccountsContent from "./accounts/AccountsContent";

function Accounts() {
  const [openForm, setopenForm] = useState(false);
  const [state, setstate] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    departments: [],
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
      console.log(data);
      if (data.success) {
        console.log("success saving admin");
      } else {
        console.log("no success");
      }
    }
  }

  function validForm() {
    if (state.name.trim() === "") {
      seterrors((state) => ({
        ...state,
        name: "Enter name!",
      }));
      return false;
    } else if (state.email.trim() === "") {
      seterrors((state) => ({
        ...state,
        email: "Enter email!",
      }));
      return false;
    } else if (state.phoneNumber.trim() === "") {
      seterrors((state) => ({
        ...state,
        phoneNumber: "Enter phone number!",
      }));
      return false;
    }
    // else if (state.password.trim() === "") {
    //   seterrors((state) => ({
    //     ...state,
    //     password: "Enter password!",
    //   }));
    //   return false;
    // } else if (state.confirmPassword.trim() === "") {
    //   seterrors((state) => ({
    //     ...state,
    //     confirmPassword: "Enter confirm password!",
    //   }));
    //   return false;
    // } else if (state.password !== state.confirmPassword) {
    //   seterrors((state) => ({
    //     ...state,
    //     confirmPassword: "Confirm password and password do not match!",
    //   }));
    //   return false;
    // }
    return true;
  }

  function resetErrors() {
    seterrors((state) => ({
      ...state,
      name: null,
      phoneNumber: null,
      email: null,
      password: null,
      confirmPassword: null,
    }));
  }

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
                }}
                onClick={() => setopenForm(!openForm)}
              >
                <h3 className="title">Add Member</h3>
                <h3>{!openForm ? <ExpandMore /> : <ExpandLess />} </h3>
              </CardHeader>
              {openForm && (
                <CardBody>
                  <Form>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          placeholder="Name of member"
                          type="text"
                          name="name"
                          onChange={(e) => onChange(e)}
                          value={state.name}
                        />
                        <label>Email</label>
                        <Input
                          placeholder="Email of member"
                          type="text"
                          onChange={(e) => onChange(e)}
                          name="email"
                          value={state.email}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Mobile Number</label>
                        <Input
                          placeholder="Mobile number of member"
                          type="text"
                          name="phoneNumber"
                          onChange={(e) => onChange(e)}
                          value={state.phoneNumber}
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
      </div>
    </>
  );
}

export default Accounts;
