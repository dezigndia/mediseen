const initialState = {}

const timing = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_BOOK_TIMING":
			return { ...payload }
		default:
			return state
	}
}

export default timing
