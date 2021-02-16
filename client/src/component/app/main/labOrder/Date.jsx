import React, { useState } from "react"

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

const Date = ({ date }) => {
	const classes = useStyles()

	const data = parseInt(date.split("-")[2])
	console.log(JSON.parse(date))
	const year = parseInt(date.split("-")[0])
	let month = parseInt(date.split("-")[1])
	const [active, setActive] = useState(data)

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
				alignItems="center"
			>
				<Grid item xs={2}>
					<DateRangeIcon style={{ color: "white" }} />
				</Grid>
				<Grid xs={10} container className={classes.dateArr} item spacing={2}>
					{dateArr.map((d) => (
						<Grid item>
							<h3
								onClick={() => setActive(d)}
								className={active === d ? classes.date_active : classes.date}
							>
								{d}
							</h3>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Date
