// import { PaginationTiles } from "components/CommonComponents/PaginationTiles";
// import classes from "*.module.css";
import { Grid, Input, makeStyles } from "@material-ui/core";
import { HistoryTwoTone } from "@material-ui/icons";
import BarGraph from "components/CommonComponents/BarGraph";
import PaginationTiles from "components/CommonComponents/PaginationTiles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { removeEmptyFromObject } from "services/services";
import { convertBodyToQueryParams } from "services/services";
import { fetchCall } from "services/services";
import DashboardTableCard from "./DashboardTableCard";
import MenuForFilter from "./MenuForFilter";
import _ from "lodash";

export default function DashboardContent() {
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setfilter] = useState({
    type: "",
    area: "",
    businessName: "",
    limit: 10,
    skip: 0,
    createdAt_DATE_MIN: null,
    createdAt_DATE_MAX: null,
    isActive: null,
  });
  const history = useHistory();
  const [data, setdata] = useState([]);
  async function getData(page = 1) {
    let body = filter;
    body.skip = body.limit * (page - 1);
    body = removeEmptyFromObject(body);
    let reqBody = convertBodyToQueryParams(body);
    let reqData = await fetchCall("get_businesses", undefined, reqBody);
    if (reqData && reqData.success) {
      setdata(_.sortBy(reqData.data.payload.reqData, "businessName"));
      setTotalCount(reqData.data.payload.totalCount / filter.limit + 1);
    } else if (reqData && reqData.errCode === 408) {
      localStorage.clear();
      history.push("/signin");
      return;
    }
  }

  const useStyles = makeStyles((theme) => ({
    input: {
      backgroundColor: "white",
      padding: "8px",
      marginTop: "10px",
      borderRadius: "10px",
      marginRight: "10px",
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    getData(page);
  }, [filter]);
  return (
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item>
          <MenuForFilter
            title="Business Type"
            data={["All Lists", "Pharmacy", "Doctor", "Hospital", "Pathology"]}
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                type: e === "All Lists" ? "" : e,
              }));
            }}
          />
        </Grid>
        <Grid item>
          <MenuForFilter
            title="Date Lower"
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                createdAt_DATE_MIN: e,
              }));
            }}
            type="date"
          />
        </Grid>
        <Grid item>
          <MenuForFilter
            title="date upper"
            type="date"
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                createdAt_DATE_MAX: e,
              }));
            }}
          />
        </Grid>
        <Grid item>
          <MenuForFilter
            title="status"
            data={["All", "Active", "InActive"]}
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                isActive:
                  e === "Active" ? true : e === "InActive" ? false : null,
              }));
            }}
          />
        </Grid>
        <Grid item>
          <Input
            onChange={(e) => {
              setfilter((state) => ({
                ...state,
                area: e.target.value,
              }));
            }}
            placeholder="Search by area"
            value={filter.area}
            disableUnderline
            classes={{ root: classes.input }}
          />
        </Grid>
        <Grid item>
          <Input
            onChange={(e) => {
              setfilter((state) => ({
                ...state,
                businessName: e.target.value,
              }));
            }}
            placeholder="Search by name"
            value={filter.businessName}
            disableUnderline
            classes={{ root: classes.input }}
          />
        </Grid>
      </Grid>
      {data &&
        data.length &&
        data.map((each) => {
          return <DashboardTableCard data={each} />;
        })}
      <PaginationTiles
        tileNo={(tile) => {
          setpage(tile);
          getData(tile);
        }}
        totalTiles={totalCount}
      />
    </div>
  );
}
