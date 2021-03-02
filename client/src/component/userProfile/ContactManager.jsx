import React from "react"
import BusinessIcon from "@material-ui/icons/Business"
import { Divider, Grid, Paper } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	fontGrey: {
		color: "#404040",
		textAlign: "left",
	},
	container: {
		padding: "1rem 0.5rem",
		borderRadius: "10px",
	},

	header: {
		color: "#2BBEC8",
		fontWeight: "bolder",
		textAlign: "left",
	},
	add: {
		color: "#2BBEC8",
		fontWeight: "bolder",
		fontSize: "2rem",
	},
	fontPurple: {
		color: "#5C4DB1",
		fontWeight: "bold",
		textAlign: "right",
	},
}))

const Row = () => {
	const classes = useStyles()

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item alignItems="center" container spacing={1} xs={12}>
				<Grid item xs={3}>
					<h4>Jusu</h4>
				</Grid>
				<Grid item xs={3}>
					98708976542
				</Grid>
				<Grid item xs={3}>
					<h4 className={classes.fontPurple}>Edit</h4>
				</Grid>
				<Grid item xs={3}>
					<h4 className={classes.fontPurple}>Delete</h4>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
		</Grid>
	)
}

const ContactManager = () => {
	const classes = useStyles()

	return (
		<Paper elevation={4} className={classes.container}>
			<Grid container direction="column" spacing={2}>
				<Grid container direction="column" item spacing={1}>
					<Grid container item direction="row" justify="space-between">
						<Grid container xs={8} item alignItems="center">
							<Grid item xs={2}>
								<BusinessIcon className={classes.header} />
							</Grid>
							<Grid item xs={10}>
								<h4 className={classes.header}>Contact Manager</h4>
							</Grid>
						</Grid>
						<Grid
							container
							xs={2}
							spacing={1}
							alignItems="center"
							alignContent="flex-end"
						>
							<Grid item>
								<AddIcon className={classes.add} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
				</Grid>
				<Grid container item xs={12} spacing={2}>
					<Grid item xs={12}>
						<Row />
					</Grid>
					<Grid item xs={12}>
						<Row />
					</Grid>
					<Grid item xs={12}>
						<Row />
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default ContactManager
