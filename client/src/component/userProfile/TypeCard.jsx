import { Divider, Grid, Paper } from "@material-ui/core"
import React, { useState } from "react"
import DateRangeIcon from "@material-ui/icons/DateRange"
import FilterListIcon from "@material-ui/icons/FilterList"
import TypeRow from "./TypeRow"
import ReceiptIcon from "@material-ui/icons/Receipt"
import LocalMallIcon from "@material-ui/icons/LocalMall"

import { makeStyles } from "@material-ui/core/styles"
import SortBy from "./SortBy"

const useStyles = makeStyles((theme) => ({
	fontGrey: {
		color: "#404040",
		textAlign: "left",
	},
	container: {
		padding: "1rem 0.5rem",
		borderRadius: "10px",
	},

	header: {
		color: "#2BBEC8",
		fontWeight: "bolder",
		textAlign: "left",
	},
}))

const TypeCard = ({ type }) => {
	const classes = useStyles()

	const [open, setOpen] = useState(false)

	const returnOrder = () => {
		switch (type) {
			case "My Apointments":
				return "Book Again"
			case "Prescriptions":
				return "Prescription"
			case "Orders":
				return "Re-Order"
			default:
				break
		}
	}

	const returnIcon = () => {
		switch (type) {
			case "My Apointments":
				return <DateRangeIcon className={classes.header} />
			case "Prescriptions":
				return <ReceiptIcon className={classes.header} />
			case "Orders":
				return <LocalMallIcon className={classes.header} />
			default:
				break
		}
	}

	return (
		<Paper elevation={4} className={classes.container}>
			<Grid container direction="column" spacing={2}>
				<Grid container direction="column" item spacing={1}>
					<Grid container item direction="row" justify="space-between">
						<Grid container xs={8} item alignItems="center">
							<Grid item xs={2}>
								{returnIcon()}
							</Grid>
							<Grid item xs={10}>
								<h4 className={classes.header}>{type}</h4>
							</Grid>
						</Grid>
						<Grid
							container
							xs={4}
							spacing={1}
							alignItems="center"
							alignContent="flex-end"
						>
							<Grid item>
								<FilterListIcon />
							</Grid>
							<Grid item>
								<h4 onClick={() => setOpen(true)} style={{ color: "grey" }}>
									Filter
								</h4>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
				</Grid>
				<Grid container item xs={12} spacing={2}>
					<Grid item xs={12}>
						<TypeRow order={returnOrder()} />
					</Grid>
					<Grid item xs={12}>
						<TypeRow order={returnOrder()} />
					</Grid>
					<Grid item xs={12}>
						<TypeRow order={returnOrder()} />
					</Grid>
				</Grid>
			</Grid>
			<SortBy type={type} open={open} />
		</Paper>
	)
}

export default TypeCard
