import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./pharmacyOrder.styles.scss"
import { Grid, SwipeableDrawer } from "@material-ui/core"
import InfoCard from "./InfoCard"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Button from "@material-ui/core/Button"
import clsx from "clsx"
import { Link, useParams } from "react-router-dom"
import fetchCall from "../../../../fetchCall/fetchCall"
import { addCurrentStore } from "../../../../store/currentStore/currentStoreAction"
import CategoryChip from "./CategoryChip"
import { makeStyles } from "@material-ui/core/styles"
import ProductCard from "./ProductCard"
import UploadPres from "./UploadPres"
import Checkout from "./Checkout"

const useStyles = makeStyles((theme) => ({
	button: {
		backgroundImage: "linear-gradient(left,#2BBEC8, #1DE9B6)",
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
		textTransform: "capitalize",
	},
	menuItemActive: {
		backgroundColor: "#20E0B9",
		color: "white",
	},
	container: {
		height: "100%",
		marginTop: "50px",
		padding: "0 0.5rem",
		flexWrap: "nowrap",
	    overflow: 'auto'
	},
	swipe: {
		margin: "0 0.5rem",
		borderTopLeftRadius: "1rem",
		borderTopRightRadius: "1rem",
	},
	slider: {
		width: "100vw",
		display: "flex",
		overflowX: "scroll",
		flexWrap: "nowrap",
		paddingRight: "10rem",
		overflowY: "hidden",
	},
}))

// const categoryList = ["OTC", "Ayurvedic", "Surgical", "Booster"]

const PharmacyOrder = () => {
	const classes = useStyles()

	const cart = useSelector((state) => state.cart)
	const store = useSelector((state) => state.currentStore)

	const [upload, setUpload] = useState(false)
	const [file, setFile] = useState({})
	const [active, setActive] = useState("")
	const [pharmacy, setPharmacy] = useState()
	const [products, setProducts] = useState()
	const [categoryList, setCategoryList] = useState()
	const { pharmId } = useParams()

	const dispatch = useDispatch()

	useEffect(() => {
		if (pharmacy) {
			dispatch(addCurrentStore({ ...pharmacy }))
		}
	}, [pharmacy])

	useEffect(() => {
		const fetchPharm = async () => {
			const data = await fetchCall(`pharmacy/${pharmId}`, "GET").then(
				(res) => res.data.payload
			)
			setPharmacy(data)
		}

		const fetchProduct = async () => {
			const data = await fetchCall(
				`/product/find/all?itemType=product&ownerId=${pharmId}&limit=10`,
				"GET"
			).then((res) => res.data.payload)
			setProducts(data)
			let list = data.map((prod) => prod.category)
			list = Array.from(new Set(list))
			setCategoryList(list)
			setActive(list[0])
		}
		fetchPharm()
		fetchProduct()
	}, [])

	return (
		<div
			container
			direction="column"
			className={classes.container}
			spacing={1}
		>
			{cart[0] ? (
				<Grid item>
					<Link to="/home/pharmacyOrder/checkout">
						<Checkout  	name={pharmacy && pharmacy.businessName}
						delivery={pharmacy && pharmacy.deliveryDetails.deliveryCharges}
						cod={pharmacy && pharmacy.deliveryDetails.codAvailable}
						distance={pharmacy && pharmacy.deliveryDetails.deliveryDistance}
						star={4}
						eos={22}
						address={pharmacy && pharmacy.area}/>
					</Link>
				</Grid>
			) : (
				<Grid item>
					{/* <InfoCard
						name={pharmacy && pharmacy.businessName}
						delivery={pharmacy && pharmacy.deliveryDetails.deliveryCharges}
						cod={pharmacy && pharmacy.deliveryDetails.codAvailable}
						distance={pharmacy && pharmacy.deliveryDetails.deliveryDistance}
						star={4}
						eos={22}
						address={pharmacy && pharmacy.area}
					/> */}
				</Grid>
			)}
			<Grid
				style={{ textAlign: "right", fontSize: "1.2rem", fontWeight: "bold" }}
				item
				alignContent="flex-end"
			>
				<Link to="/home/pharmacyOrder/about">About</Link>
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
				
				{store!==undefined ?
				<UploadPres
						name={store.businessName}
						setUpload={(value) => setUpload(value)}
						setFile={(files) => setFile(files)}
					/>
				 :null}
				</SwipeableDrawer>
			</Grid>
			<Grid container justify="center" spacing={2}>
				<Grid item>
					<h2>To {pharmacy && pharmacy.businessName}</h2>
				</Grid>
				<Grid item container spacing={0} justify="center">
					{/* {categoryList &&
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
						))} */}
					<div className={classes.slider}>
						{categoryList &&
							categoryList.map((item) => (
								<div onClick={() => setActive(item)}>
									<CategoryChip name={item} active={active} />
								</div>
							))}
					</div>
				</Grid>
			</Grid>
			<Grid container item className={classes.slider}>
				{products &&
					products.map((product) => {
						if (product.category === active) {
							console.log(product)
							const cartQty = cart.filter(
								(prod) => prod.item._id === product._id
							)
							console.log(cartQty, "cartQty")
							return (
								// <ProductCard
								// 	ogPrice={product.mrp}
								// 	dcPrice={product.sellingPrice}
								// 	name={product.name}
								// 	picture={hand}
								// 	quantity={`${product.qty}`}
								// 	cart={cartQty[0] && cartQty[0].qty ? cartQty[0].qty : 0}
								// 	product={product}
								// />
								<ProductCard
									category="category"
									image={product.image}
									mrp={product.mrp}
									name={product.name}
									qty={product.qty}
									cart={cartQty[0] && cartQty[0].qty ? cartQty[0].qty : 0}
									sellingPrice={product.sellingPrice}
									businessType="pharmacy"
									product={product}
								/>
							)
						}
					})}
			</Grid>
		</div>
	)
}

export default PharmacyOrder
