// import React, { useEffect, useState } from "react"
// import "./hospitalBooking.styles.scss"
// import { makeStyles } from "@material-ui/core/styles"
// import Paper from "@material-ui/core/Paper"
// import { Container, Grid } from "@material-ui/core"
// import fetchCall from "../../../../fetchCall/fetchCall"
// import { useParams } from "react-router-dom"
// import InfoCard from "./InfoCard"
// import Available from "./Available"
// import moment from "moment"
// import { useSelector, useDispatch } from "react-redux"
// import { addCurrentStore } from "../../../../store/currentStore/currentStoreAction"

// const HospitalBooking = () => {
// 	const { id } = useParams()

// 	const [hos, setHos] = useState({})
// 	const dispatch = useDispatch()
// 	const [isAvailable, setAvailable] = useState([])

// 	const day = moment(new Date()).format("dddd")
// 	useEffect(() => {
// 		if (hos.doctors) {
// 			const avail = hos.doctors.map((doc) => {
// 				// const available = { hours: doc.workingHours[`Tuesday`], doc }
// 				const available = {hours:doc.workingHours[`${day}`],doc }
// 			 return available
// 			})
// 			setAvailable(avail)
// 		}
// 	}, [hos])

// 	console.log(isAvailable)

// 	useEffect(() => {
// 		const fetchHos = async () => {
// 			const data = await fetchCall(`hospital/${id}`, "GET").then(
// 				(res) => res.data.payload
// 			)
// 			console.log(data)
// 			setHos(data)
// 			dispatch(addCurrentStore(data))
// 		}

// 		fetchHos()
// 	}, [])

// 	return (
// 		<Container style={{marginTop: "40px",overflowY: "auto"}}>
// 			<Grid container direction="column">
// 				<Grid item xs={12}>
// 					<InfoCard
// 						name={hos && hos.businessName}
// 						area={hos && hos.area}
// 						pincode={hos && hos.pincode}
// 						image={
// 							hos && hos.photo
// 							? hos.photo
// 							: "https://yt3.ggpht.com/ytc/AAUvwngsMYKVJenoA3m07HTBPjzMjDsuDMgzFi6L1g0Z=s900-c-k-c0x00ffffff-no-rj"
// 					}
// 					/>
// 				</Grid>
// 			</Grid>
// 			<Grid item container spacing={2}>
// 				{isAvailable.length > 0 ? (
// 					<>
// 						<Grid item>
// 							<h3>Available Today</h3>
// 						</Grid>
// 						{isAvailable.map((item,ind) => {
// 							return (
// 								<Grid item xs={12}>
// 									<Available
// 										name={item.doc.name}
// 										address={item.doc.address}
// 										doctors={item.doc}
// 										ind={ind}
// 										morning={item.hours &&
// 											`${item.workingHours.morning.from}-${item.workingHours.morning.to}`}
// 										evening={
// 											item.workingHours &&
// 											`${item.workingHours.evening.from}-${item.workingHours.evening.to}`}

// 										// morning={
// 										// 	item.hours &&
// 										// 	`${item.hours.morning.from}-${item.hours.morning.to}`
// 										// }
// 										// evening={
// 										// 	item.hours &&
// 										// 	`${item.hours.evening.from}-${item.hours.evening.to}`
// 										// }
// 									/>
// 								</Grid>
// 							)
// 						})}
// 					</>
// 				) : null}
// 				<Grid item container spacing={2}>
// 					<Grid item>
// 						<h3>Available Tomorow Onwards</h3>
// 					</Grid>

// 					{hos.doctors &&
// 						hos.doctors.map((doc, ind) => {
// 							return (
// 								<Grid item xs={12}>
// 									<Available ind={ind} doctors={doc} />
// 								</Grid>
// 							)
// 						})}
// 				</Grid>
// 			</Grid>
// 		</Container>
// 	)
// }

// export default HospitalBooking

import React, { useEffect, useState } from "react"
import "./hospitalBooking.styles.scss"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Container, Grid } from "@material-ui/core"
import fetchCall from "../../../../fetchCall/fetchCall"
import { useParams } from "react-router-dom"
import InfoCard from "./InfoCard"
import Available from "./Available"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import { addCurrentStore } from "../../../../store/currentStore/currentStoreAction"

const currentDate = new Date()
const day = moment(new Date()).format("dddd")
const time = currentDate.getHours()

const HospitalBooking = () => {
	const { id } = useParams()

	const [hos, setHos] = useState({})
	const dispatch = useDispatch()
	const [isAvailable, setAvailable] = useState([])
console.log(isAvailable);

	useEffect(() => {
		if (hos.doctors) {
		  let avail = hos.doctors.map((doc) => {
			return {hours:doc.workingHours[`${day}`],doc };
		  });
		
		  avail = avail.filter((item) => {
			if (item.hours) {
			  return item;
			}
		  });
		  console.log(JSON.stringify(hos.doctors))
		  setAvailable(avail);
		}
	  }, [hos]);
	  
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
		<Container style={{marginTop: "40px",overflowY: "auto", height: "84%"}}>
		<Grid container direction="column">
			<Grid item xs={12}>
			<InfoCard
						name={hos && hos.businessName}
						area={hos && hos.area}
						pincode={hos && hos.pincode}
						image={
							hos && hos.photo
							? hos.photo
							: "https://yt3.ggpht.com/ytc/AAUvwngsMYKVJenoA3m07HTBPjzMjDsuDMgzFi6L1g0Z=s900-c-k-c0x00ffffff-no-rj"
					}
					/>
				</Grid>
			</Grid>
			<Grid item container spacing={2}>
				{isAvailable.length > 0 ? (
					<>
						<Grid item>
							<h3>Available Today</h3>
						</Grid>
						{isAvailable.map((item,ind) => {
							return (
								<Grid item xs={12}>
									<Available
									//  image= {item.photo}
										name={item.doc.name}
										address={item.doc.address}
										specialist={item.doc.degree}
										doctors={item.doc}
										ind={ind}
										today={item.hours}
										morning={
											item.hours &&
											`${item.hours.morning.from}-${item.hours.morning.to}`
										}
										evening={
											item.hours &&
											`${item.hours.evening.from}-${item.hours.evening.to}`
										}
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
                               {!doc.workingHours[`${day}`] ? 
								<Available  image= {""}  
								 name={doc.name}
								ind={ind} doctors={doc} 
								address={doc.address}
								specialist={doc.degree}/>
                                   :null}
							</Grid>
						)
					})}
				</Grid>
			</Grid>
		</Container>
	)
}

export default HospitalBooking
