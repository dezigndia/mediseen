import React from "react"
import "./pharmacyOrder.styles.scss"
import { Grid } from "@material-ui/core"
import InfoCard from "./InfoCard"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Button from "@material-ui/core/Button"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	button: {
		backgroundColor: "#2AC0C7",
		width: "80%",
		padding: "0.5rem",
		fontSize: "1.3rem",
		color: "white",
		textTransform: "capitalize",
	},
}))

const PharmacyOrder = () => {
	const classes = useStyles()
	return (
		<Grid container direction="column" style={{ padding: "0 1rem" }}>
			<Grid item>
				<InfoCard
					name={"Rajam Medical Store"}
					delivery={500}
					cod={true}
					distance="2.5km"
					start={4}
					eos={22}
					address="73 Algate St. Bandra"
				/>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<ExitToAppIcon fontSize="2rem" />}
				>
					Upload Prescription
				</Button>
			</Grid>
		</Grid>
	)
}

export default PharmacyOrder
