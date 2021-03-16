export const addCurrentStore = (payload) => {
	return { type: "ADD_CURRENT_STORE", payload: payload }
}

export const removeCurrentStore = (payload) => {
	return { type: "REMOVE_CURRENT_STORE", payload: payload }
}
