import { Grid, Divider, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import ReactStars from "react-stars";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

// import fetchCall from "../../../../fetchCall/fetchCall";
import InfoCard from "../uploadPrescription/infoCard/infoCard.component.";
import Result from "./result/result.component";
import { makeStyles } from "@material-ui/core/styles";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "3rem 1rem",
  },
  name: {
    color: "white",
    fontSize: "1.1rem",
  },
  button1: {
    backgroundColor: "#99A6B1",
    fontSize: "1.2rem",
    padding: "0.1rem 2rem",
    color: "white",
  },
  button2: {
    backgroundColor: "#FFFFFF",
    fontSize: "1.2rem",
    padding: "0.1rem 2rem",
  },
}));

const ConfirmOrder = ({ name, address, stars, distance }) => {
  const classes = useStyles();
  const [isTrue, IsTrue] = useState();
  const [category, Category] = useState(["pharmacy", "pathology"]);
  const [checkedValues, CheckedValues] = useState([""]);
  const currentVendor = useSelector((state) => state.currentVendor);

  return (
    <Grid
      container
      className={classes.container}
      direction="column"
       spacing={5}
    >
      <Grid container item spacing={2}>
        <Grid item 
        // spacing={4} 
        container alignItems="center" xs={12}>
          {/* <div>
    {category.map(x =>
        <Checkbox
          label={x} key={x.toString()}
          onCheck={() =>handleCheck(x)}
          checked={checkedValues.includes(x)}
         />
    )}
    </div> */}
          <Grid item xs={2}>
            <Avatar alt="Cindy Baker" src="" />
          </Grid>
          <Grid xs={6} item className={classes.name}>
            Pharmacry
          </Grid>
          <Grid item xs={4}>
            <Checkbox
              {...label}
              onChange={(e) => {
                isTrue === "pharmacy" ? IsTrue("pharmacy") : IsTrue("pharmacy");
              }}
              checked={isTrue === "pharmacy" ? true : false}
            />
          </Grid>
          <Grid item xs={2}>
            <Avatar alt="Cindy Baker" src="" />
          </Grid>
          <Grid xs={6} item className={classes.name}>
            Pathology
          </Grid>
          <Grid item xs={4}>
            <Checkbox
              {...label}
              onChange={(e) => {
                isTrue === "pathology"
                  ? IsTrue("pathology")
                  : IsTrue("pathology");
              }}
              checked={isTrue === "pathology" ? true : false}
            />
          </Grid>
          {/* <InfoCard data={currentVendor} /> */}
          {isTrue !== 0 ? <Result category={isTrue} /> : null}
        </Grid>
        {/* <Grid item container xs={12} justify="space-between">
					<Grid xs={8} item className={classes.name}>
					</Grid>
					<Grid item xs={4} className={classes.name}>
						{distance}
					</Grid>
				</Grid> */}
      </Grid>
      {/* <Grid container item xs={12} justify="space-evenly" spacing={3}>
        <Grid item>
          <Link to="/home">
          <Button className={clsx(classes.button1)}>No</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="payment?order=pres">
            <Button className={clsx(classes.button2)}>Yes</Button>
          </Link>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default ConfirmOrder;
