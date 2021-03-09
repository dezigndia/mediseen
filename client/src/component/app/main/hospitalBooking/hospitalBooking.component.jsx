import React from "react"
import "./hospitalBooking.styles.scss"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Container, Grid } from "@material-ui/core"

const HospitalBooking = () => {
	return (
		<Container>
			<Grid container direction="column">
				<Grid item>
					<Paper elevation={3}>
						<h1>Hii</h1>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default HospitalBooking
