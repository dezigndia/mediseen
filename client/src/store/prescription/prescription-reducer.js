const prescription = (state = {}, action) => {
	switch (action.type) {
		case "SET_PRES_IMAGE":
			console.log(action.payload)
			return { ...state, image: action.payload }
		default:
			return state
	}
}

export default prescription
