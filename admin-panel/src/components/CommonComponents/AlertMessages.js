import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarContent } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertMessages({
  state, //error, warning, success, info,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const message = state && state.message ? state.message : "";
  const closingTime = state && state.closingTime ? state.closingTime : 4000;
  const type = state && state.type ? state.type : null;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [message, closingTime, type]);

  return (
    <div className={classes.root}>
      {message && message.trim() !== "" && (
        <Snackbar
          open={open}
          autoHideDuration={closingTime}
          onClose={handleClose}
        >
          {type ? (
            <Alert onClose={handleClose} severity={type}>
              {message.trim()}
            </Alert>
          ) : (
            <SnackbarContent message={message.trim()} />
          )}
        </Snackbar>
      )}
    </div>
  );
}
