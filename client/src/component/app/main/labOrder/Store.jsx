import React, { useState } from "react"
import { Grid, Paper } from "@material-ui/core"
import InfoCard from "./InfoCard"
import CategoryChip from "./CategoryChip"

import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"

import { makeStyles } from "@material-ui/core/styles"
import ProductCard from "./ProductCard"

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

	const [active, setActive] = useState(category[0])

	return (
		<Grid container direction="column" alignItems="center" spacing={2}>
			<Grid item>
				<InfoCard
					name={"Rajam Medical Store"}
					delivery={500}
					cod={true}
					distance="2.5km"
					start={4}
					eos={22}
					address="73 Algate St. Bandra"
				/>
			</Grid>
			<Grid item>
				<div className={classes.slider}>
					{category.map((item) => (
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
					{category.map((item) => (
						<div style={{ margin: "0.5rem" }}>
							{/*<ProductCard
								ogPrice="45"
								dcPrice="43"
								name={item}
								picture="https://images-na.ssl-images-amazon.com/images/I/61VdTZiUs2L._SL1000_.jpg"
								quantity="100gm"
							/>*/}
							<ProductAndTestListing
								category="category"
								image="https://images-na.ssl-images-amazon.com/images/I/61VdTZiUs2L._SL1000_.jpg"
								mrp="100"
								name={item}
								qty="10"
								sellingPrice="90"
							/>
						</div>
					))}
				</div>
			</div>
		</Grid>
	)
}

export default Store
