import { Card, Grid, makeStyles } from "@material-ui/core";
import { ArrowDownward, ExpandMore, RoomOutlined } from "@material-ui/icons";
import React from "react";

export default function DashboardTableCard({ data = {} }) {
  const useStyles = makeStyles((theme) => ({
    location: {
      fontWeight: "500",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "600",
    },
    active: {
      backgroundColor: data.isActive ? "green" : "red",
    },
    verified: {
      backgroundColor: data.isVerified ? "green" : "red",
    },
  }));
  const classes = useStyles();
  // console.log(data, "data");
  return (
    <Card
      style={{ width: "100%", margin: "10px", padding: "10px", marginLeft: 0 }}
    >
      <Grid container direction="row">
        <Grid item xs={9} direction="column">
          <Grid
            item
            style={{ display: "flex", width: "100%" }}
            direction="row"
            justify="space-between"
          >
            <Grid container direction="column">
              <Grid item classes={{ root: classes.title }}>
                {data.businessName}
              </Grid>
              <Grid item classes={{ root: classes.location }}>
                <RoomOutlined />
                {data.area}
              </Grid>
            </Grid>
            <Grid
              item
              style={{
                width: "20%",
              }}
            >
              today 8 orders
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>List 29/10/20</Grid>
            <Grid item>
              <span className={classes.active}>
                {data.isActive ? "Active" : "Not Active"}
              </span>{" "}
              akjak{" "}
              <span className={classes.verified}>
                {data.isVerified ? "Verified" : "Not Verified"}
              </span>
            </Grid>
            <Grid item>
              Details <ExpandMore />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          direction="column"
          style={{ display: "flex" }}
          alignItems="flex-end"
          alignContent="flex-end"
        >
          <Grid item>Rs. 2000</Grid>
          <Grid item>210 orders</Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
