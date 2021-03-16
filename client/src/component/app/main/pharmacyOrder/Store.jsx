import React, { useState, useEffect } from "react"
import { Grid, Paper } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import InfoCard from "./InfoCard"
import CategoryChip from "./CategoryChip"

import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { Link, useParams } from "react-router-dom"
import fetchCall from "../../../../fetchCall/fetchCall"
import { makeStyles } from "@material-ui/core/styles"
import ProductCard from "./ProductCard"
import Checkout from "./Checkout"

//importing from reusabonents
import ProductAndtestListing from "../../../reusableComponent/../reusableComponent/productAndTestListing/productAndTestListing.component"

const useStyles = makeStyles((theme) => ({
	slider: {
		width: "100vw",
		display: "flex",
		overflowX: "scroll",
		flexWrap: "nowrap",
		paddingRight: "10rem",
		overflowY: "hidden",
	},
	paper: {
		display: "flex",
		alignItems: "center",
		padding: "0.2rem 0.5rem",
		width: "80vw",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: "1.2rem",
	},
	iconButton: {
		padding: 10,
		color: "#23D6BD",
	},
}))

const Store = () => {
	const classes = useStyles()
	const cart = useSelector((state) => state.cart)
	const pharmId = useSelector((state) => state.currentStore._id)
	const [upload, setUpload] = useState(false)
	const [file, setFile] = useState({})
	const [active, setActive] = useState("")
	const [pharmacy, setPharmacy] = useState()
	const [products, setProducts] = useState()
	const [categoryList, setCategoryList] = useState()

	const dispatch = useDispatch()

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
		<Grid container direction="column" alignItems="center" spacing={2}>
			<Grid item>
				{cart[0] ? (
					<Grid item>
						<Link to="/home/pharmacyOrder/checkout">
							<Checkout />
						</Link>
					</Grid>
				) : (
					<InfoCard
						name={"Rajam Medical Store"}
						delivery={500}
						cod={true}
						distance="2.5km"
						start={4}
						eos={22}
						address="73 Algate St. Bandra"
					/>
				)}
			</Grid>
			<Grid item>
				<div className={classes.slider}>
					{categoryList &&
						categoryList.map((item) => (
							<div onClick={() => setActive(item)}>
								<CategoryChip name={item} active={active} />
							</div>
						))}
				</div>
			</Grid>
			<Grid item>
				<Paper component="form" elevation={3} className={classes.paper}>
					<InputBase
						className={classes.input}
						placeholder="WBC, RBC, Fasting Sugar, Diabetic Care..."
						inputProps={{ "aria-label": "search google maps" }}
					/>
					<IconButton
						type="submit"
						className={classes.iconButton}
						aria-label="search"
					>
						<SearchIcon />
					</IconButton>
				</Paper>
			</Grid>
			<div item>
				<div className={classes.slider}>
					{/* {categoryList &&
						categoryList.map((item) => (
							<div style={{ margin: "0.5rem" }}>
								<ProductCard
								ogPrice="45"
								dcPrice="43"
								name={item}
								picture="https://images-na.ssl-images-amazon.com/images/I/61VdTZiUs2L._SL1000_.jpg"
								quantity="100gm"
							/>
								<ProductAndtestListing
									category="category"
									image="https://images-na.ssl-images-amazon.com/images/I/61VdTZiUs2L._SL1000_.jpg"
									mrp="100"
									name={item}
									qty="10"
									sellingPrice="90"
								/>
							</div>
						))} */}
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
				</div>
			</div>
		</Grid>
	)
}

export default Store
