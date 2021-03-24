import { Grid } from "@material-ui/core";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function PieGraph({ data, nameKey = "", dataKey = "" }) {
  const COLORS = ["#9fdfcd", "#d79ad7", "#ffaab9", "#a0a2ff"];
  const [state, setstate] = useState(null);
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <Grid container direction="row" justify="space-between">
        {payload.map((entry, index) => (
          <Grid item style={{ margin: "5px" }}>
            <span
              style={{
                backgroundColor: COLORS[index],
                padding: "0 5px",
              }}
            >
              &nbsp;
            </span>
            <span
              style={{
                color: COLORS[index],
                listStyle: "none",
                margin: "0.2rem",
                fontWeight: "500",
              }}
              key={`item-${index}`}
            >
              {entry.value}:{Math.round(entry.payload.percent * 100 || 0)}%
            </span>
          </Grid>
        ))}
      </Grid>
    );
  };
  useEffect(() => {
    if (data && data.length) {
      const req = [...data];
      setstate((state) => {
        return req;
      });

      //   req.forEach((each) => settotal((state) => state + req[dataKey]));
    }
  }, [data]);

  return (
    <div style={{ width: "100%", height: "20rem" }}>
      {state && (
        <ResponsiveContainer width={"100%"}>
          <PieChart>
            <Pie
              data={state}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="100%"
              fill="#82ca9d"
              //   label
            >
              {state.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend content={renderLegend} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
