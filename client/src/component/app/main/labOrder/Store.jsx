import React, { useState, useEffect } from "react"
import { Grid, Paper } from "@material-ui/core"
import StoreInfoCard from "./StoreInfoCard"
import CategoryChip from "./CategoryChip"
import fetchCall from "../../../../fetchCall/fetchCall"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import ProductCard from "./ProductCard"
import Checkout from "../pharmacyOrder/Checkout"

//importing reusable components
import ProductAndTestListing from "../../../reusableComponent/productAndTestListing/productAndTestListing.component"

const useStyles = makeStyles((theme) => ({
	slider: {
		width: "100vw",
		display: "flex",
		overflowX: "scroll",
		flexWrap: "nowrap",
		paddingRight: "10rem",
		overflowY: "hidden",
		alignItems: "center",
		justifyContent: "center",
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

const category = ["OTC", "Ayurveda", "Booster", "Nutrition", "Vitamin"]

const Store = () => {
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
				`product/find/all?ownerId=${labId}`,
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
		<Grid container direction="column" alignItems="center" spacing={2}>
			<Grid item>
				{/* <StoreInfoCard
					name={lab && lab.businessName}
					// distance="2.5km"
					// start={4}
					// eos={22}
					address={lab && lab.area + lab.city}
				/> */}
				<Grid item>
					{cart[0] ? (
						<Link to="/home/labOrder/booking-time">
							<Checkout />
						</Link>
					) : (
						<StoreInfoCard
							name={lab && lab.businessName}
							// distance="2.5km"
							// start={4}
							// eos={22}
							address={lab && lab.area + lab.city}
						/>
					)}
				</Grid>
			</Grid>
			<Grid container item className={classes.slider}>
				{categoryList &&
					categoryList.map((item) => (
						<div onClick={() => setActive(item)}>
							<CategoryChip name={item} active={active} />
						</div>
					))}
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
			<Grid item>
				<div className={classes.slider}>
					{products &&
						products.map((product) => {
							if (product.category === active) {
								console.log(product)
								const cartQty = cart.filter(
									(prod) => prod.item._id === product._id
								)
								return (
									<ProductCard
										category="category"
										image={product.image}
										mrp={product.mrp}
										name={product.name}
										qty={product.qty}
										cart={cartQty[0] && cartQty[0].qty ? cartQty[0].qty : 0}
										sellingPrice={product.sellingPrice}
										businessType="pathology"
										product={product}
									/>
								)
							}
						})}
				</div>
			</Grid>
		</Grid>
	)
}

export default Store

// {
// 	category.map((item) => (
// 		<div style={{ margin: "0.5rem" }}>
// 			{/*<ProductCard
// 								ogPrice="45"
// 								dcPrice="43"
// 								name={item}
// 								picture="https://images-na.ssl-images-amazon.com/images/I/61VdTZiUs2L._SL1000_.jpg"
// 								quantity="100gm"
// 							/>*/}
// 			<ProductCard
// 				category="category"
// 				image="https://images-na.ssl-images-amazon.com/images/I/61VdTZiUs2L._SL1000_.jpg"
// 				mrp="100"
// 				name={item}
// 				qty="10"
// 				sellingPrice="90"
// 				businessType="pathology"
// 			/>
// 		</div>
// 	))
// }
