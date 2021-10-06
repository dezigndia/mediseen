import { SET_LOCATION } from "./locationActionTypes"

export const setLocation = (lat, lng) => async (dispatch) => {
	console.log(lat, lng)
	const data = await fetch(
		`http://www.mapquestapi.com/geocoding/v1/reverse?key=HGR67zGLZxGYOpVHNO95fv3TQTHHFKe0`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				location: {
					latLng: {
						lat,
						lng,
					},
				},
				options: {
					thumbMaps: false,
				},
				includeNearestIntersection: true,
				includeRoadMetadata: true,
			}),
		}
	).then((res) => res.json())

	if (data.results[0].locations.length > 0) {
		const payload = {
			state: data.results[0].locations[0].adminArea3,
			city: data.results[0].locations[0].adminArea5,
		}
		dispatch({ type: "SET_LOCATION", payload })
	}
}

export const setLocationFromPin = (code) => async (dispatch) => {
	const data = await fetch(
		`http://www.mapquestapi.com/geocoding/v1/address?key=HGR67zGLZxGYOpVHNO95fv3TQTHHFKe0`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				location: code,
				options: {
					thumbMaps: false,
				},
			}),
		}
	).then((res) => res.json())

	if (data.results[0].locations.length > 0) {
		const payload = {
			state: data.results[0].locations[0].adminArea3,
			city: data.results[0].locations[0].adminArea5,
		}
		dispatch({ type: "SET_LOCATION", payload })
	}
}
