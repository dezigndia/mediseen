import { ContactSupportOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function BarGraph({ data, xAxisDataKey = "", barDataKey = "" }) {
  const data2 = [
    {
      month: 3,
      grandTotal: 3090,
    },
  ];

  const [state, setstate] = useState(null);
  const [change, setchange] = useState(false);
  useEffect(() => {
    //   createData(data);
    if (data && data.length) {
      const req = [...data];
      setstate((state) => {
        // console.log(state, "prev state");
        return req;
      });
    }
  }, [data]);

  //   useEffect(() => {
  //     console.log("state", state);
  //     setchange(!change);
  //   }, [state]);
  return (
    <div style={{ width: "100%" }}>
      {state && (
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={state}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey={xAxisDataKey} />
            {/* <YAxis /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey={barDataKey} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
