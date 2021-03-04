import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import moment from "moment"
import Date from "./Date"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Test from "./Test"
import Time from "./Time"
const useStyles = makeStyles(() => ({
	container: {
		padding: "1rem 2rem",
	},
	image: {
		padding: "1rem",
		border: "1px solid gray",
		borderRadius: "1rem",
		width: "5rem",
	},
	btn: {
		fontSize: "1.2rem",
		backgroundColor: "#29C17E",
		color: "white",
		padding: "0.5rem 2rem",
	},
}))

// const tests = [
// 	{
// 		name: "Full body Test",
// 		price: 300,
// 		fasting: true,
// 		desc: "Internal Medicine physician",
// 	},
// ]

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const LabBookTime = () => {
	const classes = useStyles()

	const [date, setDate] = useState("")

	const tests = useSelector((state) => state.cart)

	const query = useQuery()

	const type = query.get("order")

	return (
		<Grid container className={classes.container} spacing={5}>
			{tests.length > 0 && (
				<Grid container item>
					{tests.map((test) => {
						return (
							<Grid item xs={12}>
								<Test
									name={test.item.name}
									price={test.item.sellingPrice}
									fasting={test.item.fastingRequired}
									desc={test.desc}
								/>
							</Grid>
						)
					})}
				</Grid>
			)}
			<Grid xs={12} item>
				<Date
					date={JSON.stringify(moment()._d)}
					setDate={(value) => setDate(value)}
				/>
			</Grid>
			<Grid xs={12} item>
				<Time date={date} type={type} />
			</Grid>
		</Grid>
	)
}

export default LabBookTime
