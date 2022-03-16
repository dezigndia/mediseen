import React, { useEffect, useState } from "react"
import { Link, Redirect, useLocation, useParams } from "react-router-dom"
import { Button, Grid } from "@material-ui/core"
import Business from "./Business"
import BusinessHeader from "./BusinessHeader"
import fetchCall from "../../fetchCall/fetchCall"
import { useSelector } from "react-redux"

const Prescription = (props) => {
	const { id } = useParams()
	let token = useSelector((state) => state.token.token)
	const cart = useSelector((state) => state.cart)
	const [order, setOrder] = useState([])
	token = token
		? token
		: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwM2YzOTg1NTFkOTQ1MzFmMTEzMzM0YSIsImRlZmF1bHQiOltdLCJwaG9uZSI6Iis5MTg5MTA3MTkxNDciLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwiX192IjowLCJpYXQiOjE2MTUxMTcwODB9.gg2XoDzt9twPmWZ1esrrNaiMhdTRdLiMTuoqcrvzgGo"

	useEffect(() => {
		const fetchOrder = async () => {
			const data = await fetchCall(`order/id/${id}`, "GET", token).then(
				(res) => res.data.payload
			)
			setOrder(data)
		}
		fetchOrder()
	}, [])

	const back = (e) => {
        e.preventDefault();
        props.history.goBack();
    }
	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<BusinessHeader 	businessName={order.businessName}/>
			</Grid>
			{/* <Grid item xs={12}>
				<Business
					name={order.businessName}
					price={300}
					time={"6pm-10pm"}
					desc={"Internal Medicine"}
				/>
			</Grid> */}
			<Grid xs={12}>
				<img
					style={{ width: "100vw" }}
					//src="https://www.rbcinsurance.com/group-benefits/_assets-custom/images/prescription-drug-sample-receipt-en.jpg"
					src={order.image_url}
				/>
			</Grid>
			<Grid container direction="row" xs={12} justify="center" spacing={1}>
				<Grid item>
					<Button onClick={back}
						style={{
							backgroundColor: "#C8C8C8",
							color: "white",
							padding: "0.5rem 1rem",
							fontSize: "1.1rem",
						}}
					>
						Back
					</Button>
				</Grid>
				<Grid item>
				<Link to={`/user-profile/order-place/${id}`}>
					<Button
						style={{
							backgroundColor: "#22D8BC",
							color: "white",
							padding: "0.5rem 1rem",
							fontSize: "1.1rem",
						}}
					>
						Re-order
					</Button>
					</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Prescription
