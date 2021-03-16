const initialState = []

const user = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_USER":
			return { ...payload }

		default:
			return state
	}
}

export default user
