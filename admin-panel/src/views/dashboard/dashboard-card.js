import { Card, CardHeader, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Row } from "reactstrap";

export default function TopCard({ color, children, title }) {
  const useStyles = makeStyles((theme) => ({
    card: {
      borderRadius: "0.8rem",
      maxHeight: "8rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      padding: "10%",
    },
    title: {
      fontSize: "0.8rem",
      fontWeight: "600",
    },
  }));
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid item classes={{ root: classes.title }}>
          {title}
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Card>
  );
}
