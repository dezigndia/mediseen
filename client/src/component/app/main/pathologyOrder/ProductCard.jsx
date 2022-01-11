// import React from "react"
// import clsx from "clsx"
// import { useSelector, useDispatch } from "react-redux"

// import { makeStyles } from "@material-ui/core/styles"
// import { Button, Grid, Paper } from "@material-ui/core"
// import AddIcon from "@material-ui/icons/Add"
// import RemoveIcon from "@material-ui/icons/Remove"

// import tag from "../../../../assets/icons/tag.svg"
// import {
// 	addCartProduct,
// 	removeCartProduct,
// } from "../../../../store/cart/cartActions"

// const useStyles = makeStyles(() => ({
// 	container: {
// 		position: "relative",
// 	},
// 	paper: {
// 		position: "relative",
// 		height: "45vh",
// 		width: "55vw",
// 		padding: "0.5rem 0",
// 		maxWidth: "25rem",
// 	},
// 	quantity: {
// 		backgroundColor: "#D8DAE0",
// 		fontWeight: "bold",
// 		width: "30%",
// 		padding: "0.3rem 0",
// 		position: "absolute",
// 		top: "0.5rem",
// 	},
// 	tag: {
// 		transform: "rotate(-90deg)",
// 		width: "30%",
// 		minWidth: "5rem",
// 		maxWidth: "5rem",
// 		position: "absolute",
// 		right: 0,
// 	},
// 	discount: {
// 		position: "absolute",
// 		right: "0.5rem",
// 		top: "1.8rem",
// 		fontSize: "150%",
// 	},
// 	picture: {
// 		width: "50%",
// 		minWidth: "10rem",
// 		height: "80%",
// 		margin: "1.5rem 0.5rem",
// 	},
// 	name: {
// 		fontSize: "1.5rem",
// 		width: "100%",
// 		textAlign: "center",
// 		margin: "1rem 0",
// 		fontWeight: "800",
// 	},
// 	price: {
// 		fontSize: "1.5rem",
// 	},
// 	add: {
// 		backgroundColor: "#38C180",
// 		position: "absolute",
// 		top: "95%",
// 		left: 0,
// 		right: 0,
// 		marginLeft: "auto",
// 		marginRight: "auto",
// 		color: "white",
// 		width: "70%",
// 		fontSize: "1.2rem",
// 		padding: "0.5rem 0.9rem",
// 	},
// 	itemQty: {},
// 	btn: {
// 		padding: "0.3rem",
// 	},
// 	button: {
// 		backgroundColor: "white",
// 		borderRadius: "50%",
// 		display: "flex",
// 		justifyItems: "center",
// 		alignItems: "center",
// 		padding: "0.2rem",
// 	},
// }))

// const ProductCard = ({
// 	ogPrice,
// 	dcPrice,
// 	name,
// 	picture,
// 	quantity,
// 	cart,
// 	product,
// }) => {
// 	const classes = useStyles()
// 	const dispatch = useDispatch()
// 	const discount = 100 - Math.round((dcPrice / ogPrice) * 100)

// 	return (
// 		<div className={classes.container}>
// 			<Paper elevation={3} className={classes.paper}>
// 				<Grid container xs={12} style={{ position: "relative" }}>
// 					<Grid item className={classes.quantity}>
// 						{quantity}
// 					</Grid>
// 					<Grid container item>
// 						<Grid item>
// 							<img className={classes.tag} src={tag} alt="discount tag" />
// 						</Grid>
// 						<Grid item>
// 							<h3 className={classes.discount}>{discount}%</h3>
// 						</Grid>
// 					</Grid>
// 					<Grid item alignContent="center">
// 						<img
// 							className={classes.picture}
// 							src={picture}
// 							alt="product picture"
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<h3 className={classes.name}>{name}</h3>
// 					</Grid>
// 					<Grid item container xs={12} justify="center" spacing={1}>
// 						<Grid item>
// 							<h4 className={classes.price}>Rs. {dcPrice}</h4>
// 						</Grid>
// 						<Grid item>
// 							<h4
// 								className={classes.price}
// 								style={{ textDecoration: "line-through", color: "#9CA8B3" }}
// 							>
// 								Rs. {ogPrice}
// 							</h4>
// 						</Grid>
// 					</Grid>
// 				</Grid>
// 			</Paper>
// 			{cart === 0 ? (
// 				<Button
// 					onClick={() => dispatch(addCartProduct(product))}
// 					className={clsx(classes.add, classes.btn)}
// 				>
// 					Add
// 				</Button>
// 			) : (
// 				<Grid
// 					xs={12}
// 					alignItems="center"
// 					container
// 					justify="space-between"
// 					className={clsx(classes.add, classes.itemQty)}
// 				>
// 					<Grid
// 						item
// 						alignContent="center"
// 						justify="center"
// 						className={classes.button}
// 						onClick={() => dispatch(removeCartProduct(product))}
// 					>
// 						<RemoveIcon style={{ color: "black", margin: "auto" }} />
// 					</Grid>
// 					<Grid item>{cart}</Grid>
// 					<Grid
// 						item
// 						alignContent="center"
// 						justify="center"
// 						className={classes.button}
// 						onClick={() => dispatch(addCartProduct(product))}
// 					>
// 						<AddIcon style={{ color: "black", margin: "auto" }} />
// 					</Grid>
// 				</Grid>
// 			)}
// 		</div>
// 	)
// }

