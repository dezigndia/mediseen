export const addTestToCart = (payload) => {
	return { type: "ADD_TEST_PRODUCT", payload: payload }
}

export const addLabTimings = (payload) => {
	return { type: "ADD_LAB_TIME", payload: payload }
}

export const addLabAddress = (payload) => {
	return { type: "ADD_LAB_ADDRESS", payload: payload }
}
