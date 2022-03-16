import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import {
	Grid,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import AddIcon from "@material-ui/icons/Add"
import Address from "./Address.jsx"
import { Link, Redirect, useLocation } from "react-router-dom"
import fetchCall from "../../../../fetchCall/fetchCall"
import { emptyCartProduct } from "../../../../store/cart/cartActions"
import fetchCallFile from "../../../../fetchCall/fetchCallFile.js"
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

const useStyles = makeStyles(() => ({
	container: {
		padding: "4rem 0.5rem",
		height: "auto",
		overflowY: "scroll",
	},
	divider: {
		height: "0.1rem",
		backgroundColor: "grey",
		width: "100%",
		margin: "0.5rem 0",
	},
	bold: {
		fontWeight: "bold",
	},
	formControl: {
		minWidth: "15rem",
	},
	payment: {
		fontWeight: "bold",
		fontSize: "1.2rem",
		color: "black",
	},
	btn: {
		padding: "0.5rem",
		width: "10rem",
		fontSize: "1.2rem",
		backgroundColor: "#1FE1B9",
	},
}))

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const PaymentPharm = (props) => {
	const classes = useStyles()
	const query = useQuery()

	const type = query.get("order")

	const [flag, setFlag] = useState(false)

	const image = useSelector((state) => state.prescription.image)

	const [payment, setPayment] = useState("COD")

	const token =
		useSelector((state) => state.token.token) ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwNDg2NGVlYzEwYWU4YzI4ZWMzM2Y5MSIsInBob25lIjoiKzkxODkxMDcxOTE0NyIsImFkZHJlc3MiOltdLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJfX3YiOjAsImlhdCI6MTYxNTM1NzE2Nn0.9CEx3xpRyG-J4dUtxUVBrRN8Eg7UOZ7zjaFTehhRBBw"

	const business = useSelector((state) => state.currentStore)

	const cart = useSelector((state) => state.cart)

	const products = cart.map((prod) => {
		return {
			productId: prod.item._id,
			name:prod.item.name,
			qty: prod.qty,
			sellingPrice:prod.item.sellingPrice,
		}
	})
	const user = useSelector((state) => state.user)


	const dispatch = useDispatch()

	let totalCost = 0

	cart.map((item) => {
		totalCost = item.item.sellingPrice * item.qty + totalCost
	})

	const [selected, setSelected] = useState(null)
    const [orderId ,setOrderId] =useState(null)
	const [placed, setPlaced] = useState(false)

	const placeOrder = async () => {
		// const img = Buffer.from(image)

		const img = await fetch(image)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "File name", { type: "image/jpeg" })
				return file
			})
		let form = new FormData()
		form.append("file", img)

		const res = await fetchCallFile("blob/upload", "POST", token, form, "file")



		const link = res.data.payload.location

		let body
		if (type === "pres") {
			body = {
				userId:user._id,
				patientName: user.name,
				mobileNumber: user.phone,
				userPhoneNumber:  user.phone,
				date: Date.now(),
				grandTotal: totalCost,
				paymentMode:props.paymentOption,
				address: address[selected],
				image_url: link,
				businessType: business.type,
				businessName: business.businessName,
				businessPhoneNumber: business.phone,
				isPrescription:true
			}
		} else {
			body = {
				userId:user._id,
				patientName: user.name,
				mobileNumber: user.phone,
				userPhoneNumber:  user.phone,
				date: Date.now(),
				products,
				grandTotal: totalCost,
				paymentMode:props.paymentOption,
				address: address[selected],
				businessType: business.type,
				businessName: business.businessName,
				businessPhoneNumber: business.phone,
			}
		}

		const data = await fetchCall("order", "POST", token, body)



		if (data.sucess === true) {
			setOrderId(data.data.payload.orderId);
			setPlaced(true)
			dispatch(emptyCartProduct())
			props.setPaymentOption({cod:true, upi: false, bankTransfer: false })
		}
	}

	if (placed) {
		return <Redirect to={`success/${orderId}`} />
	}

	return (
		<Grid
			container
			className={classes.container}
			direction="column"
			spacing={3}
		>
			<Grid container item>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left" }}
					item
					xs={6}
				>
						{/* Order NO {Date.now()} */}
						{moment(Date.now()).format("MMM Do YYYY")}
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item xs={3}
				>
					{/* {moment(Date.now()).format("MMM Do YYYY")} */}
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					xs={3}
				>
					{moment(Date.now()).format("LT")}
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid className={classes.bold} container item>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left" }}
					item
					xs={6}
				>
					Grand Total
				</Grid>
				<Grid
					className={classes.bold}
					item
					style={{ textAlign: "right" }}
					xs={6}
				>
					Rs. {totalCost}
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid
				style={{ color: "grey", textAlign: "left" }}
				item
				xs={12}

			>
				Details
			</Grid>
			<Grid container item>
				<Grid
					className={classes.bold}
					xs={6}
					style={{ textAlign: "left" }}
					item
				>
					{user.name ? user.name : "Yash Sharma"}
				</Grid>
				<Grid
					className={classes.bold}
					xs={6}
					style={{ textAlign: "right" }}
					item
				>
					{user.phone}
				</Grid>
			</Grid>
			<Grid item container alignItems="center">
				<Grid
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
					{user.address.map((addr, ind) => (
						<Grid item>
							<Address
								setSelected={(value) => setSelected(value)}
								ad1={addr.name}
								ad2={`${addr.area}, ${addr.pincode}`}
								ind={ind}
								checked={selected === ind ? true : false}
							/>
						</Grid>
					))}
				</Grid>
				<Grid
					container
					xs={12}
					justify="space-around"
					item
					alignItems="center"
					spacing={2}
					style={{ margin: "1rem 0" }}
				>
					<Grid item>
						<InputLabel
							className={classes.payment}
							id="demo-simple-select-label"
						>
							Payment
						</InputLabel>
					</Grid>
					<Grid item>
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
				{selected!=null ? 
					<Button
						onClick={placeOrder}
						className={classes.btn}
						variant="contained"
						color="primary"
					>
						Place Order
					</Button>:	<Button
						className={classes.btn}
						disabled
						variant="contained"
						color="primary"
					>
						Place Order
					</Button>}
				</Grid>
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

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(PaymentPharm));
