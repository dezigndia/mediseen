import {
	Grid,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
	Paper,
	InputBase,
	Avatar,
} from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Address from "../pharmacyOrder/Address"
import { useSelector, useDispatch } from "react-redux"
import clsx from "clsx"
import { Link, Redirect, useLocation } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import { addLabAddress } from "../../../../store/lab/labActions"
import fetchCall from "../../../../fetchCall/fetchCall"
import { addPatient } from "../../../../store/patient/patientAction"

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//importing actions
import {
    setOnlinePayment,
    setPaymentOption,
    setUpiID,
    setBankIFSC,
    setBankAccountNumber,
    setCurrentVendor
} from '../../../../actions/action';

// const tests = [
// 	{
// 		name: "Full body Test",
// 		price: 300,
// 		fasting: true,
// 		desc: "Internal Medicine physician",
// 	},
// ]

const address = [
	{
		city: "Kolkata",
		state: "West Bengal",
		country: "India",
		pincode: 808989,
		area: "71/A Belgachia",
		payment: "UPI",
	},
	{
		city: "Kol",
		state: "West",
		country: "India",
		pincode: 808989,
		area: "71/A Kolakta",
		payment: "UPI",
	},
	{
		city: "Sunderban",
		state: "West Bengal",
		country: "India",
		pincode: 808989,
		area: "71/A Sunderban",
		payment: "UPI",
	},
]

