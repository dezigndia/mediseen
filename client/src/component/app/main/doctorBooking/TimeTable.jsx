import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
})

const TimeTable = ({ clinic }) => {
	const classes = useStyles()

	console.log(clinic)

	return (
		<Link to="/home/doctorBooking/doc-timing">
			<TableContainer component={Paper} style={{ padding: "1rem" }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Day</TableCell>
							<TableCell align="right">Morning</TableCell>
							<TableCell align="right">Evening</TableCell>
						</TableRow>
					</TableHead>
					{clinic.Monday && (
						<TableBody>
							{
								<TableRow key={Math.random()}>
									<TableCell component="th" scope="row">
										Monday
									</TableCell>
									<TableCell align="right">
										{clinic.Monday.morning.from} -{clinic.Monday.morning.to}
									</TableCell>
									<TableCell align="right">
										{clinic.Monday.evening.from} -{clinic.Monday.evening.to}
									</TableCell>
								</TableRow>
							}
						</TableBody>
					)}
					{clinic.Tuesday && (
						<TableBody>
							<TableRow key={Math.random()}>
								<TableCell component="th" scope="row">
									Tuesday
								</TableCell>
								<TableCell align="right">
									{clinic.Tuesday.morning.from} -{clinic.Tuesday.morning.to}
								</TableCell>
								<TableCell align="right">
									{clinic.Tuesday.evening.from} -{clinic.Tuesday.evening.to}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
					{clinic.Wednesday && (
						<TableBody>
							<TableRow key={Math.random()}>
								<TableCell component="th" scope="row">
									Wednesday
								</TableCell>
								<TableCell align="right">
									{clinic.Wednesday.morning.from} -{clinic.Wednesday.morning.to}
								</TableCell>
								<TableCell align="right">
									{clinic.Wednesday.evening.from} -{clinic.Wednesday.evening.to}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
					{clinic.Thursday && (
						<TableBody>
							<TableRow key={Math.random()}>
								<TableCell component="th" scope="row">
									Thursday
								</TableCell>
								<TableCell align="right">
									{clinic.Thursday.morning.from} -{clinic.Thursday.morning.to}
								</TableCell>
								<TableCell align="right">
									{clinic.Thursday.evening.from} -{clinic.Thursday.evening.to}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
					{clinic.Friday && (
						<TableBody>
							<TableRow key={Math.random()}>
								<TableCell component="th" scope="row">
									Friday
								</TableCell>
								<TableCell align="right">
									{clinic.Friday.morning.from} -{clinic.Friday.morning.to}
								</TableCell>
								<TableCell align="right">
									{clinic.Friday.evening.from} -{clinic.Friday.evening.to}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
					{clinic.Saturday && (
						<TableBody>
							<TableRow key={Math.random()}>
								<TableCell component="th" scope="row">
									Saturday
								</TableCell>
								<TableCell align="right">
									{clinic.Saturday.morning.from} -{clinic.Saturday.morning.to}
								</TableCell>
								<TableCell align="right">
									{clinic.Saturday.evening.from} -{clinic.Saturday.evening.to}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
					{clinic.Sunday && (
						<TableBody>
							<TableRow key={Math.random()}>
								<TableCell component="th" scope="row">
									Sunday
								</TableCell>
								<TableCell align="right">
									{clinic.Sunday.morning.from} -{clinic.Sunday.morning.to}
								</TableCell>
								<TableCell align="right">
									{clinic.Sunday.evening.from} -{clinic.Sunday.evening.to}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</Link>
	)
}

export default TimeTable
