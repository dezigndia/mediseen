import React, { useEffect, useState } from "react"
import { Grid, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ItemTable from "./ItemTable"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Business from "./Business"
import BusinessHeader from "./BusinessHeader"
import clsx from "clsx"
import { useParams } from "react-router-dom"
import fetchCall from "../../fetchCall/fetchCall"

const useStyles = makeStyles(() => ({
	container: {
		padding: "1rem 1rem",
		height: "auto",
	},
	payment: {
		color: "red",
		fontWeight: "bold",
	},
	bold: {
		fontWeight: "bold",
	},
	divider: {
		height: 1,
		backgroundColor: "grey",
		width: "100%",
	},
	btn: {
		padding: "0.5rem",
		width: "8rem",
		fontSize: "1.2rem",
	},
	padding: {
		paddingRight: "1rem",
	},
}))

const Order = () => {
	const classes = useStyles()
	const { id } = useParams()
	let token = useSelector((state) => state.token.token)
	token = token
		? token
		: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwM2YzOTg1NTFkOTQ1MzFmMTEzMzM0YSIsImRlZmF1bHQiOltdLCJwaG9uZSI6Iis5MTg5MTA3MTkxNDciLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwiX192IjowLCJpYXQiOjE2MTUxMTcwODB9.gg2XoDzt9twPmWZ1esrrNaiMhdTRdLiMTuoqcrvzgGo"

	const [order, setOrder] = useState({})

	useEffect(() => {
		const fetchOrder = async () => {
			const data = await fetchCall(`order/id/${id}`, "GET", token).then(
				(res) => res.data.payload
			)
			setOrder(data)
			console.log(data)
		}
		fetchOrder()
	}, [])

	return (
		<Grid container spacing={2}>
			<Grid item>
				<BusinessHeader />
			</Grid>
			<Grid container className={classes.container} item xs={12}>
				<Grid
					item
					className={clsx(classes.bold, classes.padding)}
					xs={6}
					style={{ textAlign: "left" }}
				>
					Order NO 23456
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					xs={3}
				>
					26/07/20
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					xs={3}
				>
					2:40 AM
				</Grid>
			</Grid>
			<Grid container item>
				<Grid
					item
					xs={4}
					className={classes.payment}
					style={{ textAlign: "left" }}
				>
					COD
				</Grid>
				<Grid item xs={8} style={{ textAlign: "right", color: "gray" }}>
					Est Time Delivery : 23 Mins
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid item>
				<ItemTable cart={order && order.products} />
			</Grid>
			<Grid container item>
				<Grid style={{ textAlign: "left", color: "gray" }} xs={6} item>
					Total Items : 10
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					xs={6}
					item
				>
					Rs. 100
				</Grid>
			</Grid>
			<Grid container item>
				<Grid style={{ textAlign: "left", color: "gray" }} xs={6} item>
					Delivery Charges
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					xs={6}
					item
				>
					Rs. 30
				</Grid>
			</Grid>
			<Grid container item>
				<Grid
					style={{ textAlign: "left" }}
					className={classes.bold}
					xs={6}
					item
				>
					Grand Total
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					xs={6}
					item
				>
					Rs. 130
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid container item>
				<Grid style={{ textAlign: "left", padding: "0.2rem 0" }} item xs={12}>
					Details
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left", padding: "0.5rem 0" }}
					item
					xs={6}
				>
					Sunjoy Ghosh
				</Grid>
				<Grid
					className={classes.bold}
					item
					style={{ textAlign: "right", padding: "0.5rem 0" }}
					xs={6}
				>
					+91 976976868328
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Button
						className={classes.btn}
						style={{ backgroundColor: "grey" }}
						variant="contained"
						color="primary"
					>
						Back
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Link to="/home/pharmacyOrder/payment">
						<Button
							style={{ backgroundColor: "#1FE0B9" }}
							className={classes.btn}
							variant="contained"
							color="primary"
						>
							Re-Order
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Order
