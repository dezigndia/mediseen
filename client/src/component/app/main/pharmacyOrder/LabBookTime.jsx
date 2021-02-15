import React from "react"
import { Grid } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import Test from "./Test"
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

const tests = [
	{
		name: "Full body Test",
		price: 300,
		fasting: true,
		desc: "Internal Medicine physician",
	},
]

const LabBookTime = () => {
	const classes = useStyles()

	return (
		<Grid container className={classes.container}>
			<Grid container item>
				{tests.map((test) => {
					return (
						<Test
							name={test.name}
							price={test.price}
							fasting={test.fasting}
							desc={test.desc}
						/>
					)
				})}
			</Grid>
		</Grid>
	)
}

export default LabBookTime
