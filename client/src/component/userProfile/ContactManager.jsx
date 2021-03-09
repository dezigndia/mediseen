import React, { useState } from "react"
import BusinessIcon from "@material-ui/icons/Business"
import { Divider, Grid, Paper } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import AddContact from "./AddContact"
import { useSelector } from "react-redux"
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

const Row = ({ address }) => {
	const classes = useStyles()

	const [open, setOpen] = useState(false)

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item alignItems="center" container spacing={1} xs={12}>
				<Grid item xs={3}>
					<h4>{address.name}</h4>
				</Grid>
				<Grid item xs={3}>
					{address.phone}
				</Grid>
				<Grid item xs={3}>
					<h4 onClick={() => setOpen(true)} className={classes.fontPurple}>
						Edit
					</h4>
				</Grid>
				<Grid item xs={3}>
					<h4 className={classes.fontPurple}>Delete</h4>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<AddContact open={open} setOpen={(value) => setOpen(value)} />
		</Grid>
	)
}

const ContactManager = ({ address }) => {
	const classes = useStyles()

	console.log(address)

	let token = useSelector((state) => state.token.token)

	const [open, setOpen] = useState(false)

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
								<AddIcon
									onClick={() => setOpen(true)}
									className={classes.add}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
				</Grid>
				<Grid container item justify="center" xs={12} spacing={2}>
					{/* <Grid item xs={12}>
						<Row />
					</Grid>
					<Grid item xs={12}>
						<Row />
					</Grid>
					<Grid item xs={12}>
						<Row />
					</Grid> */}
					{address && address.length > 0 ? (
						address.map((add) => (
							<Grid item>
								<Row address={add} />
							</Grid>
						))
					) : (
						<Grid item>
							<h4>No address record.</h4>
						</Grid>
					)}
				</Grid>
			</Grid>
			<AddContact open={open} setOpen={(value) => setOpen(value)} />
		</Paper>
	)
}

export default ContactManager
