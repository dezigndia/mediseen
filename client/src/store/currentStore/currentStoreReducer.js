const initialState = []

const currentStore = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_CURRENT_STORE":
			return { ...payload }
		case "REMOVE_CURRENT_STORE":
			return {}
		default:
			return state
	}
}

export default currentStore
