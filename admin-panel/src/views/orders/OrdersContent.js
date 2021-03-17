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
import {
  ArrowDropDown,
  ArrowDropUp,
  ExpandLess,
  ExpandMore,
  MoreVert,
} from "@material-ui/icons";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    padding: "1rem 1rem",
    // backgroundColor: "rgb(30 30 45 / 19%)",
  },
  head: {
    fontWeight: "600",
  },
  sortDate: {
    backgroundColor: "#2772f6",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
});

export default function OrdersContent() {
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setfilter] = useState({
    limit: 10,
    skip: 0,
    asc: null,
    sortBy: "createdAt",
  });

  async function getData(page = 1) {
    let body = filter;
    body.skip = body.limit * (page - 1);
    body = removeEmptyFromObject(body);
    let reqBody = convertBodyToQueryParams(body);
    let reqData = await fetchCall("get_orders", undefined, reqBody);
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
      classes={{ root: classes.tableContainer }}
      component={Paper}
    >
      <Grid container justify="space-between">
        <Grid item>
          <span className="component-table-title">Orders</span>
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
              if (filter.asc === 1) {
                setfilter((state) => ({
                  ...state,
                  asc: -1,
                }));
              } else if (filter.asc === -1) {
                setfilter((state) => ({
                  ...state,
                  asc: null,
                }));
              } else {
                setfilter((state) => ({
                  ...state,
                  asc: 1,
                }));
              }
            }}
            className={classes.sortDate}
          >
            Sort Datewise{" "}
            {filter.asc === 1 ? (
              <ArrowDropDown />
            ) : filter.asc === -1 ? (
              <ArrowDropUp />
            ) : (
              " "
            )}
          </span>
        </Grid>
      </Grid>

      <Table className={classes.table} aria-label="simple table">
        <TableHead classes={{ root: classes.head }}>
          <TableRow>
            <TableCell classes={{ root: classes.head }}>Order No.</TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              CUSTOMER
            </TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              BUSINESS
            </TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              DATE{" "}
              {filter.asc === 1 ? (
                <ExpandLess />
              ) : filter.asc === -1 ? (
                <ExpandMore />
              ) : (
                ""
              )}
            </TableCell>
            <TableCell align="center" classes={{ root: classes.head }}>
              AMOUNT
            </TableCell>
            <TableCell align="center" classes={{ root: classes.head }}>
              STATUS
            </TableCell>
            <TableCell align="right" classes={{ root: classes.head }}>
              PINCODE
            </TableCell>
            {/* <TableCell align="right">&nbsp;</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.orderId}>
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="left">{row.patientName}</TableCell>
              <TableCell align="left">{row.businessName}</TableCell>
              <TableCell align="left">{readableDate(row.createdAt)}</TableCell>
              <TableCell align="center">{row.grandTotal}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="right">
                {row.address ? row.address.pincode : ""}
              </TableCell>
              {/* <TableCell align="right">
                <MoreVert />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
