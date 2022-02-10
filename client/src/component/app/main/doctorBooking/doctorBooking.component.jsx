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
import { Grid,Container } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import InfoCard from "./InfoCard"
import fetchCall from "../../../../fetchCall/fetchCall"
import moment from "moment"
import Available from "./Available"
import { addCurrentStore } from "../../../../store/currentStore/currentStoreAction"

const currentDate = new Date()

// const day = moment().format("dddd")
const day = moment(new Date()).format("dddd")
// const day = "Monday"
const time = currentDate.getHours()

const DoctorBooking = () => {
	const { id } = useParams()

	console.log(time)

	const dispatch = useDispatch()

	const [doc, setDoc] = useState({})

	const [isAvailable, setAvailable] = useState([])

	useEffect(() => {
		const fetchDoc = async () => {
			const res = await fetchCall(`doctor/${id}`, "GET").catch(
				(err) => res.err
			)
			if(res.data){
				setDoc(res.data.payload)
				dispatch(addCurrentStore(res.data.payload))
			}
			console.log(res)
		}
		fetchDoc()
	}, [])

	useEffect(() => {
    if (doc.clinic) {
      let avail = doc.clinic.map((clin) => {
        return { hours: clin.workingHours[`${day}`], clinic: clin };
      });
      avail = avail.filter((item) => {
        if (item.hours) {
          return item;
        }
      });
      setAvailable(avail);
    }
  }, [doc]);

	console.log(isAvailable)

	return (
		<Container style={{marginTop: "40px",overflowY: "auto", height: "84%"}}>
		<Grid container direction="column">
			<Grid item xs={12}>
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
						{isAvailable.map((item) => {
							console.log(item)
							return (
								<Grid item xs={12}>
									<Available
									//  image= {item.photo}
										name={item.clinic.name}
										address={item.clinic.address}
										clinic={item.clinic}
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
			</Grid>
			<Grid item container spacing={2}>
				<Grid item>
					<h3>Available Tomorow Onwards</h3>
				</Grid>
				{doc.clinic &&
					doc.clinic.map((clin, ind) => {
						return (
							<Grid item xs={12}>
							
                               {!clin.workingHours[`${day}`] ? 
								<Available  image= {""} clinic={clin}  name={clin.name}
										address={clin.address}/>
                                   :null}
							</Grid>
						)
					})}
			</Grid>
		</Grid>
		</Container>
	)
}

export default DoctorBooking
