// import React from 'react';
// import { connect } from 'react-redux';
// import './doctorBooking.styles.scss';

// //importing actions
// import {
//     setActiveItem,
//     setActiveItemNull,
//     setActiveTab,
//     setActiveTabNull,
//     fetchAvailableToday,
//     fetchAvailableTomorrow
// } from '../../../../actions/action';

// //reusableComponent
// import InfoCard from '../../../reusableComponent/infoCard/infoCard.component.';
// import AvailableTimings from '../../../reusableComponent/availableTimings/availableTimings.component';

// const DoctorBooking = ({ history, selectedData, activeTab, setActiveTabNull, setActiveItemNull, setActiveTab, setActiveItem }) => {

//     return (
//         <div className="doctorBooking">
//             <div className="infoCardContainer" onClick={() => { setActiveTabNull(); setActiveItemNull(); }}>
//                 <InfoCard data={selectedData} small={activeTab ? true : false} />
//             </div>
//             <div className={`availableToday info ${activeTab === 'availableToday' ? 'activeTab' : null}`} onClick={(e) => { setActiveTab('availableToday'); }} >
//                 <p>Available Today</p>
//                 <p onClick={(e) => { history.push('/home/about'); }}>About</p>
//                 <AvailableTimings isActive={activeTab === 'availableToday' ? true : false} />
//             </div>
//             <div className={`availableTomorrowOnwards info ${activeTab === 'availableTomorrowOnwards' ? 'activeTab' : null}`} onClick={(e) => { setActiveTab('availableTomorrowOnwards'); }}>
//                 <p>Available Tomorrow onwards</p>
//                 <AvailableTimings isActive={activeTab === 'availableTomorrowOnwards' ? true : false} />
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = state => ({
//     selectedData: state.search.selectedData,
//     activeTab: state.availableTimings.activeTab,
// });

// const mapDispatchToProps = dispatch => ({
//     setActiveTabNull: () => dispatch(setActiveTabNull()),
//     setActiveTab: (tab) => dispatch(setActiveTab(tab)),
//     setActiveItemNull: () => dispatch(setActiveItemNull()),
//     setActiveItem: () => dispatch(setActiveItem()),
//     fetchAvailableToday: () => dispatch(fetchAvailableToday()),
//     fetchAvailableTomorrow: () => dispatch(fetchAvailableTomorrow())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(DoctorBooking);

import { Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import InfoCard from "./InfoCard"
import fetchCall from "../../../../fetchCall/fetchCall"
import moment from "moment"
import Available from "./Available"

const currentDate = new Date()

const day = moment().format("dddd")

const time = currentDate.getHours()

const DoctorBooking = () => {
	const { id } = useParams()

	console.log(time)

	const [doc, setDoc] = useState({})

	const [isAvailable, setAvailable] = useState([])

	useEffect(() => {
		const fetchDoc = async () => {
			const data = await fetchCall(`doctor/${id}`, "GET").then(
				(res) => res.data.payload
			)
			setDoc(data)
			console.log(data)
		}
		fetchDoc()
	}, [])

	useEffect(() => {
		if (doc.clinic) {
			const avail = doc.clinic.map((clin) => {
				return clin.workingHours[day]
			})

			setAvailable(avail)
		}
	}, [doc])

	console.log(isAvailable)

	return (
		<Grid
			container
			justify="center"
			alignItems="center"
			direction="column"
			style={{ padding: "0.5rem" }}
			spacing={5}
		>
			<Grid item>
				<InfoCard
					name={doc && doc.businessName}
					image={
						doc && doc.photo
							? doc.photo
							: "https://yt3.ggpht.com/ytc/AAUvwngsMYKVJenoA3m07HTBPjzMjDsuDMgzFi6L1g0Z=s900-c-k-c0x00ffffff-no-rj"
					}
					degree={doc && doc.degree}
					specialist={doc && doc.specialist}
				/>
			</Grid>
			<Grid item container spacing={2}>
				{isAvailable.length > 0 ? (
					<>
						<Grid item>
							<h3>Available Today</h3>
						</Grid>
						<Grid item xs={12}>
							<Available
								name="Prakahs Hospital"
								address="71/A, belgachia road"
								morning="8am-10am"
								evening="7pm-9pm"
							/>
						</Grid>
					</>
				) : null}
			</Grid>
			<Grid item container spacing={2}>
				<Grid item>
					<h3>Available Tomorow Onwards</h3>
				</Grid>
				{doc.clinic &&
					doc.clinic.map((clin) => {
						return (
							<Grid item xs={12}>
								<Available clinic={clin} />
							</Grid>
						)
					})}
			</Grid>
		</Grid>
	)
}

export default DoctorBooking
