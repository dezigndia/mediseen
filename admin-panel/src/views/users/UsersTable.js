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
import { Grid, Input } from "@material-ui/core";

export default function UsersTable() {
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
      color: "white",
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
      // backgroundColor: "rgb(30 30 45 / 19%)",
    },
    head: {
      fontWeight: "700",
    },
    tableRow: {
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
    },
  });
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setfilter] = useState({
    limit: 10,
    skip: 0,
    phone: "",
    name: "",
  });

  const [filterOpen, setfilterOpen] = useState(false);

  async function getData(page = 1) {
    let body = filter;
    body.skip = body.limit * (page - 1);
    body = removeEmptyFromObject(body);
    let reqBody = convertBodyToQueryParams(body);
    let reqData = await fetchCall("get_users", undefined, reqBody);
    if (reqData && reqData.success) {
      console.log(reqData);
      setrows(reqData.data.data);
      setTotalCount(reqData.data.totalCount);
    } else {
      console.log("Something went wrong", reqData);
    }
  }
  useEffect(() => {
    getData(page);
  }, [filter]);
  return (
    <TableContainer
      component={Paper}
      classes={{ root: classes.tableContainer }}
    >
      <Grid container direction="column">
        <Grid container justify="space-between">
          <Grid item>
            <span className="component-table-title">Users</span>
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
                    phone: e.target.value,
                  }));
                }}
                placeholder="Search by phone number"
                value={filter.phone}
                disableUnderline
                classes={{ root: classes.input }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" classes={{ root: classes.head }}>
              Name
            </TableCell>
            <TableCell align="center" classes={{ root: classes.head }}>
              PINCODE
            </TableCell>
            <TableCell align="right" classes={{ root: classes.head }}>
              Orders
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.email}>
              <TableCell
                classes={{ root: classes.tableRow }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell classes={{ root: classes.tableRow }} align="center">
                {row && row.address && row.address[0] && row.address[0].pincode
                  ? row.address[0].pincode
                  : "Not Available"}
              </TableCell>
              <TableCell classes={{ root: classes.tableRow }} align="right">
                Rs. {row.totalCost}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
