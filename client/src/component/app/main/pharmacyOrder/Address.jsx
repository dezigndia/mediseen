import { Grid, Paper, FormControlLabel, Radio } from "@material-ui/core"
import React from "react"

const Address = ({ ad1, ad2, setSelected, checked, ind }) => {
	return (
		<Paper
			onClick={() => setSelected(ind)}
			elevation={3}
			style={{ padding: "0.5rem 1rem" }}
		>
			<Grid container direction="row">
				<Grid item xs={2}>
					<FormControlLabel
						value="female"
						control={<Radio checked={checked} />}
					/>
				</Grid>
				<Grid xs={10} container item direction="column">
					<Grid item>
						<p style={{ textAlign: "left", fontWeight: "bold" }}>{ad1}</p>
					</Grid>
					<Grid style={{ textAlign: "left", fontWeight: "bold" }} item>
						{ad2}
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default Address
