import React, { useState, useRef, useEffect } from "react"
import { withRouter } from "react-router-dom"
import "./locationAccessComponent.styles.scss"
import GeoCoder from "node-geocoder"
import { Link } from "react-router-dom"

//icon
import { Button, makeStyles, Grid } from "@material-ui/core"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import CloseIcon from "@material-ui/icons/Close"
import GpsFixedIcon from "@material-ui/icons/GpsFixed"
import { useDispatch, useSelector } from "react-redux"

//reusable button
import PrimaryIconButton from "../../reusableComponent/primaryButton.component"
import {
	setLocation,
	setLocationFromPin,
} from "../../../store/location/locationActions"

const dummyData = {
	abc: { city: "a", state: "b" },
}

const useStyles = makeStyles((theme) => ({
	blue: {
		color: "#2BBEC8",
	},
	container: {
		position: "absolute",
		bottom: "2rem",
	},
}))

const options = {
	provider: "mapquest",

	// Optional depending on the providers
	httpAdapter: "https", // Default
	apiKey: "Lhu9s4fQBXxbRNd69dsMuihNuXtKZGkmLhu9s4fQBXxbRNd69dsMuihNuXtKZGkm", // for Mapquest, OpenCage, Google Premier
	formatter: null, // 'gpx', 'string', ...
}

const geocoder = GeoCoder(options)

const LocationAccess = ({ history }) => {
	const returnBackToAllowAccessPage = (e) => {
		history.goBack()
	}

	const state = useSelector((state) => state.location.st)
	const city = useSelector((state) => state.location.city)

	const [cityPinCode, setCityPinCode] = useState("")
	const [result, setResult] = useState({ state: "", city: "", error: false })
	const stateRef = useRef(null)
	const cityRef = useRef(null)
	const [lat, setLat] = useState(null)
	const [lon, setLon] = useState(null)
	const [loc, setLoc] = useState(false)

	const classes = useStyles()

	const dispatch = useDispatch()

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude)
				setLon(position.coords.longitude)
			})
		} else {
			console.log("geolocation not supported.")
		}
	}
	useEffect(() => {
		getLocation()

		if (lat && lon && loc) {
			dispatch(setLocation(lat, lon))
		}
	}, [lat, lon, loc])

	const getCityFromPin = async () => {
		dispatch(setLocationFromPin(cityPinCode))
	}

	// const setCurrentLocation = (e) => {
	// 	function success(position) {
	// 		const latitude = position.coords.latitude
	// 		const longitude = position.coords.longitude
	// 		console.log(longitude, latitude)
	// 	}

	// 	function error() {
	// 		alert("Unable to retrieve your location")
	// 	}

	// 	if (!navigator.geolocation) {
	// 		alert("Geolocation is not supported by your browser")
	// 	} else {
	// 		navigator.geolocation.getCurrentPosition(success, error)
	// 	}
	// }

	useEffect(() => {
		if (cityPinCode.length !== 0) {
			if (cityPinCode in dummyData) {
				setResult({
					state: dummyData.abc.state,
					city: dummyData.abc.city,
					error: false,
				})
			} else {
				setResult({ error: true })
			}
		}
	}, [cityPinCode])

	// useEffect(() => {
	// 	if (!result.error) {
	// 		stateRef.current.value = result.state
	// 		cityRef.current.value = result.city
	// 	}
	// }, [result])

	return (
		<div className="locationAccessContainer">
			<div className="locationAccess">
				<div className="locationAccessHeader">
					<div className="searchContainer">
						<div className="searchLabel">Search</div>
						<div className="searchIcon">
							<CloseIcon onClick={returnBackToAllowAccessPage} />
						</div>
					</div>
					<div
						className="setCurrentLocationContainer"
						onClick={() => setLoc(true)}
					>
						<div className="setCurrrentLocationIcon">
							<GpsFixedIcon className={classes.blue} />
						</div>
						<div className="setCurrentLocationLabel">Set Current Location</div>
					</div>
				</div>

				<div className="enterCityPincode">
					<div className="inputCityPincodeIcon">
						<LocationOnIcon />
					</div>
					<input
						id="cityPincodeInput"
						value={cityPinCode}
						onChange={(e) => {
							setCityPinCode(e.target.value)
						}}
						placeholder="Enter Pin Code Or City Name"
					/>
					{/* {result.error ? (
						<p className="cityPincodeInputError">no result found enter again</p>
					) : null} */}
				</div>

				<div className="cityPincodeSearchResult">
					<input id="state" disabled value={state} placeholder="state" />
				</div>

				<div className="cityPincodeSearchResult">
					<input id="city" disabled value={city} placeHolder="city" />
				</div>
				<div className="setCityPinCodeSearchOk">
					<PrimaryIconButton label="ok" onClick={getCityFromPin} />
				</div>
			</div>
			{/* <Grid
				container
				className={classes.container}
				xs={12}
				alignItems="center"
				justify="center"
			>
				<Grid item xs={8}>
					<Link to="/home">
						<PrimaryIconButton label="Home" />
					</Link>
				</Grid>
			</Grid> */}
		</div>
	)
}

export default withRouter(LocationAccess)
