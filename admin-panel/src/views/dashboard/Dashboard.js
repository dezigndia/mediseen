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

function Dashboard({}) {
  const [cardsData, setcardsData] = useState([]);

  async function totalBusinesses() {
    try {
      let data = await fetchCall("get_total_businesses");

      if (data && data.success) {
        let cards = { title: "Total Businesses", content: data.data };
        setcardsData((state) => [...state, cards]);
        console.log(cards, "cards");
      } else {
        setcardsData([
          ...cardsData,
          { title: "Total Businesses", content: "Error" },
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
    } else {
      setcardsData((state) => [
        ...state,
        { title: "New Business This Month", content: "Error" },
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
      console.log(cards, "cards");
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
      console.log(cards, "cards");
    } else {
      setcardsData((state) => [
        ...state,
        { title: "Total O/A Month", content: "Error" },
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
  }));
  const classes = useStyles();

  useEffect(() => {
    totalBusinesses();
  }, []);
  // console.log(cardsData);
  return (
    <>
      <div className="content">
        <span style={{ margin: "1rem 0" }}>Quick Stats</span>
        <Grid container spacing={2}>
          {cardsData.map((each, i) => (
            <Grid item xs={2} key={i}>
              <TopCard title={each.title}>
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
    </>
  );
}

export default Dashboard;
