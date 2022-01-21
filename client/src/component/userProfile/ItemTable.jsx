import React, { useState } from "react"
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

const ItemTable = (cart) => {
	const classes = useStyles()
const [data,setData] =useState(cart.cart);

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
					{data && data.map((row) => (
						<TableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="center">{row.qty}</TableCell>
							<TableCell align="center">{row.sellingPrice}</TableCell>
							<TableCell align="center">
								{row.qty * row.sellingPrice}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ItemTable
