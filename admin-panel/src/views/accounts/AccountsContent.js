import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { removeEmptyFromObject } from "services/services";
import { convertBodyToQueryParams } from "services/services";
import { fetchCall } from "services/services";
import PaginationTiles from "components/CommonComponents/PaginationTiles";
import { readableDate } from "services/services";
import { ExpandLess, ExpandMore, MoreVert } from "@material-ui/icons";
import { Button, Grid, Input, Menu, MenuItem } from "@material-ui/core";
import { alert } from "variables/constants";
import AlertMessages from "components/CommonComponents/AlertMessages";
import { alertMessages } from "variables/constants";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  sortDate: {
    backgroundColor: "#2772f6",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
    margin: "0 0.5rem",
  },
  input: {
    backgroundColor: "#2b69f5",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "0.8rem",
    margin: "5px 5px 5px 0px",
  },
  filterContainer: {
    backgroundColor: "#2772f630",
    borderRadius: "5px",
    padding: "1rem",
    marginTop: "5px",
  },
  tableContainer: {
    padding: "1rem 1rem",
  },
  head: {
    fontWeight: "700",
    // color: "#cdcfd4",
  },
  tableRow: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
});

export default function AccountsContent({ access = null }) {
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setfilter] = useState({
    limit: 10,
    skip: 0,
    phoneNumber: "",
    name: "",
  });
  const [filterOpen, setfilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setnotify] = useState({
    message: null,
    type: null,
    change: false,
  });
  const [currentRow, setcurrentRow] = useState(-1);
  const handleClick = (event, i) => {
    setAnchorEl(event.currentTarget);
    setcurrentRow(i);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeAccount = async () => {
    if (currentRow >= 0) {
      let body = {
        emails: [rows[currentRow].email],
      };
      console.log(body);
      let data = await fetchCall("remove_admin", body);
      console.log(data);
      if (data) {
        setnotify((state) => ({
          ...state,
          message: data.data.message,
          type: data.success ? alert.success : alert.error,
          change: !state.change,
        }));

        if (data.success) {
          getData(page);
        }
      } else
        setnotify((state) => ({
          ...state,
          type: null,
          message: alertMessages.unexpectedError,
          change: !state.change,
        }));
      handleClose();
    }
  };

  async function getData(page = 1) {
    let body = filter;
    body.skip = body.limit * (page - 1);
    body = removeEmptyFromObject(body);
    let reqBody = convertBodyToQueryParams(body);
    let reqData = await fetchCall("get_admins", undefined, reqBody);
    if (reqData) {
      if (reqData.success) {
        console.log(reqData);
        setrows(reqData.data.data);
        setTotalCount(reqData.data.totalCount);
      } else if (reqData.errCode === 401) {
        if (access) access(false);
        return;
      }
    } else {
      // console.log("Something went wrong", reqData);
      setnotify((state) => ({
        ...state,
        message: alertMessages.unexpectedError,
        type: null,
        change: !state.change,
      }));
    }
  }
  useEffect(() => {
    getData(page);
  }, [filter]);
  return (
    <TableContainer
      classes={{ root: classes.tableContainer }}
      component={Paper}
    >
      <Grid container direction="column">
        <Grid container justify="space-between">
          <Grid item>
            <span className="component-table-title">Accounts</span>
          </Grid>
          <Grid item>
            <PaginationTiles
              tileNo={(tile) => {
                setpage(tile);
                getData(tile);
              }}
              totalTiles={Math.floor(totalCount / filter.limit) + 1}
            />
          </Grid>

          <Grid item>
            <span
              onClick={() => {
                setfilterOpen(!filterOpen);
              }}
              className={classes.sortDate}
            >
              Filter
            </span>
          </Grid>
        </Grid>
        {filterOpen && (
          <Grid
            container
            alignItems="center"
            classes={{ root: classes.filterContainer }}
          >
            <Grid item>
              <Input
                onChange={(e) => {
                  setfilter((state) => ({
                    ...state,
                    name: e.target.value,
                  }));
                }}
                placeholder="Search by name"
                value={filter.name}
                disableUnderline
                classes={{ root: classes.input }}
              />
            </Grid>
            <Grid item>
              <Input
                onChange={(e) => {
                  setfilter((state) => ({
                    ...state,
                    phoneNumber: e.target.value,
                  }));
                }}
                placeholder="Search by phone number"
                value={filter.phoneNumber}
                disableUnderline
                classes={{ root: classes.input }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow classes={{ head: classes.head }}>
            <TableCell align="left" classes={{ root: classes.head }}>
              Name
            </TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              Departments
            </TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              ID
            </TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              &nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.email}>
              <TableCell
                classes={{ root: classes.tableRow }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell classes={{ root: classes.tableRow }} align="left">
                {row &&
                  row.departments &&
                  row.departments.length > 0 &&
                  row.departments.map((each) => {
                    return <>{each}, </>;
                  })}
              </TableCell>
              <TableCell classes={{ root: classes.tableRow }} align="left">
                {row.email}
              </TableCell>
              <TableCell classes={{ root: classes.tableRow }} align="right">
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleClick(e, i)}
                >
                  <MoreVert />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Edit Account</MenuItem> */}
        <MenuItem onClick={() => removeAccount()}>Remove Account</MenuItem>
      </Menu>
      <AlertMessages state={notify} />
    </TableContainer>
  );
}
