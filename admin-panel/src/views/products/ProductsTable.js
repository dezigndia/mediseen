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
import { Button, Grid, Input, Menu, MenuItem } from "@material-ui/core";
import AlertMessages from "components/CommonComponents/AlertMessages";
import { MoreVert } from "@material-ui/icons";
import { alertMessages } from "variables/constants";
import { alert } from "variables/constants";

export default function ProductsTable({
  type = "get_products",
  access = null,
}) {
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
      borderRadius: "0px 0px 10px 10px",
    },
  });
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [filter, setfilter] = useState({
    limit: 10,
    skip: 0,
    businessName: "",
    mrp_MAX: "",
    mrp_MIN: "",
    sellingPrice_MAX: "",
    sellingPrice_MIN: "",
  });

  const [filterOpen, setfilterOpen] = useState(false);
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
      // console.log(currentRow, )
      let body = {
        prodId: type.indexOf("product") >= 0 ? rows[currentRow]._id : undefined,
        testId: type.indexOf("test") >= 0 ? rows[currentRow]._id : undefined,
        status: !rows[currentRow].isActive,
      };
      // console.log(body);
      let data = await fetchCall("remove_product", body);
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
    let reqData = await fetchCall(type, undefined, reqBody);
    if (reqData) {
      if (reqData.success) {
        console.log(reqData);
        setrows(reqData.data.data);
        setTotalCount(reqData.data.totalCount / filter.limit + 1);
      } else if (reqData.errCode === 401) {
        if (access) {
          access(false);
          return;
        }
      }
    } else {
      console.log("Something went wrong", reqData);
    }
  }

  useEffect(() => {
    getData(page);
  }, [filter]);
  useEffect(() => {
    setpage(1);
    setfilter((state) => ({
      ...state,
      businessName: "",
      mrp_MAX: "",
      mrp_MIN: "",
      sellingPrice_MAX: "",
      sellingPrice_MIN: "",
    }));
  }, [type]);
  return (
    <TableContainer
      component={Paper}
      classes={{ root: classes.tableContainer }}
    >
      <Grid container direction="column">
        <Grid container justify="space-between">
          {/* <Grid item>
            <span className="component-table-title">
              {type.toLowerCase().indexOf("products") >= 0
                ? "Products List"
                : "Tests List"}
            </span>
          </Grid> */}
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
            <Grid item xs={4}>
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
            <Grid item xs={2}>
              <Input
                onChange={(e) => {
                  setfilter((state) => ({
                    ...state,
                    mrp_MAX: e.target.value,
                  }));
                }}
                placeholder="MRP MAX"
                value={filter.mrp_MAX}
                disableUnderline
                classes={{ root: classes.input }}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                onChange={(e) => {
                  setfilter((state) => ({
                    ...state,
                    mrp_MIN: e.target.value,
                  }));
                }}
                placeholder="MRP MIN"
                value={filter.mrp_MIN}
                disableUnderline
                classes={{ root: classes.input }}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                onChange={(e) => {
                  setfilter((state) => ({
                    ...state,
                    sellingPrice_MAX: e.target.value,
                  }));
                }}
                placeholder="Selling Price MAX"
                value={filter.sellingPrice_MAX}
                disableUnderline
                classes={{ root: classes.input }}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                onChange={(e) => {
                  setfilter((state) => ({
                    ...state,
                    sellingPrice_MIN: e.target.value,
                  }));
                }}
                placeholder="Selling Price MIN"
                value={filter.sellingPrice_MIN}
                disableUnderline
                classes={{ root: classes.input }}
              />
            </Grid>
          </Grid>
        )}
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
            <TableCell align="center" classes={{ root: classes.head }}>
              Status
            </TableCell>
            <TableCell align="right" classes={{ root: classes.head }}>
              &nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row._id}>
              <TableCell align="left">{row.businessName}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{readableDate(row.updatedAt)}</TableCell>
              <TableCell align="center">Rs. {row.mrp}</TableCell>
              <TableCell align="right">Rs. {row.sellingPrice}</TableCell>
              <TableCell align="center">
                {row.isActive ? "Active" : "Inactive"}
              </TableCell>

              <TableCell align="right">
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
        <MenuItem onClick={() => removeAccount()}>Toggle status</MenuItem>
      </Menu>
      <AlertMessages state={notify} />
    </TableContainer>
  );
}
