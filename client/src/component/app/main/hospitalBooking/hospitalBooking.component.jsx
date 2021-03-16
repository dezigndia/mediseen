import React, { useEffect, useState } from "react"
import "./hospitalBooking.styles.scss"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Container, Grid } from "@material-ui/core"
import fetchCall from "../../../../fetchCall/fetchCall"
import { useParams } from "react-router-dom"
import InfoCard from "./InfoCard"
import Available from "./Available"
import { useSelector, useDispatch } from "react-redux"
import { addCurrentStore } from "../../../../store/currentStore/currentStoreAction"

const HospitalBooking = () => {
	const { id } = useParams()

	const [hos, setHos] = useState({})
	const dispatch = useDispatch()
	const [isAvailable, setAvailable] = useState([])

	useEffect(() => {
		if (hos.doctors) {
			const avail = hos.doctors.map((doc) => {
				const available = { hours: doc.workingHours[`Tuesday`], doc }
				return available
			})
			setAvailable(avail)
		}
	}, [hos])

	console.log(isAvailable)

	useEffect(() => {
		const fetchHos = async () => {
			const data = await fetchCall(`hospital/${id}`, "GET").then(
				(res) => res.data.payload
			)
			console.log(data)
			setHos(data)
			dispatch(addCurrentStore(data))
		}

		fetchHos()
	}, [])

	return (
		<Container>
			<Grid container direction="column">
				<Grid item xs={12}>
					<InfoCard
						name={hos && hos.businessName}
						area={hos && hos.area}
						pincode={hos && hos.pincode}
						image={hos && hos.photo}
					/>
				</Grid>
			</Grid>
			<Grid item container spacing={2}>
				{isAvailable.length > 0 ? (
					<>
						<Grid item>
							<h3>Available Today</h3>
						</Grid>
						{isAvailable.map((item) => {
							console.log(item)
							return (
								<Grid item xs={12}>
									<Available
										name={item.doc.name}
										address={item.doc.address}
										morning={`${item.hours.morning.from}-${item.hours.morning.to}`}
										evening={`${item.hours.evening.from}-${item.hours.evening.to}`}
									/>
								</Grid>
							)
						})}
					</>
				) : null}
				<Grid item container spacing={2}>
					<Grid item>
						<h3>Available Tomorow Onwards</h3>
					</Grid>
					{hos.doctors &&
						hos.doctors.map((doc, ind) => {
							return (
								<Grid item xs={12}>
									<Available ind={ind} doctor={doc} />
								</Grid>
							)
						})}
				</Grid>
			</Grid>
		</Container>
	)
}

export default HospitalBooking
