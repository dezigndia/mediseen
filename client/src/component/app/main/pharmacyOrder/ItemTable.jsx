import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
	table: {
		minWidth: "95vw",
	},
})

const ItemTable = () => {
	const classes = useStyles()

	const cart = useSelector((state) => state.cart)

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Quantity</TableCell>
						<TableCell align="right">MRP</TableCell>
						<TableCell align="right">Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cart.map((row) => (
						<TableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.item.name}
							</TableCell>
							<TableCell align="center">{row.qty}</TableCell>
							<TableCell align="center">{row.item.sellingPrice}</TableCell>
							<TableCell align="center">
								{row.qty * row.item.sellingPrice}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ItemTable
