import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { Cancel, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";

export default function MenuForFilter({
  data = [],
  selected,
  title = "",
  type = "standard",
}) {
  const [state, setstate] = useState(data && data[0] ? data[0] : "");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, item) => {
    setAnchorEl(null);
    if (item) {
      selected(item);
      setstate(item);
    }
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: "white",
      marginRight: "10px",
      borderRadius: "10px",
    },
    btn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      cursor: type === "date" ? "default" : "auto",
      "&:focus": {
        border: "none",
      },
    },
    btnTitle: {
      fontSize: "0.5rem",
      fontWeight: "600",
      color: "grey",
    },
    btnState: {
      fontSize: "0.7rem",
      fontWeight: "700",
    },
    dateCont: {
      padding: "0.5rem 5px 0.7rem 5px",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {type === "standard" && (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          classes={{ label: classes.btn }}
        >
          <div className={classes.btnTitle}>{title}</div>
          <div className={classes.btnState}>
            {state} <ExpandMore />
          </div>
        </Button>
      )}
      {type === "standard" && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
        >
          {data.map(
            (each) =>
              each !== state && (
                <MenuItem
                  classes={{ root: classes.btnState }}
                  onClick={(e) => handleClose(e, each)}
                >
                  {each}
                </MenuItem>
              )
          )}
        </Menu>
      )}
      {type === "date" && (
        <div className={classes.dateCont}>
          <div className={classes.btnTitle}>
            {title ? title.toUpperCase() : ""}
          </div>
          <div className={classes.btnState}>
            {type === "date" && (
              <>
                <input
                  type="date"
                  value={state}
                  onChange={(e) => {
                    setstate(e.target.value);
                    selected(e.target.value);
                  }}
                  style={{ border: "none" }}
                  required
                />
                {state && (
                  <span
                    onClick={() => {
                      setstate("");
                      selected(null);
                    }}
                  >
                    {" "}
                    <Cancel />
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
