import React, { useState, useEffect } from "react"
import BusinessIcon from "@material-ui/icons/Business"
import { Divider, Grid, Paper } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import AddContact from "./AddContact"
import { useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import fetchCall from "../../fetchCall/fetchCall"
import NotificationContainer from "react-notifications/lib/NotificationContainer"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
	fontGrey: {
		color: "#404040",
		textAlign: "left",
	},
	container: {
		padding: "1.0rem",
		borderRadius: "10px",
		textAlign: "left",
		textOverflow: "ellipsis"
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

const Row = ({ address, index, setActive }) => {
	const classes = useStyles()

	const [open, setOpen] = useState(false)

	return (
		// <Grid container spacing={2}>
		// 	<Grid item  xs={12}>
		// 		<Grid item>
		// 			<h4>{address.name}</h4>
		// 		</Grid>
		// 		{/* <Grid style={{ fontWeight: "bold" }} item xs={3}>
		// 			{address.number}
		// 		</Grid> */}
		// 		<Grid item>
		// 			<h4 onClick={() => setOpen(true)} className={classes.fontPurple}>
		// 			<EditIcon/>
		// 			</h4>
		// 		</Grid>
		// 		<Grid item >
		// 			<h4 onClick={() => setActive(index)} className={classes.fontPurple}>
		// 			<i className="fas fa-trash-alt"></i>
		// 			<DeleteIcon/>
		// 			</h4>
		// 		</Grid>
		// 	</Grid>
		// 	<Grid item xs={12}>
		// 		<Divider />
		// 	</Grid>
		// 	<AddContact
		// 		open={open}
		// 		address={address}
		// 		setOpen={(value) => setOpen(value)}
		// 		ind={index}
		// 	/>
		// </Grid>

		<Grid
		container
		// direction="column"
		spacing={1}
		className={classes.container}
	>
		<Grid item alignItems="center" container spacing={4}>
			<Grid item xs={5} style={{
overflow: "hidden",
    textOverflow: "ellipsis",
whiteSpace: "nowrap"}}>
				<h2 style={{ fontSize: "0.9rem" }}>{address.name}</h2>
			</Grid>
			<Grid item xs={4}>
				<h5 style={{ fontSize: "0.9rem" }}>{address.number}</h5>
			</Grid>
			<Grid item xs={1}>
			<h4 onClick={() => setOpen(true)} className={classes.fontPurple}>
			<EditIcon/>
			</h4>
			</Grid>
			<Grid item xs={1}>
					<h4 onClick={() => setActive(index)} className={classes.fontPurple}>
					<i className="fas fa-trash-alt"></i>
		 			<DeleteIcon/>
				</h4>
			</Grid>
		</Grid>
		<Grid item xs={12}>
			<Divider />
			<AddContact
				open={open}
				address={address}
				setOpen={(value) => setOpen(value)}
				ind={index}
			/>
		</Grid>
	</Grid>
	)
}

const ContactManager = ({ address }) => {
	const classes = useStyles()

	console.log(address)

	let token =
		useSelector((state) => state.token.token) ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwM2YzOTg1NTFkOTQ1MzFmMTEzMzM0YSIsImRlZmF1bHQiOltdLCJwaG9uZSI6Iis5MTg5MTA3MTkxNDciLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwiX192IjowLCJpYXQiOjE2MTUxMTcwODB9.gg2XoDzt9twPmWZ1esrrNaiMhdTRdLiMTuoqcrvzgGo"

	const [open, setOpen] = useState(false)

	const [active, setActive] = useState(null)

	console.log(active)

	useEffect(() => {
		const updateAddress = async () => {
			const addressToDel = address[active]

			address = address.filter((add) => add._id !== addressToDel._id)
			const body = {
				address,
			}
			const data = await fetchCall("user", "PUT", token, body)
		}
		if (active !== null) {
			updateAddress()
		}
	}, [active])

	return (
		<Paper elevation={4} className={classes.container}>
		<NotificationContainer/>
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
				<Grid container item xs={12} spacing={2}>
		
					{address && address.length > 0 ? (
						address.map((add, ind) => {
							return (
								<Grid item>
									<Row
										address={add}
										index={ind}
										setActive={(val) => setActive(val)}
									/>
								</Grid>
							)
						})
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
