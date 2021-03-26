import { Grid, makeStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import BarGraph from "components/CommonComponents/BarGraph";
import LineGraph from "components/CommonComponents/LineGraph";
import PieGraph from "components/CommonComponents/PieGraph";

import React, { useEffect, useState } from "react";
import { readableDate } from "services/services";
import { convertBodyToQueryParams } from "services/services";
import { fetchCall } from "services/services";

export default function RightPanel() {
  const [monthlyOrders, setmonthlyOrders] = useState(null);
  const [weeklyAppoinments, setweeklyAppoinments] = useState(null);
  const [relativeAmount, setrelativeAmount] = useState(null);

  const [currentDate, setcurrentDate] = useState(new Date());
  const [state, setstate] = useState("monthly");
  const [total, settotal] = useState(0);

  const handleState = (event, value) => {
    if (value) {
      setstate(value);
      getOrderTrend(value);
    }
  };
  async function getOrderTrend(type = "monthly") {
    let date = new Date();
    let body = {
      date,
      type,
    };
    body = convertBodyToQueryParams(body);
    const data = await fetchCall("order_trend", undefined, body);
    try {
      if (data && data.success) {
        let reqData = [];
        let length = type === "monthly" ? 12 : date.getDay();
        for (let i = 0; i < length; i++) {
          let a = type === "weekly" ? incrementDate(date, -6 + i).getDay() : "";
          reqData.push({
            month: i + 1,
            Sales: 0,
          });
          data.data.data.forEach((each) => {
            if (each._id.month === reqData[i].month) {
              reqData[i].Sales = each.grandTotal;
            } else if (type === "weekly" && each._id.day === a) {
              reqData[i].Sales = each.grandTotal;
            }
          });
        }

        setmonthlyOrders(reqData);
      }
    } catch (e) {
      console.log(e);
    }
  }
  function incrementDate(date, value) {
    let d = new Date(date);
    d.setDate(d.getDate() + value);
    return d;
  }
  async function getWeeklyAppointmentTrend() {
    let date = currentDate;
    let body = {
      date,
    };
    const data = await fetchCall("weekly_appointment_trend", body);
    try {
      if (data && data.success) {
        let reqData = [];
        let length = date.getDay();
        for (let i = 0; i < length; i++) {
          let dateR = incrementDate(currentDate, -length + i + 1);
          dateR = readableDate(dateR);
          reqData.push({
            date: dateR,
            Count: 0,
            day: i + 1,
          });
          data.data.data.map((eachReq) => {
            if (
              reqData[i].date ===
              `${eachReq._id.day}/${eachReq._id.month}/${eachReq._id.year}`
            ) {
              reqData[i].Count = eachReq.count;
            }
          });
        }
        setweeklyAppoinments(reqData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getRelativeAmounts() {
    try {
      let data = await fetchCall("get_relative_amount");
      let req = [];
      if (data && data.success) {
        Object.keys(data.data).forEach((each) => {
          req.push({
            name:
              each === "pathologySales"
                ? "Pathology"
                : each === "hospitalSales"
                ? "Hospital"
                : each === "pharmacySales"
                ? "Pharmacy"
                : each === "doctorSales"
                ? "Doctor"
                : "",
            sales: data.data[each].sales,
          });
        });
        setrelativeAmount(req);

        req.forEach((each) => settotal((state) => state + each.sales));
      }
    } catch (e) {}
  }
  useEffect(() => {
    getOrderTrend();
    getWeeklyAppointmentTrend();
    getRelativeAmounts();
  }, []);

  const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "grey",
    },
    panel: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: "10px",
      marginLeft: "1rem",
      padding: "10px 5px",
      paddingLeft: "5px",
    },
    btn: {
      fontSize: "0.5rem",
      padding: "5px",
      fontWeight: "600",
      backgroundColor: "white",
    },
    btnSelected: {
      backgroundColor: "#8884d8 !important",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.panel}>
      <Grid container justify="space-between">
        <Grid className={classes.title} item>
          Order Trend
        </Grid>
        <Grid className={classes.title} item>
          <ToggleButtonGroup
            value={state}
            exclusive
            onChange={handleState}
            aria-label="text alignment"
          >
            <ToggleButton
              classes={{ root: classes.btn, selected: classes.btnSelected }}
              value="monthly"
              aria-label="left aligned"
            >
              Monthly
            </ToggleButton>
            <ToggleButton
              classes={{ root: classes.btn, selected: classes.btnSelected }}
              value="weekly"
              aria-label="right aligned"
            >
              Weekly
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      {monthlyOrders && (
        <BarGraph
          data={monthlyOrders}
          xAxisDataKey="month"
          barDataKey="Sales"
        />
      )}
      <div className={classes.title}>Appointment Trend(Weekly)</div>
      {weeklyAppoinments && (
        <LineGraph
          data={weeklyAppoinments}
          xAxisDataKey={"day"}
          barDataKey={"Count"}
        />
      )}

      <div className={classes.title}>Total amount: Rs. {total}</div>
      {relativeAmount && (
        <PieGraph data={relativeAmount} nameKey={"name"} dataKey={"sales"} />
      )}
    </div>
  );
}
