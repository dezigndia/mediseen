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
import { Grid } from "@material-ui/core";

export default function ProductsTable() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    head: {
      fontWeight: "700",
    },
  });
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setfilter] = useState({
    limit: 10,
    skip: 0,
  });

  async function getData(page = 1) {
    let body = filter;
    body.skip = body.limit * (page - 1);
    body = removeEmptyFromObject(body);
    let reqBody = convertBodyToQueryParams(body);
    let reqData = await fetchCall("get_products", undefined, reqBody);
    if (reqData && reqData.success) {
      console.log(reqData);
      setrows(reqData.data.data);
      setTotalCount(reqData.data.totalCount / filter.limit + 1);
    } else {
      console.log("Something went wrong", reqData);
    }
  }
  useEffect(() => {
    getData(page);
  }, [filter]);
  return (
    <TableContainer component={Paper}>
      <Grid container>
        <Grid item>
          <span className="component-table-title">Products</span>
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
      </Grid>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow classes={{ root: classes.head }}>
            <TableCell align="left" classes={{ root: classes.head }}>
              Business Name
            </TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              Product Name
            </TableCell>
            <TableCell align="left" classes={{ root: classes.head }}>
              Updated Date
            </TableCell>
            <TableCell align="center" classes={{ root: classes.head }}>
              MRP
            </TableCell>
            <TableCell align="right" classes={{ root: classes.head }}>
              Selling Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="left">{row.businessName}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{readableDate(row.updatedAt)}</TableCell>
              <TableCell align="center">Rs. {row.mrp}</TableCell>
              <TableCell align="right">Rs. {row.sellingPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
