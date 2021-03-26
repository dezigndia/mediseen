import { Card, CardHeader, Grid, makeStyles } from "@material-ui/core";
import { TrendingDown, TrendingUp } from "@material-ui/icons";
import React from "react";
import { Row } from "reactstrap";

export default function TopCard({ children, title, increase }) {
  const useStyles = makeStyles((theme) => ({
    card: {
      borderRadius: "0.8rem",
      maxHeight: "8rem",
      display: "flex",
      height: "6rem",
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
    icon1: {
      color: "green",
      marginLeft: "5px",
    },
    icon2: {
      color: "red",
      marginLeft: "5px",
    },
  }));
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid item classes={{ root: classes.title }}>
          {title}
        </Grid>
        <Grid container>
          <Grid item>{children}</Grid>
          {increase != null && (
            <Grid item>
              {increase ? (
                <TrendingUp classes={{ root: classes.icon1 }} />
              ) : (
                <TrendingDown classes={{ root: classes.icon2 }} />
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
