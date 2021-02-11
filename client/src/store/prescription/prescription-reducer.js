const initialState = {
	image: {},
}

const prescription = (state = initialState, action) => {
	switch (action.type) {
		case "SET_PRES_IMAGE":
			return { ...state, image: action.payload }
		default:
			return state
	}
}

export default prescription
