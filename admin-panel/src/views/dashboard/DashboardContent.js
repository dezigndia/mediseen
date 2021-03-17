// import { PaginationTiles } from "components/CommonComponents/PaginationTiles";
// import classes from "*.module.css";
import { Grid, Input, makeStyles } from "@material-ui/core";
import { HistoryTwoTone } from "@material-ui/icons";
import PaginationTiles from "components/CommonComponents/PaginationTiles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { removeEmptyFromObject } from "services/services";
import { convertBodyToQueryParams } from "services/services";
import { fetchCall } from "services/services";
import DashboardTableCard from "./DashboardTableCard";
import MenuForFilter from "./MenuForFilter";

export default function DashboardContent() {
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  const [filter, setfilter] = useState({
    category: "",
    area: "",
    search: "",
    specialist: null,
    limit: 10,
    skip: 0,
    createdAt_MIN: null,
    createdAt_MAX: null,
    active: true,
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
      setdata(reqData.data.payload);
    } else {
      console.log("Something went wrong", reqData);
      localStorage.clear();
      history.push("/signin");
    }
  }

  const useStyles = makeStyles((theme) => ({
    input: {
      backgroundColor: "white",
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    console.log("calling");
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
                category: e === "All Lists" ? "" : e,
              }));
            }}
          />
        </Grid>
        <Grid item>
          <MenuForFilter
            title="City"
            data={["All Lists", "Delhi", "Mumbai", "Kharar"]}
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                area: e === "All Lists" ? "" : e,
              }));
            }}
          />
        </Grid>
        <Grid item>
          {/* <MenuForFilter
          title="Date Lower"
            data={["All Lists", "Pharmacy", "Doctor", "Hospital", "Pathology"]}
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                createdAt_MIN: e,
              }));
            }}
          /> */}
        </Grid>
        <Grid item>
          {/* <MenuForFilter
            data={["All Lists", "Pharmacy", "Doctor", "Hospital", "Pathology"]}
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                createdAt_MAX: e,
              }));
            }}
          /> */}
        </Grid>
        <Grid item>
          <MenuForFilter
            data={["Active", "Inactive"]}
            selected={(e) => {
              setfilter((state) => ({
                ...state,
                active: e === "Active",
              }));
            }}
          />
        </Grid>
        <Grid item xs="auto">
          <Input
            onChange={(e) => {
              setfilter((state) => ({
                ...state,
                search: e.target.value,
              }));
            }}
            placeholder="Search by name"
            value={filter.search}
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
          console.log("here");
          getData(tile);
        }}
        totalTiles={totalCount}
      />
    </div>
  );
}
