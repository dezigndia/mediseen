import { Grid } from "@material-ui/core"
import React, { useState } from "react"
import BusinessHeader from "../../../userProfile/BusinessHeader"
import { useDispatch, useSelector } from "react-redux"
import Available from "./Available"
import Date from "../labOrder/Date"
import DateList from "../labOrder/DateList"
import moment from "moment"
import Time from "./Time"

const DocTiming = ({ location }) => {

	const [date, setDate] = useState(moment())

	const params = new URLSearchParams(location.search)
	const ind = params.get("ind")
	const day = params.get("day")
	const clinic = useSelector((state) => state.currentStore.clinic[ind])
// 	const doctor = useSelector((state) => 
// 	state.currentStore.doctors[ind]
// 	)
	return (
		<Grid container item style={{ padding: "1rem 0.5rem",marginTop:"0px" }} spacing={4}>
			<Grid item>
				<BusinessHeader  businessName={clinic.name} businessType={clinic.businessType} address={clinic.address}/>
			</Grid>
			{/* <Grid item xs={12}>
				<Available clinic={clinic}/>
			</Grid> */}

			<Grid xs={12} item>
				<DateList
					date={JSON.stringify(moment()._d)}
					setDate={(value) => setDate(value)}
					day={day}
				/>
			</Grid>
			<Grid item xs={12} style={{overflow: "scroll",height: "380px"}}>	
				{/* <Time clinic={clinic} 	date={JSON.stringify(moment(date)._d)}/> */}
				<Time clinic={clinic} date={moment(date)} day={day} />
			</Grid>
		</Grid>
	)
}

export default DocTiming
