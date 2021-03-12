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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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
    <TableContainer component={Paper}>
      <span>Orders</span>
      <PaginationTiles
        tileNo={(tile) => {
          setpage(tile);
          getData(tile);
        }}
        totalTiles={Math.floor(totalCount / filter.limit) + 1}
      />
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
      >
        Created At: {filter.asc}
      </span>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order No.</TableCell>
            <TableCell align="left">CUSTOMER</TableCell>
            <TableCell align="left">BUSINESS</TableCell>
            <TableCell align="left">DATE</TableCell>
            <TableCell align="center">AMOUNT</TableCell>
            <TableCell align="center">STATUS</TableCell>
            <TableCell align="right">PINCODE</TableCell>
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
              <TableCell align="right">{row.address.pincode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
