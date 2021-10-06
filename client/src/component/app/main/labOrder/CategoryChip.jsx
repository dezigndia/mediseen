import React from "react"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(() => ({
	chip: {
		margin: "0.3rem",
		border: "0.5px solid black",
		padding: "0.5rem",
		borderRadius: "20px",
		minWidth: "6rem",
		width: "auto",
	},
	menuItemActive: {
		backgroundColor: "#20E0B9",
		color: "white",
	},
}))

const CategoryChip = ({ name, active }) => {
	const classes = useStyles()

	return (
		<div
			className={
				active === name
					? clsx(classes.chip, classes.menuItemActive)
					: classes.chip
			}
		>
			{name}
		</div>
	)
}

export default CategoryChip
