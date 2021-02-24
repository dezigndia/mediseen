import { Grid, Paper } from "@material-ui/core"
import React from "react"
import wp from "../../../../assets/icons/whatsapp.svg"
import pin from "../../../../assets/icons/pin.svg"
import ReactStars from "react-stars"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	wpIcon: {
		width: "1.5rem",
		height: "1.5rem",
	},
	pinIcon: {
		width: "1.5rem",
		height: "1.5rem",
	},
	paper: {
		width: "100%",
		margin: "1rem 0",
		padding: "1rem",
	},
	starts: {
		marginBottom: "02rem",
	},
	redHead: {
		color: "#E48E86",
		textAlign: "center",
	},
	pharmName: {
		textAlign: "left",
		marginLeft: "0.5rem",
		fontWeight: "800",
	},
}))

const InfoCard = ({ name, delivery, cod, distance, start, eos, address }) => {
	const classes = useStyles()

	return (
		<Grid container direction="column" spacing={2}>
			<Grid container item xs={12}>
				<Paper elevation={4} className={classes.paper}>
					<Grid container spacing={2} justify="space-between" xs={12}>
						<Grid container item spacing={2} justify="space-between" xs={12}>
							<Grid item xs={1}>
								<img className={classes.wpIcon} src={wp} alt="wp icon" />
							</Grid>
							<Grid item xs={11}>
								<h2 className={classes.pharmName}>{name}</h2>
							</Grid>
						</Grid>
					</Grid>
					<Grid container item alignItems="center" spacing={2}>
						<Grid item container xs={8}>
							<Grid item justify="flex-end" xs={12}>
								<h3>{address}</h3>
							</Grid>
						</Grid>
						<Grid item container alignItems="flex-end" xs={4}>
							<Grid item>
								<h3>Verifed</h3>
							</Grid>
							<Grid item>
								<ReactStars
									count={5}
									size={20}
									edit={false}
									color2={"#FFFFFF"}
									color1={"#FFC83D"}
								/>
							</Grid>
							<Grid
								container
								spacing={4}
								direction="row"
								item
								alignItems="flex-start"
							>
								<Grid container item xs={3}>
									<img className={classes.pinIcon} src={pin} alt="location" />
								</Grid>
								<Grid item xs={4}>
									<h3>{distance}</h3>
								</Grid>
							</Grid>
						</Grid>
						<Grid container item>
							<Grid container direction="column" item xs={5}>
								<Grid item xs={12} className={classes.redHead}>
									Free Delivery on
								</Grid>
								<Grid item xs={12}>
									{delivery}
								</Grid>
							</Grid>
							<Grid container item xs={4}>
								<Grid justify="center" className={classes.redHead} xs={12}>
									COD/UPI
								</Grid>
								<Grid item xs={12}>
									{cod ? "Yes" : "No"}
								</Grid>
							</Grid>
							<Grid item xs={3}>
								Closes by {eos < 12 ? `${eos} am` : `${eos - 12} pm`}
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default InfoCard
