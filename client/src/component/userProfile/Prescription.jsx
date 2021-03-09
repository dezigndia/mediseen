import { Button, Grid } from "@material-ui/core"
import React from "react"
import Business from "./Business"
import BusinessHeader from "./BusinessHeader"

const Prescription = () => {
	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<BusinessHeader />
			</Grid>
			<Grid item xs={12}>
				<Business
					name={"Dr. Prakash"}
					price={300}
					time={"6pm-10pm"}
					desc={"Internal Medicine"}
				/>
			</Grid>
			<Grid xs={12}>
				<img
					style={{ width: "100vw" }}
					src="https://www.rbcinsurance.com/group-benefits/_assets-custom/images/prescription-drug-sample-receipt-en.jpg"
				/>
			</Grid>
			<Grid container direction="row" xs={12} justify="center" spacing={1}>
				<Grid item>
					<Button
						style={{
							backgroundColor: "#C8C8C8",
							color: "white",
							padding: "0.5rem 1rem",
							fontSize: "1.1rem",
						}}
					>
						Review
					</Button>
				</Grid>
				<Grid item>
					<Button
						style={{
							backgroundColor: "#22D8BC",
							color: "white",
							padding: "0.5rem 1rem",
							fontSize: "1.1rem",
						}}
					>
						Upload
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Prescription