const useStyles = makeStyles((theme) => ({
	container: {
		height: "550px",
		marginTop:"50px",
		overflowY: "scroll",
		padding: "0 0.5rem",
		flexWrap: "nowrap",
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
		width: "80%",
		padding: "0.5rem 2rem",
	},
	paper: {
		display: "flex",
		alignItems: "center",
		padding: "0.2rem 0.5rem",
		width: "100%",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: "1.2rem",
		padding: "0.3rem 0.2rem",
	},
	otp: {
		letterSpacing: 60,
		border: 0,
		backgroundPosition: "bottom",
		backgroundSize: "50px 1px",
		backgroundRepeat: "repeat-x",
		backgroundPositionX: 35,
		width: 200,
	},
	payment: {
		fontWeight: "bold",
		fontSize: "1.2rem",
		color: "black",
	},
	formControl: {
		minWidth: "12rem",
	},
	paper2: {
		// minWidth: "95vw",
		width:"100%",
		padding: "1rem",
		background: "#F9F9F9",
	},
}))

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const DocCheckout = (props) => {
	const classes = useStyles()

	const query = useQuery()

	const type = query.get("order")
	const [otp, setOtp] = useState(false)

	const [otpSuccess, setOtpSuccess] = useState(false)

	const [code, setCode] = useState("")

	const [name, setName] = useState("")
	const [num, setNumber] = useState("")

	const [payment, setPayment] = useState("COD")



	const doc = useSelector((state) => state.currentStore)
	const [selected, setSelected] = useState(null)
	const dispatch = useDispatch()

	useEffect(() => {
		const body = {
			phoneNumber: `+91${num}`,
			otp: code,
		}

		const patient = {
			name,
			num,
		}

		const verifyOtp = async () => {
			const data = await fetchCall(
				"user/general/otp/verify",
				"POST",
				null,
				body
			)

			if (data.sucess) {
				setOtpSuccess(true)
				dispatch(addPatient(patient))
			}
		}

		if (code.length === 4) {
			verifyOtp()
		}
	}, [code])

	const handleOtp = async () => {
		const body = {
			phoneNumber: `+91${num}`,
		}

		const data = await fetchCall("user/general/otp/get", "POST", null, body)


		if (data.success === true) {
			setOtp(true)
		}
	}

	return (
		<Grid
			container
			direction="column"
			className={classes.container}
			spacing={2}
		>
			{/* <Grid container item>
				{tests.map((test) => {
					return (
						<Grid item xs={12}>
							<Test
								name={test.name}
								price={test.price}
								fasting={test.fasting}
								desc={test.desc}
							/>
						</Grid>
					)
				})}
			</Grid> */}
			<Grid item xs={12}>
				<h3 style={{ textAlign: "center", width: "100%" }}>Confirm Details</h3>
			</Grid>
			<Grid item xs={12}>
				<Paper component="form" elevation={3} className={classes.paper}>
					<InputBase
						className={classes.input}
						placeholder="Patient's Name"
						inputProps={{ "aria-label": "search google maps" }}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper component="form" elevation={3} className={classes.paper}>
					<InputBase
						className={classes.input}
						placeholder="Patient's Phone Number"
						inputProps={{ "aria-label": "search google maps" }}
						value={num}
						type="number"
						onChange={(e) => setNumber(e.target.value)}
					/>
				</Paper>
			</Grid>
			{!otp ? (
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							handleOtp()
							setOtp(true)
						}}
					>
						Send
					</Button>
				</Grid>
			) : (
				<Grid container direction="column" item xs={12} spacing={2}>
					<Grid item>
						<h4 style={{ textAlign: "left" }}>Enter SMS Code /OTP</h4>
					</Grid>
					<Grid item>
						<Paper component="form" elevation={3} className={classes.paper}>
							<InputBase
								maxlength={4}
								onChange={(e) => setCode(e.target.value)}
								className={clsx(classes.input, classes.otp)}
								placeholder="0000"
								inputProps={{
									maxLength: 4,
								}}
							/>
						</Paper>
					</Grid>
				</Grid>
			)}
			<Grid item container alignItems="center" spacing={4}>
				{/* <Grid
					style={{ textAlign: "left" }}
					className={classes.bold}
					item
					xs={6}
				>
					Delivery Address
				</Grid>
				<Grid container item xs={6} alignItems="center">
					<Grid item className={classes.bold} style={{ fontSize: "1.2rem" }}>
						Add New
					</Grid>
					<Grid item>
						<Link to="/home/pharmacyOrder/add-address">
							<AddIcon style={{ fontSize: "3rem" }} />
						</Link>
					</Grid>
				</Grid>
				<Grid spacing={2} container item direction="column">
					{address.map((addr, ind) => (
						<Grid item>
							<Address
								setSelected={(value) => setSelected(value)}
								ad1={addr.area}
								ad2={`${addr.city}, ${addr.pincode}`}
								ind={ind}
								checked={selected === ind ? true : false}
							/>
						</Grid>
					))}
				</Grid> */}
				<Grid container item xs={12}>
					<Paper elevation={2} className={classes.paper2}>
						<Grid alignItems="center" container item xs={12}>
							<Grid item xs={4}>
								<Avatar src={doc.photo} />
							</Grid>
							<Grid item xs={4}>
								<h4>{doc.businessName}</h4>
							</Grid>
							<Grid item xs={4}>
								<h4
									style={{
										backgroundColor: "#5C4DB1",
										borderRadius: "10px",
										width: "50%",
										margin: "auto",
										color: "white",
										padding: "0.2rem 0",
									}}
								>
									{doc.clinic[0].fee}
								</h4>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid container item xs={12}>
					<Paper elevation={2} className={classes.paper2}>
						<Grid container item xs={12}>
							<Grid item xs={4}>
								<Avatar src={doc.clinic.photo} />
							</Grid>
							<Grid item xs={4}>
								<h4>{doc.clinic[0].name}</h4>
							</Grid>
							<Grid item xs={4}>
								<h4>{doc.clinic[0].address}</h4>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>

			<Grid
				container
				xs={12}
				justify="space-around"
				item
				alignItems="center"
				spacing={1}
				style={{ margin: "1rem 0" }}
			>
				<Grid item xs={4}>
					<InputLabel className={classes.payment} id="demo-simple-select-label">
						Payment
					</InputLabel>
				</Grid>
				<Grid item xs={8}>
					<FormControl className={classes.formControl}>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={payment}
						    onChange={(e) =>{
								setPayment(e.target.value)
								if(e.target.value==="COD")

							    props.setPaymentOption({cod:true, upi: false, bankTransfer: false })
								else
								props.setPaymentOption({cod:false, upi: true, bankTransfer: false })
								}}
						>
							<MenuItem value={"COD"}>COD</MenuItem>
							<MenuItem value={"UPI"}>UPI</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid item xs={12}>
			{otpSuccess ? 
				<Link to={`book?${type === "doc" ? "order=doc" : ""}`}>
					<Button
						onClick={() => dispatch(addLabAddress(address[selected]))}
						className={classes.btn}
						disabled={otpSuccess}
						style={{ backgroundColor: otpSuccess ? "#1DE8B6" : "grey" }}
					>
						BOOK
					</Button>
				</Link>:<Button
						className={classes.btn}
						disabled
						style={{ backgroundColor: otpSuccess ? "#1DE8B6" : "grey" }}
					>
						BOOK
					</Button>}
			</Grid>
		</Grid>
	)
}


const mapStatetoProps = state => ({
    onlinePayment: state.paymentDetails.onlinePaymentAvailable,
    paymentOption: state.paymentDetails.mode,
    upiID: state.paymentDetails.upiID,
    IFSC: state.paymentDetails.IFSC,
    accountNumber: state.paymentDetails.accountNumber,
    currentVendor: state.currentVendor,
    auth_token: state.token
});

const mapDispatchToProps = dispatch => ({
    setPaymentOption: ({cod= false, upi = false, bankTransfer = false }) => dispatch(setPaymentOption({cod , upi, bankTransfer })),
    setOnlinePayment: (option) => dispatch(setOnlinePayment(option)),
    setUpiID: (upi) => dispatch(setUpiID(upi)),
    setBankIFSC: (ifsc) => dispatch(setBankIFSC(ifsc)),
    setBankAccountNumber: (accountNo) => dispatch(setBankAccountNumber(accountNo)),
    setCurrentVendor: (payload) => dispatch(setCurrentVendor(payload))
});

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(DocCheckout));
