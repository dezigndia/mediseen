const tokenReducer = (state = {}, action) => {
	switch (action.type) {
		case "UPDATE_ACCESS_TOKEN":
			console.log(action.payload)
			return { token: action.payload,accessToken:action.payload };
		default:
			return state
	}
}

export default tokenReducer
