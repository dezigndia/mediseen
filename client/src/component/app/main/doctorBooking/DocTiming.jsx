import { Grid } from "@material-ui/core"
import React, { useState } from "react"
import BusinessHeader from "../../../userProfile/BusinessHeader"
import { useDispatch, useSelector } from "react-redux"
import Available from "./Available"
import Date from "../labOrder/Date"
import moment from "moment"
import Time from "./Time"

const DocTiming = () => {
	const [date, setDate] = useState("")

	const clinic = useSelector((state) => state.currentStore.clinic)

	return (
		<Grid container item style={{ padding: "1rem 0.5rem" }} spacing={4}>
			<Grid item>
				<BusinessHeader />
			</Grid>
			<Grid item xs={12}>
				<Available />
			</Grid>

			<Grid xs={12} item>
				<Date
					date={JSON.stringify(moment()._d)}
					setDate={(value) => setDate(value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Time clinic={clinic} />
			</Grid>
		</Grid>
	)
}

export default DocTiming
