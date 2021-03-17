import { Card, Grid, makeStyles } from "@material-ui/core";
import { ArrowDownward, ExpandMore, RoomOutlined } from "@material-ui/icons";
import React from "react";

export default function DashboardTableCard({ data = {} }) {
  const useStyles = makeStyles((theme) => ({
    location: {
      fontWeight: "500",
      margin: "0.5rem 0rem 0.5rem -5px",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "600",
    },
    active: {
      backgroundColor: data.isActive ? "#6ec3ff" : "#ffbc6e",
      padding: "2px 5px",
      borderRadius: "5px",
    },
    verified: {
      backgroundColor: data.isVerified ? "#84e0be" : "#ff00008f",
      padding: "2px 5px",
      borderRadius: "5px",
    },
    sales: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: "grey",
    },
    orders: {
      backgroundColor: data.totalCount > 0 ? "#84e0be" : "#b8ba008a",
      padding: "10px",
      borderRadius: "5px",
      fontWeight: "600",
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
              Today {data.orderToday} orders
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>List 29/10/20</Grid>
            <Grid item>
              <span className={classes.active}>
                {data.isActive ? "Active" : "Not Active"}
              </span>{" "}
              {/* akjak{" "} */}
              <span className={classes.verified}>
                {data.isVerified ? "Verified" : "Not Verified"}
              </span>
            </Grid>
            <Grid item>{/* Details <ExpandMore /> */}</Grid>
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
          <Grid item classes={{ root: classes.sales }}>
            Rs. {data.sales}
          </Grid>
          <Grid item classes={{ root: classes.orders }}>
            {data.totalCount} orders
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
