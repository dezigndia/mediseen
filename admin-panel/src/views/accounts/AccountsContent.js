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
import { Grid, Input } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  head: {
    fontWeight: "700",
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
    padding: "8px",
    color: "white",
    borderRadius: "10px",
  },
});

export default function AccountsContent() {
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
  async function getData(page = 1) {
    let body = filter;
    body.skip = body.limit * (page - 1);
    body = removeEmptyFromObject(body);
    let reqBody = convertBodyToQueryParams(body);
    let reqData = await fetchCall("get_admins", undefined, reqBody);
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
    <TableContainer component={Paper}>
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
          <Grid container>
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
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Departments</TableCell>
            <TableCell align="left">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">
                {row &&
                  row.departments &&
                  row.departments.length > 0 &&
                  row.departments.map((each) => {
                    return <>{each}, </>;
                  })}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
