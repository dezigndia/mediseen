const fetchCall = async (endpoint, method, jwt, body, type) => {
	let data
	const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
		method: `${method}`,
		headers: {
			Accept: "application/json",
			"Content-Type":
				type === "file"
					? "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
					: "application/json",
			Authorization: jwt ? `Bearer ${jwt}` : "Bearer",
		},
		body: body && type === "file" ? body : JSON.stringify(body),
	})

	console.log(response)

	if (!response.ok) {
		data = { sucess: false, errCode: response.status }
	} else {
		data = { sucess: true, data: await response.json() }
	}

	return data
}

export default fetchCall
