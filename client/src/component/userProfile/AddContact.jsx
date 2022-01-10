import React, { useState, useEffect } from "react"
import { Button, Grid, Paper } from "@material-ui/core"
import { useSpring, animated } from "react-spring/web.cjs"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Modal from "@material-ui/core/Modal"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { useSelector } from "react-redux"
import fetchCall from "../../fetchCall/fetchCall"
const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	paper: {
		backgroundColor: "white",
		padding: "2rem 1rem",
		width: "95vw",
		maxWidth: "50rem",
	},
	colorBlue: {
		color: "blue",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: "1.2rem",
		width: "100%",
	},
	search: {
		display: "flex",
		alignItems: "center",
		padding: "0.2rem 0.5rem",
		width: "100%",
	},
}))

const Fade = React.forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter()
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited()
			}
		},
	})
	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	)
})

Fade.propTypes = {
	children: PropTypes.element,
	in: PropTypes.bool.isRequired,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
}

const AddContact = ({ open, setOpen, address, ind }) => {
	const classes = useStyles()
	let token = useSelector((state) => state.token.token)

	let userAddress = useSelector((state) =>state.user.address )



	const [name, setName] = useState("")
	const [mobile, setMobile] = useState("")
	const [add, setAdd] = useState("")
	const [pincode, setPincode] = useState(0)

	useEffect(() => {
		if (address) {
			setName(address.name)
			setMobile(address.number)
			setPincode(address.pincode)
			setAdd(address.area)
		}
	}, [])

	token = token
		? token
		: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwM2YzOTg1NTFkOTQ1MzFmMTEzMzM0YSIsImRlZmF1bHQiOltdLCJwaG9uZSI6Iis5MTg5MTA3MTkxNDciLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwiX192IjowLCJpYXQiOjE2MTUxMTcwODB9.gg2XoDzt9twPmWZ1esrrNaiMhdTRdLiMTuoqcrvzgGo"

	const handleSubmit = async () => {
		const addr = 
			{
				name,
				number: mobile,
				area: add,
				pincode,
			}
		if (userAddress.length > 0) {
			userAddress[ind]= addr
		} else {
			userAddress = [...addr]
		
		}

		const body = { address: userAddress }
		const data = await fetchCall("user", "PUT", token, body)
		if (data.data.status) {
			setOpen(false)
			NotificationManager.success('success message', 'Updated!', 3000, () => {
			  });
		}
	}

	return (
		<Modal
			onClose={() => setOpen(false)}
			className={classes.modal}
			open={open}
			closeAfterTransition={true}
		>
			<Fade in={open}>
				<Paper className={classes.paper} elevation={3}>
					<Grid
						container
						alignItems="center"
						justify="center"
						spacing={2}
						xs={12}
					>
						<Grid item xs={12}>
							<h3 style={{ textAlign: "center" }}>Add/Edit Contact</h3>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase
									value={name}
									onChange={(e) => setName(e.target.value)}
									className={classes.input}
									placeholder="Name"
								/>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase
									onChange={(e) => setMobile(e.target.value)}
									className={classes.input}
									placeholder="Mobile"
									value={mobile}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase
									onChange={(e) => setAdd(e.target.value)}
									className={classes.input}
									placeholder="Address"
									value={add}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase
									onChange={(e) => setPincode(e.target.value)}
									className={classes.input}
									placeholder="Pincode"
									value={pincode}
								/>
							</Paper>
						</Grid>
						<Grid item>
							<Button
								onClick={handleSubmit}
								style={{ backgroundColor: "#2BBEC8", color: "white" }}
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		</Modal>
	)
}

export default AddContact
