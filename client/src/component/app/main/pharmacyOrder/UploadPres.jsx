import React, { useEffect, useState } from "react"
import CameraAltIcon from "@material-ui/icons/CameraAlt"
import CropFreeIcon from "@material-ui/icons/CropFree"
import ClearIcon from "@material-ui/icons/Clear"
import { useDispatch } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import ImageUpload from "./ImageUpload"
import { Redirect } from "react-router"

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: "#ededed",
		padding: "1rem 1rem",
		minHeight: "30vh",
	},
	upload: {
		fontSize: "1.1rem",
	},
	name: {
		fontSize: "1.5rem",
		fontWeight: "bold",
	},
	options: {
		border: "1px solid black",
		width: "100%",
		textAlign: "center",
		margin: "0.5rem 0",
		borderRadius: "0.4rem",
		"&:hover": {
			backgroundColor: "white",
		},
	},
	option: {
		padding: "0.5rem 0",
	},
}))

const UploadPres = ({ name, setUpload }) => {
	const classes = useStyles()

	const [fileImage, setFileImage] = useState("")

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: "SET_PRES_IMAGE", payload: fileImage })
	}, [fileImage])

	if (fileImage) {
		return <Redirect to="confirm"></Redirect>
	}

	return (
		<Grid
			container
			direction="column"
			className={classes.container}
			alignItems="center"
			spacing={1}
		>
			<Grid container>
				<Grid xs={3}></Grid>
				<Grid item className={classes.upload} xs={7}>
					Upload Prescription to
				</Grid>
				<Grid item xs={2}>
					<ClearIcon onClick={() => setUpload(false)} />
				</Grid>
			</Grid>
			<Grid className={classes.name} item>
				{name}
			</Grid>
			<Grid item className={classes.options}>
				<CameraAltIcon />
				<h3 className={classes.option}>Camera</h3>
			</Grid>
			<Grid item className={classes.options}>
				<ImageUpload
					select={(files) => {
						setFileImage(files)
					}}
				/>
			</Grid>
			<Grid item className={classes.options}>
				<CropFreeIcon />
				<h3 className={classes.option}>Scan Qr Code</h3>
			</Grid>
		</Grid>
	)
}

export default UploadPres
