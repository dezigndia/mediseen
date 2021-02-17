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

const categoryList = ["OTC", "Ayurvedic", "Surgical", "Booster"]

const PharmacyOrder = () => {
	const classes = useStyles()

	const [upload, setUpload] = useState(false)
	const [file, setFile] = useState({})
	const [active, setActive] = useState("OTC")

	return (
		<Grid
			container
			direction="column"
			className={classes.container}
			spacing={1}
		>
			<Grid item>
				<InfoCard
					name={"Shree Pathalogy"}
					delivery={500}
					cod={true}
					distance="2.5km"
					start={4}
					eos={22}
					address="73 Algate St. Bandra"
				/>
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
						name="Rajam Medical Store"
						setUpload={(value) => setUpload(value)}
						setFile={(files) => setFile(files)}
					/>
				</SwipeableDrawer>
			</Grid>
			<Grid container justify="center" spacing={2}>
				<Grid item>
					<h2>To Rajam Medical Store</h2>
				</Grid>
				<Grid item container spacing={0} justify="center">
					{categoryList.map((category) => (
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
				{active === "OTC" ? (
					<Grid item>
						<ProductCard
							ogPrice="45"
							dcPrice="42"
							name="Dettol Handwash"
							picture={hand}
							quantity="100 g"
						/>
					</Grid>
				) : active === "Ayurvedic" ? (
					<Grid item>
						<ProductCard
							ogPrice="45"
							dcPrice="42"
							name="Lifebuoy Handwash"
							picture={hand}
							quantity="100 g"
						/>
					</Grid>
				) : active === "Surgical" ? (
					<Grid item>
						<ProductCard
							ogPrice="45"
							dcPrice="42"
							name="Patanjali Handwash"
							picture={hand}
							quantity="100 g"
						/>
					</Grid>
				) : (
					<Grid item>
						<ProductCard
							ogPrice="45"
							dcPrice="42"
							name="Booster Handwash"
							picture={hand}
							quantity="100 g"
						/>
					</Grid>
				)}
			</Grid>
		</Grid>
	)
}

export default PharmacyOrder
