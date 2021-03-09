const initialState = {
	tests: [],
	timings: {},
	address: {},
}

const lab = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_TEST_PRODUCT": {
			return { ...state, tests: [...state.tests, payload] }
		}
		case "ADD_LAB_TIME": {
			return { ...state, timings: payload }
		}
		case "ADD_LAB_ADDRESS": {
			return { ...state, address: payload }
		}
		default:
			return state
	}
}

export default lab
