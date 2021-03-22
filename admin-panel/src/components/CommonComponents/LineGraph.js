import { ContactSupportOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

export default function LineGraph({
  data,
  xAxisDataKey = "",
  barDataKey = "",
}) {
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
          <AreaChart data={state}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey={barDataKey}
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
