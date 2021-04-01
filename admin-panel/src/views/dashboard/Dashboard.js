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
import React, { useEffect, useState } from "react";

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { makeStyles } from "@material-ui/core/styles";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Dropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import { Grid, Paper } from "@material-ui/core";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import TopCard from "./dashboard-card";
import DashboardContent from "./DashboardContent";
import { fetchCall } from "services/services";
import RightPanel from "./RightPanel";
import { useHistory } from "react-router";

function Dashboard({}) {
  const [cardsData, setcardsData] = useState([]);
  const [show, setshow] = useState(true);
  let history = useHistory();
  async function totalBusinesses() {
    try {
      let data = await fetchCall("get_total_businesses");
      if (data) {
        if (data.success) {
          let cards = { title: "Total Businesses", content: data.data };
          setcardsData((state) => [...state, cards]);
        } else if (data.errCode === 401) {
          setshow(false);
          return;
        } else if (data.errCode === 408) {
          localStorage.clear();
          history.push("/signin");
          return;
        }
      } else {
        setcardsData([
          ...cardsData,
          { title: "Total Businesses", content: "Error" },
        ]);
      }
    } catch (e) {}
    activeBusinessMonth();
  }
  async function activeBusinessMonth() {
    try {
      let data = await fetchCall("total_active_business");
      if (data) {
        if (data.success) {
          let cards = {
            title: "Active Business Month",
            content: data.data.count,
          };
          setcardsData((state) => [...state, cards]);
        } else if (data.errCode === 401) {
          setshow(false);
          return;
        } else if (data.errCode === 408) {
          localStorage.clear();
          history.push("/signin");
          return;
        }
      } else {
        setcardsData([
          ...cardsData,
          { title: "Active Business Month", content: "Error" },
        ]);
      }
    } catch (e) {}
    newBusinessThisMonth();
  }

  async function newBusinessThisMonth() {
    let data = await fetchCall("new_business_this_month");

    if (data && data.success) {
      let cards = {
        title: "New Business This Month",
        content: data.data.currentMonthCount,
        increase: data.data.currentMonthCount > data.data.prevMonthCount,
      };
      setcardsData((state) => [...state, cards]);
    } else if (data && data.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    } else {
      setcardsData((state) => [
        ...state,
        { title: "New Business This Month", content: "Error" },
      ]);
    }

    returningBusiness();
  }
  async function returningBusiness() {
    let data = await fetchCall("returning_business");

    if (data && data.success) {
      let cards = {
        title: "Returning Business",
        content: data.data.count,
        increase: data.data.count > data.data.prevCount,
      };
      setcardsData((state) => [...state, cards]);
    } else if (data && data.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    } else {
      setcardsData((state) => [
        ...state,
        { title: "Returning Business", content: "Error" },
      ]);
    }

    getTotalPatients();
  }

  async function getTotalPatients() {
    let data = await fetchCall("total_users");

    if (data && data.success) {
      let cards = {
        title: "Total Patients",
        content: data.data.count,
        increase: null,
      };
      setcardsData((state) => [...state, cards]);
    } else if (data && data.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    } else {
      setcardsData((state) => [
        ...state,
        { title: "Total Patients", content: "Error" },
      ]);
    }

    getTotalOAMonth();
  }

  async function getTotalOAMonth() {
    let data = await fetchCall("total_OA_month");

    if (data && data.success) {
      let cards = {
        title: "Total O/A Month",
        content: data.data.count,
        increase: null,
      };
      setcardsData((state) => [...state, cards]);
    } else if (data && data.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    } else {
      setcardsData((state) => [
        ...state,
        { title: "Total O/A Month", content: "Error" },
      ]);
    }

    getNewOAMonth();
  }

  async function getNewOAMonth() {
    let data = await fetchCall("new_oa_month");

    if (data && data.success) {
      let cards = {
        title: "New patients O/A this Month",
        content: data.data.count,
        increase: data.data.count > data.data.prevCount,
      };
      setcardsData((state) => [...state, cards]);
    } else if (data && data.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    } else {
      setcardsData((state) => [
        ...state,
        { title: "New patients O/A this Month", content: "Error" },
      ]);
    }
    returningPatients();
  }

  async function returningPatients() {
    let data = await fetchCall("returning_patients");

    if (data && data.success) {
      let cards = {
        title: "Returning Patients",
        content: data.data.count,
        increase: data.data.count > data.data.prevCount,
      };
      setcardsData((state) => [...state, cards]);
    } else if (data && data.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    } else {
      setcardsData((state) => [
        ...state,
        { title: "Returning Patients", content: "Error" },
      ]);
    }

    successfulOA();
  }

  async function successfulOA() {
    let data = await fetchCall("successful_oa");

    if (data && data.success) {
      let cards = {
        title: "Successful O/A",
        content: data.data.count,
        increase: data.data.count > data.data.prevCount,
      };
      setcardsData((state) => [...state, cards]);
    } else if (data && data.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    } else {
      setcardsData((state) => [
        ...state,
        { title: "Successful O/A", content: "Error" },
      ]);
    }
  }
  const useStyles = makeStyles((theme) => ({
    content: {
      fontSize: "1.5em",
      fontWeight: "900",
    },
    searchHub: {
      color: "grey",
      fontSize: "1.7rem",
      fontWeight: "700",
    },
    gridItem: {
      width: "20%",
      flexBasis: "auto",
      maxWidth: "20%",
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    totalBusinesses();
  }, []);

  return (
    <>
      {show ? (
        <div className="content">
          <span style={{ margin: "1rem 0" }}>Quick Stats</span>
          <Grid container spacing={2}>
            {cardsData.map((each, i) => (
              <Grid item xs={2} key={i} classes={{ root: classes.gridItem }}>
                <TopCard title={each.title} increase={each.increase}>
                  <Grid container>
                    <Grid item classes={{ root: classes.content }}>
                      {each.content}
                    </Grid>
                  </Grid>
                </TopCard>
              </Grid>
            ))}
          </Grid>
          <span className={classes.searchHub}>Search Hub</span>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={8}>
              <DashboardContent />
            </Grid>
            <Grid item xs={4}>
              <RightPanel />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="content">Unauthorized access</div>
      )}
    </>
  );
}

export default Dashboard;
