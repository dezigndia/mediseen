const fetchCall = async (endpoint, method, jwt, body) => {
	let data
	const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
		method: `${method}`,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: jwt ? `Bearer ${jwt}` : "Bearer",
		},
		body: body ? JSON.stringify(body) : null,
	})

	if (!response.ok) {
		data = { sucess: false, errCode: response.status }
	} else {
		data = { sucess: true, data: await response.json() }
	}

	return data
}

export default fetchCall
