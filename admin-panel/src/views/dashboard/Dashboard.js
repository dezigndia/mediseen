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
import React, { useState } from "react";

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

function Dashboard({}) {
  const cardsData = [
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
    {
      title: "Total Business",
      content: "1233",
    },
  ];

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
  return (
    <>
      <div className="content">
        <span style={{ margin: "1rem 0" }}>Quick Stats</span>
        <Grid container spacing={2}>
          {cardsData.map((each) => (
            <Grid item xs={2}>
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
        <Grid container>
          <DashboardContent />
        </Grid>
      </div>
    </>
  );
}

export default Dashboard;
