import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Grid, Paper } from "@material-ui/core"

import tag from "../../../../assets/icons/tag.svg"

const useStyles = makeStyles((theme) => ({
	container: {
		position: "relative",
	},
	paper: {
		position: "relative",
		height: "45vh",
		width: "55vw",
		padding: "0.5rem 0",
		maxWidth: "25rem",
	},
	quantity: {
		backgroundColor: "#D8DAE0",
		fontWeight: "bold",
		width: "30%",
		padding: "0.3rem 0",
		position: "absolute",
		top: "0.5rem",
	},
	tag: {
		transform: "rotate(-90deg)",
		width: "30%",
		minWidth: "5rem",
		maxWidth: "5rem",
		// height: "30%",
		position: "absolute",
		right: 0,
	},
	discount: {
		position: "absolute",
		right: "0.5rem",
		top: "1.8rem",
		fontSize: "150%",
	},
	picture: {
		width: "50%",
		minWidth: "10rem",
		height: "80%",
		margin: "1.5rem 0.5rem",
	},
	name: {
		fontSize: "1.5rem",
		width: "100%",
		textAlign: "center",
		margin: "1rem 0",
		fontWeight: "800",
	},
	price: {
		fontSize: "1.5rem",
	},
	add: {
		backgroundColor: "#38C180",
		position: "absolute",
		top: "95%",
		left: 0,
		right: 0,
		marginLeft: "auto",
		marginRight: "auto",
		color: "white",
		width: "50%",
		fontSize: "1.2rem",
		padding: "0.3rem",
	},
}))

const ProductCard = ({ ogPrice, dcPrice, name, picture, quantity }) => {
	const classes = useStyles()

	const discount = 100 - Math.round((dcPrice / ogPrice) * 100)

	return (
		<div className={classes.container}>
			<Paper elevation={3} className={classes.paper}>
				<Grid container xs={12} style={{ position: "relative" }}>
					<Grid item className={classes.quantity}>
						{quantity}
					</Grid>
					<Grid container item>
						<Grid item>
							<img className={classes.tag} src={tag} alt="discount tag" />
						</Grid>
						<Grid item>
							<h3 className={classes.discount}>{discount}%</h3>
						</Grid>
					</Grid>
					<Grid item alignContent="center">
						<img
							className={classes.picture}
							src={picture}
							alt="product picture"
						/>
					</Grid>
					<Grid item xs={12}>
						<h3 className={classes.name}>{name}</h3>
					</Grid>
					<Grid item container xs={12} justify="center" spacing={1}>
						<Grid item>
							<h4 className={classes.price}>Rs. {dcPrice}</h4>
						</Grid>
						<Grid item>
							<h4
								className={classes.price}
								style={{ textDecoration: "line-through", color: "#9CA8B3" }}
							>
								Rs. {ogPrice}
							</h4>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
			<Button className={classes.add}>Add</Button>
		</div>
	)
}

export default ProductCard