// export default ProductCard

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import "./productAndtestListing.styles.scss"

import {
	addCartProduct,
	removeCartProduct,
} from "../../../../store/cart/cartActions"

//importing jss
import { blue } from "../../../../assets/globalJSS"
//importing icons
import { BiPlus, BiMinus } from "react-icons/bi"
import { MdLocalOffer } from "react-icons/md"

//importing reusable components
import Icon from "../../../reusableComponent/icon/icon.component"

const ProductAndTestListing = ({
	category,
	company,
	details,
	fastingRequired,
	image,
	itemType,
	mrp,
	name,
	qty,
	qtyType,
	sellingPrice,
	businessType,
	cart,
	product,
}) => {
	// const businessType = useSelector((state) => state.currentVendor.businessType)
	const dispatch = useDispatch()

	return (
		<div
			style={{ height: "17rem" }}
			className={`vendorTestAndProductListItem ${
				businessType === "pathology" ? "flexDisplay" : null
			}`}
			title={category}
		>
			<div className="vendorTestAndProductListItemHeader">
				<div className="vendorTestAndProductListItemHeaderCount">
					{qty}
					{qtyType}
				</div>
				{businessType === "pathology" ? (
					<div className="vendorTestAndProductListItemHeaderLabel">
						<p>Fasting Required</p>
					</div>
				) : null}
			</div>
			{(() => {
				let discount = 0
				discount = 100 - (sellingPrice / mrp) * 100
				return businessType === "pathology" && parseInt(discount) > 0 ? (
					<div className="productsOffer">
						<Icon size="65px" iconColor={blue}>
							<MdLocalOffer />
						</Icon>
						<div className="productDiscount">
							<p>{parseInt(discount)}%</p>
							<p>Off</p>
						</div>
					</div>
				) : null
			})()}
			<div className="vendorTestAndProductListItemMain">
				<img
					style={{ width: "100%", height: "80%" }}
					src={image}
					alt="product"
				/>
			</div>
			<div className="vendorTestAndProductListFooter">
				<div className="vendorTestAndProductListItemName">{name}</div>
				<div className="vendorTestAndProductListItemPrice">
					<div className="vendorTestAndProductListItemSellingPrice">
						RS.{sellingPrice}
					</div>
					{businessType === "pathology" ? (
						<div className="vendorTestAndProductListItemMrp">
							<del>RS.{mrp}</del>
						</div>
					) : null}
				</div>
			</div>
			{businessType === "pathology" ? (
				<div className="vendorTestAndProductListItemActions">
					{cart === 0 ? (
						<div
							onClick={() => dispatch(addCartProduct(product))}
							className="ProductListAddButton"
						>
							ADD
						</div>
					) : (
						<div className="productListAddRemoveButton">
							<div className="removeProductsFromList">
								<Icon size="18px">
									<BiMinus
										onClick={() => dispatch(removeCartProduct(product))}
									/>
								</Icon>
							</div>
							<div className="quantityOfProductsLeft">{cart}</div>
							<div className="AddMoreProductsToList">
								<Icon size="18px">
									<BiPlus onClick={() => dispatch(addCartProduct(product))} />
								</Icon>
							</div>
						</div>
					)}
				</div>
			) : null}
		</div>
	)
}

export default ProductAndTestListing
