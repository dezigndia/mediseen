import { Grid } from "@material-ui/core"
import React, { useState } from "react"
import BusinessHeader from "../../../userProfile/BusinessHeader"
import { useDispatch, useSelector } from "react-redux"
import Available from "./Available"
import Date from "../labOrder/Date"
import moment from "moment"
import Time from "./Time"

const HosTiming = ({ location }) => {
	const params = new URLSearchParams(location.search)
	const ind = params.get("ind")

	const [date, setDate] = useState("")

	const doctor = useSelector((state) => state.currentStore.doctors[ind])

	return (
		<Grid container item style={{ padding: "1rem 0.5rem" }} spacing={4}>
			{/* <Grid item>
				<BusinessHeader />
			</Grid> */}
			<Grid item xs={12}>
				<Available doctor={doctor} />
			</Grid>
			<Grid xs={12} item>
				<Date
					date={JSON.stringify(moment()._d)}
					setDate={(value) => setDate(value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Time ind={ind} date={date} doctor={doctor} />
			</Grid>
		</Grid>
	)
}

export default HosTiming
