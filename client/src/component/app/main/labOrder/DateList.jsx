import React, { useState ,useEffect} from "react"
import moment from "moment"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import DateRangeIcon from "@material-ui/icons/DateRange"
const useStyles = makeStyles(() => ({
	container: {
		margin: "auto",
		width: "100%",
		backgroundColor: "#220555",
		height: "3rem",
	},
	dateArr: {
		overflowX: "scroll",
		flexWrap: "nowrap",
		width: "100%",
	},
	date: {
		color: "white",
		fontSize: "1.1rem",
		padding: "0.3rem",
	},
	date_active: {
		backgroundColor: "white",
		borderRadius: 50,
		color: "#220555",
		padding: "0.3rem",
	},
}))

const DateList = ({ date, setDate,day }) => {
	const classes = useStyles()

	 let data = parseInt(date.split("-")[2])
	const [dateArray, setDateArray] = useState([]);
	const [dayList, setDayList]=useState([]);


	const [active, setActive] = useState("5")
    useEffect(() => {
        function getDay(date) {
            // Sun Feb 28 2021 00:00:00 GMT+0530
            return parseInt(date.toString().split(' ')[2]);
        }
      let date1 = new Date();
        let lastDay = getDay(new Date(date1.getFullYear(), date1.getMonth() + 1, 0));
        let currentDay = getDay(new Date());
        let date_array = [];
		let date_arrayList=[];
        for (let i = currentDay; i <= lastDay; i++) {
			date_arrayList.push({date:new Date(`${i} ${month} ${year}`),day:moment(new Date(`${i} ${month} ${year}`)).format("dddd")});
            date_array.push(i);
        }
		const dd=date_arrayList.filter((item)=>item.day===day)
	    let date2 = getDay(new Date(dd[0].date));
		let date3 = new Date(dd[0].date);
		setDate(date3)
		setActive(date2)
		setDayList(date_arrayList);
        setDateArray(date_array);
    }, [setDayList]);

	const month = moment().format("dddd Do MMMM YYYY").split(" ")[2]
	const year = moment().format("dddd Do MMMM YYYY").split(" ")[3]

	const dateArr = [
		data,
		data + 1,
		data + 2,
		data + 3,
		data + 4,
		data + 5,
		data + 6,
		data + 7,
	]

	return (
		<Grid container direction="column">
			<Grid
				item
				spacing={1}
				className={classes.container}
				container
				xs={12}
				direction="row"
				alignItems="flex-start"
			>
				<Grid item xs={2}>
					<DateRangeIcon style={{ color: "white" }} />
				</Grid>
				<Grid xs={10} container className={classes.dateArr} item spacing={2}>
					{dateArray.map((d) => (
						<Grid item>
							<h3
								onClick={() => {
									setActive(d)
									setDate(`${d} ${month} ${year}`)
								}}
								className={active === d ? classes.date_active : classes.date}
							>
								{d}
							</h3>
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid item>
				<h3 style={{ marginTop: "0.5rem" }}>
					{active}th {month} {year}
				</h3>
			</Grid>
		</Grid>
	)
}

export default DateList
