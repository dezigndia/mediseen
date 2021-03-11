// import { PaginationTiles } from "components/CommonComponents/PaginationTiles";
import PaginationTiles from "components/CommonComponents/PaginationTiles";
import { useEffect, useState } from "react";
import { removeEmptyFromObject } from "services/services";
import { convertBodyToQueryParams } from "services/services";
import { fetchCall } from "services/services";
import DashboardTableCard from "./DashboardTableCard";

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
    date_MIN: null,
    date_MAX: null,
    active: true,
  });

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
    }
  }
  useEffect(() => {
    getData(1);
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {data &&
        data.length &&
        data.map((each) => {
          return <DashboardTableCard data={each} />;
        })}
      <PaginationTiles
        tileNo={(tile) => {
          // setpage(tile);
          console.log("here");
          getData(tile);
        }}
        count={totalCount}
      />
    </div>
  );
}
