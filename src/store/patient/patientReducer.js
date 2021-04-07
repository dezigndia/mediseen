const initialState = {}

const patient = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_PATIENT":
			return { ...payload }
		default:
			return state
	}
}

export default patient
