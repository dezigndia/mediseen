import React, { useState, useEffect } from "react"
import "./labOrder.styles.scss"
import { makeStyles } from "@material-ui/core/styles"
import { Link, useParams } from "react-router-dom"
import { Grid, SwipeableDrawer, Button } from "@material-ui/core"
import InfoCard from "./InfoCard"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import clsx from "clsx"
import UploadPres from "./UploadPres"
import ProductCard from "./ProductCard"
import hand from "./Hand.jpg"
import { useSelector, useDispatch } from "react-redux"
import Checkout from "../pharmacyOrder/Checkout"

import fetchCall from "../../../../fetchCall/fetchCall"

const useStyles = makeStyles(() => ({
	button: {
		backgroundColor: "#2AC0C7",
		width: "80%",
		padding: "0.5rem",
		fontSize: "1.3rem",
		color: "white",
		textTransform: "capitalize",
	},
	menuItem: {
		margin: "0.3rem",
		border: "0.5px solid black",
		padding: "0.5rem",
		borderRadius: "30px",
	},
	menuItemActive: {
		backgroundColor: "#20E0B9",
		color: "white",
	},
	container: {
		height: "100%",
		overflowY: "scroll",
		padding: "0 0.5rem",
		flexWrap: "nowrap",
	},
	swipe: {
		margin: "0 0.5rem",
		borderTopLeftRadius: "1rem",
		borderTopRightRadius: "1rem",
	},
}))

const PharmacyOrder = () => {
	const classes = useStyles()

	const [lab, setLab] = useState()
	const cart = useSelector((state) => state.cart)

	const [upload, setUpload] = useState(false)
	const [file, setFile] = useState({})
	const [active, setActive] = useState()
	const [products, setProducts] = useState()
	const [categoryList, setCategoryList] = useState()
	const { labId } = useParams()

	useEffect(() => {
		const fetchLab = async () => {
			const data = await fetchCall(`pharmacy/${labId}`, "GET").then(
				(res) => res.data.payload
			)
			setLab(data)
		}
		const fetchProduct = async () => {
			const data = await fetchCall(
				`test/find/all?ownerId=${labId}`,
				"GET"
			).then((res) => res.data.payload)

			setProducts(data)
			let list = data.map((prod) => prod.category)
			list = Array.from(new Set(list))
			setCategoryList(list)
			setActive(list[0])
		}
		fetchLab()
		fetchProduct()
	}, [])

	return (
		<Grid
			container
			direction="column"
			className={classes.container}
			spacing={1}
		>
			<Grid item>
				{cart[0] ? (
					<Link to="/home/labOrder/booking-time">
						<Checkout />
					</Link>
				) : (
					<InfoCard
						name={lab && lab.businessName}
						delivery={
							lab && lab.collections.hardCopyReportDeliveryCharges
								? lab.collections.hardCopyReportDeliveryCharges
								: 0
						}
						cod={lab && lab.collections.codAvailable}
						distance="2.5km"
						start={4}
						eos={22}
						address={lab && lab.area}
					/>
				)}
			</Grid>
			<Grid
				style={{ textAlign: "right", fontSize: "1.2rem", fontWeight: "bold" }}
				item
				alignContent="flex-end"
			>
				<Link to="/home/labOrder/about">About</Link>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<ExitToAppIcon fontSize="2rem" />}
					onClick={() => setUpload(true)}
				>
					Upload Prescription
				</Button>
			</Grid>
			<Grid item>
				<SwipeableDrawer
					anchor="bottom"
					open={upload}
					classes={{
						paper: classes.swipe,
					}}
				>
					<UploadPres
						name={lab && lab.businessName}
						setUpload={(value) => setUpload(value)}
						setFile={(files) => setFile(files)}
					/>
				</SwipeableDrawer>
			</Grid>
			<Grid container justify="center" spacing={2}>
				<Grid item>
					<h2>To {lab && lab.businessName}</h2>
				</Grid>
				<Grid item container spacing={0} justify="center">
					{categoryList &&
						categoryList.map((category) => (
							<Grid
								onClick={() => setActive(`${category}`)}
								className={
									active === category
										? clsx(classes.menuItem, classes.menuItemActive)
										: classes.menuItem
								}
								key={Math.random()}
							>
								{category}
							</Grid>
						))}
				</Grid>
			</Grid>
			<Grid container item>
				{products &&
					products.map((product) => {
						if (product.category === active) {
							const cartQty = cart.filter((prod) => prod.id === product.id)
							console.log(cartQty, "cartQty")
							return (
								<ProductCard
									ogPrice={product.mrp}
									dcPrice={product.sellingPrice}
									name={product.name}
									picture={hand}
									quantity={`${product.qty}`}
									cart={cartQty[0] && cartQty[0].qty ? cartQty[0].qty : 0}
									product={product}
								/>
							)
						}
					})}
			</Grid>
		</Grid>
	)
}

export default PharmacyOrder
