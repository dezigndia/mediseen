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
import { Grid, Input } from "@material-ui/core";
import MenuForFilter from "views/dashboard/MenuForFilter";
import { useHistory } from "react-router";

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
    grandTotal_MIN: "",
    userPhoneNumber: "",
    businessName: "",
    grandTotal_MAX: "",
    sortBy: "createdAt",
    status: null,
  });
  const [filterOpen, setfilterOpen] = useState(false);
  const [show, setshow] = useState(true);
  let history = useHistory();

  async function getData(page = 1) {
    let body = filter;
    body.skip = body.limit * (page - 1);
    body = removeEmptyFromObject(body);
    let reqBody = convertBodyToQueryParams(body);
    let reqData = await fetchCall("get_orders", undefined, reqBody);
    if (reqData) {
      if (reqData.success) {
        setrows(reqData.data.data);
        setTotalCount(reqData.data.totalCount);
      } else if (reqData.errCode === 401) {
        setshow(false);
        return;
      } else if (reqData.errCode === 408) {
        localStorage.clear();
        history.push("/signin");
        return;
      }
    } else {
      // console.log("Something went wrong", reqData);
    }
  }
  useEffect(() => {
    getData(page);
  }, [filter]);
  return (
    <div>
      {show ? (
        <TableContainer
          classes={{ root: classes.tableContainer }}
          component={Paper}
        >
          <Grid container direction="column">
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
                    setfilterOpen(!filterOpen);
                  }}
                  className={classes.sortDate}
                >
                  Filter
                </span>
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
                        businessName: e.target.value,
                      }));
                    }}
                    placeholder="Search by business name"
                    value={filter.businessName}
                    disableUnderline
                    classes={{ root: classes.input }}
                  />
                </Grid>
                <Grid item>
                  <Input
                    onChange={(e) => {
                      setfilter((state) => ({
                        ...state,
                        userPhoneNumber: e.target.value,
                      }));
                    }}
                    placeholder="Search by customer phone number"
                    value={filter.userPhoneNumber}
                    disableUnderline
                    classes={{ root: classes.input }}
                  />
                </Grid>
                <Grid item>
                  <Input
                    onChange={(e) => {
                      setfilter((state) => ({
                        ...state,
                        grandTotal_MAX: e.target.value,
                      }));
                    }}
                    placeholder="Amount MAX"
                    value={filter.grandTotal_MAX}
                    disableUnderline
                    classes={{ root: classes.input }}
                  />
                </Grid>
                <Grid item>
                  <Input
                    onChange={(e) => {
                      setfilter((state) => ({
                        ...state,
                        grandTotal_MIN: e.target.value,
                      }));
                    }}
                    placeholder="Amount MIN"
                    value={filter.grandTotal_MIN}
                    disableUnderline
                    classes={{ root: classes.input }}
                  />
                </Grid>
                <Grid item style={{ marginTop: "-10px" }}>
                  <MenuForFilter
                    title="status"
                    data={["All", "Cancelled", "Delivered", "Pending"]}
                    selected={(e) => {
                      setfilter((state) => ({
                        ...state,
                        status: e === "All" ? null : e,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Table className={classes.table} aria-label="simple table">
            <TableHead classes={{ root: classes.head }}>
              <TableRow>
                <TableCell classes={{ root: classes.head }}>
                  Order No.
                </TableCell>
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
                  <TableCell align="left">
                    {readableDate(row.createdAt)}
                  </TableCell>
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
      ) : (
        "Unauthorized access"
      )}
    </div>
  );
}
