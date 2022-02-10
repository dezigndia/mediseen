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
import moment from "moment"

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	body:{
		fontSize:"20px"
	}
})

const TimeTable = ({ clinic,today}) => {
	const classes = useStyles()



	return (
		<Link to="/home/doctorBooking/doc-timing">
		{today ? 
			<TableContainer component={Paper} style={{ padding: "0rem" ,margin:"0rem"}}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Day</TableCell>
							<TableCell align="right">Morning</TableCell>
							<TableCell align="right">Evening</TableCell>
						</TableRow>
					</TableHead>
					{today && (
						<TableBody className={classes.body}>
							{
								<TableRow key={Math.random()}  className={classes.body}>
									<TableCell component="th" scope="row">
								{moment(new Date()).format("dddd")}
									</TableCell>
									<TableCell align="right">
									{moment(today.morning.from).format("LT")} - {moment(today.morning.to).format("LT")}
									</TableCell>
									<TableCell align="right">
									{moment(today.evening.from).format("LT")} - {moment(today.evening.to).format("LT")}
									</TableCell>
								</TableRow>
							}
						</TableBody>
					)}
				</Table>
				</TableContainer>:

				<TableContainer component={Paper} style={{ padding: "0rem" }}>
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
									{moment(clinic.Monday.morning.from).format("LT")} - {moment(clinic.Monday.morning.to).format("LT")}
									</TableCell>
									<TableCell align="right">
									{moment(clinic.Monday.evening.from).format("LT")} - {moment(clinic.Monday.evening.to).format("LT")}
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
								{moment(clinic.Tuesday.morning.from).format("LT")} - {moment(clinic.Tuesday.morning.to).format("LT")}
								</TableCell>
								<TableCell align="right">
								{moment(clinic.Tuesday.evening.from).format("LT")} - {moment(clinic.Tuesday.evening.to).format("LT")}
		
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
								{moment(clinic.Wednesday.morning.from).format("LT")} - {moment(clinic.Wednesday.morning.to).format("LT")}
								
								</TableCell>
								<TableCell align="right">
								{moment(clinic.Wednesday.evening.from).format("LT")} - {moment(clinic.Wednesday.evening.to).format("LT")}
									{/* {clinic.Wednesday.evening.from} -{clinic.Wednesday.evening.to} */}
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
								{moment(clinic.Thursday.morning.from).format("LT")} - {moment(clinic.Thursday.morning.to).format("LT")}
					
								</TableCell>
								<TableCell align="right">
								{moment(clinic.Thursday.evening.from).format("LT")} - {moment(clinic.Thursday.evening.to).format("LT")}
									{/* {clinic.Thursday.evening.from} -{clinic.Thursday.evening.to} */}
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
								{moment(clinic.Friday.morning.from).format("LT")} - {moment(clinic.Friday.morning.to).format("LT")}
					
									{/* {clinic.Friday.morning.from} -{clinic.Friday.morning.to} */}
								</TableCell>
								<TableCell align="right">
								{moment(clinic.Friday.evening.from).format("LT")} - {moment(clinic.Friday.evening.to).format("LT")}
									{/* {clinic.Friday.evening.from} -{clinic.Friday.evening.to} */}
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
								{moment(clinic.Saturday.morning.from).format("LT")} - {moment(clinic.Saturday.morning.to).format("LT")}
									{/* {clinic.Saturday.morning.from} -{clinic.Saturday.morning.to} */}
								</TableCell>
								<TableCell align="right">
								{moment(clinic.Saturday.evening.from).format("LT")} - {moment(clinic.Saturday.evening.to).format("LT")}
									{/* {clinic.Saturday.evening.from} -{clinic.Saturday.evening.to} */}
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
								{moment(clinic.Sunday.morning.from).format("LT")} - {moment(clinic.Sunday.morning.to).format("LT")}
									{/* {clinic.Sunday.morning.from} -{clinic.Sunday.morning.to} */}
								</TableCell>
								<TableCell align="right">
									{/* {clinic.Sunday.evening.from} -{clinic.Sunday.evening.to} */}
									{moment(clinic.Sunday.evening.from).format("LT")} - {moment(clinic.Sunday.evening.to).format("LT")}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
				</Table>
			</TableContainer>}
		</Link>
	)
}

export default TimeTable
