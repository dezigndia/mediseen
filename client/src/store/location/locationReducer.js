import { SET_LOCATION } from "./locationActionTypes"

const initialState = {
	state: null,
	city: null,
}

const locationReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_LOCATION":
			return {
				st: action.payload.state,
				city: action.payload.city,
			}
		default:
			return state
	}
}

export default locationReducer
