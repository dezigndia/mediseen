import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Grid } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	header: {
		width: "100vw",
		backgroundColor: "#220555",
		height: "5rem",
		padding: "1rem",
	},
	avatar: {
		width: "4rem",
		height: "4rem",
	},
	fontWhite: {
		color: "white",
	},
}))

const BusinessHeader = ({ businessName,businessType, address ,stars }) => {
	const classes = useStyles()

	return (
		<div className={classes.header}>
			<Grid
				container
				direction="column"
				justify="space-evenly"
				alignItems="flex-start"
				spacing={2}
			>
			<Grid item>
					<h4 className={classes.fontWhite}>{businessName}</h4>
				</Grid>
				{/* <Grid item>
					<h4 className={classes.fontWhite}>{businessType}</h4>
				</Grid> */}
				<Grid item>
					<h5 className={classes.fontWhite}>{address}</h5>
				</Grid>
			</Grid>
		</div>
	)
}

export default BusinessHeader
