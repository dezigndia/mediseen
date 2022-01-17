import React, { useEffect, useState,useCallback } from "react"
import clsx from "clsx"
import Header from "./Header"
import { Grid, Paper,Button } from "@material-ui/core"
import { makeStyles, } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import TypeCard from "./TypeCard"
import ContactManager from "./ContactManager"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import FacebookIcon from "@material-ui/icons/Facebook"
import TwitterIcon from "@material-ui/icons/Twitter"
import YouTubeIcon from "@material-ui/icons/YouTube"
import fetchCall from "../../fetchCall/fetchCall"
import { addUser } from "../../store/user/userAction"

const useStyles = makeStyles((theme) => ({
	fontGrey: {
		color: "#404040",
		textAlign: "left",
	},
	container: {
		padding: "1rem 1rem",
	},
	paper: {
		padding: "1rem 1rem",
	},
	fontGreen: {
		color: "#2CBEC8",
		fontWeight: "bold",
		margin: "0 0.1rem",
		textAlign: "right",
	},
	fb: {
		color: "#1677E5",
	},
	twitter: {
		color: "#00CBF5",
	},
	yt: {
		color: "#FF0000",
	},
}))

const Profile = ({ history }) => {
	const classes = useStyles()

	let token = useSelector((state) => state.token.token)
	const dispatch = useDispatch()

	const [appointments, setAppointments] = useState([])
	const [orders, setOrders] = useState([])
	const [pres, setPres] = useState([])

	const user = useSelector((state) => state.user)

	token = token
		? token
		: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwM2YzOTg1NTFkOTQ1MzFmMTEzMzM0YSIsImRlZmF1bHQiOltdLCJwaG9uZSI6Iis5MTg5MTA3MTkxNDciLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwiX192IjowLCJpYXQiOjE2MTUxMTcwODB9.gg2XoDzt9twPmWZ1esrrNaiMhdTRdLiMTuoqcrvzgGo"

	useEffect(() => {
		const fetchOrders = async () => {
			const data = await fetchCall("/order/all", "GET", token).then(
				(res) => res.data.payload
			)

			setOrders(data)
		}

		const fetchPres = async () => {
			const data = await fetchCall(
				"/order/all?isPrescription=true",
				"GET",
				token
			).then((res) => {
				console.log(res, "pres")
				return res.data.payload
			})

			setPres(data)
		}

		const fetchAppoint = async () => {
			const data = await fetchCall("appointment/user", "GET", token).then(
				(res) => res.data.payload
			)

			setAppointments(data)
			console.log(data)
		}

		const getUserInfo = async () => {
			const data = await fetchCall("user/get/info", "GET", token).then(
				(res) => res.data.payload
			)

			console.log(data, "user")

			dispatch(addUser(data))
		}

		fetchOrders()
		fetchAppoint()
		getUserInfo()
		fetchPres()
	}, [])

	const logout=useCallback(()=>{
        localStorage.removeItem('auth_token');
        history.push('/home');
    },[history]);

	return (
		<Grid container direction="column">
			<Grid item>
				{user.address !=undefined ?
					<Header
						image={user.photo && user.photo}
						name={user.name}
						phone={user.phone}
						address={`${user.address && user.address[0].area}, ${user.address && user.address[0].pincode
							}`}
					/>
					: <Header
						image={user.photo && user.photo}
						name={user.name && user.phone}
					/>}
			</Grid>
			<Grid
				container
				item
				direction="column"
				spacing={2}
				className={classes.container}
			>

<Grid item>
					<ContactManager address={user && user.address} />
				</Grid>
				<Grid item>
					<h3 className={classes.fontGrey}>My Records</h3>
				</Grid>
				<Grid item>
					<TypeCard orders={appointments} type="My Apointments" />
				</Grid>
				<Grid item>
					<TypeCard orders={pres} type="Prescriptions" />
				</Grid>
				<Grid item>
					<TypeCard orders={orders} type="Orders" />
				</Grid>
				{/* <Grid item xs={12}>
					<Paper elevation={3} className={classes.paper}>
						<Grid container alignItems="center" xs={12}>
							<Grid item xs={2}>
								<ExitToAppIcon className={classes.fontGreen} />
							</Grid>
							<Grid item xs={10}>
								<h3 className={classes.fontGreen}>Sign Out</h3>
							</Grid>
						</Grid>
					</Paper>
				</Grid> */}
					{/* modified by -  rakesh kumar pradhan */}
				<Grid item>
					<Paper elevation={3} className={classes.paper}>
						<Grid container alignItems="center" xs={12}>
							<Grid item xs={1}>
							
							</Grid>
							<Grid item xs={10} className={classes.fontGreen}  >
								<Button  style={{background:"revert"}} variant="variant"  className={classes.fontGreen} onClick={logout}><h3><ExitToAppIcon className={classes.fontGreen} /></h3>	Sign Out</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

			{/* modified by -  rakesh kumar pradhan */}
				<Grid item>
					<Paper elevation={3} className={classes.paper}>
						<Grid container alignItems="center" xs={12}>
							<Grid item xs={6}>
								<h3 className={classes.fontGreen} style={{textAlign:"left"}}>Social Media</h3>
							</Grid>
							<Grid item xs={2}>
								<FacebookIcon className={classes.fb} />
							</Grid>
							<Grid item xs={2}>
								<TwitterIcon className={classes.twitter} />
							</Grid>
							<Grid item xs={2}>
								<YouTubeIcon className={classes.yt} />
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Profile
