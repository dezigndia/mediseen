import { getItem } from "../services/storage";
const fetchCallFile = async (endpoint, method, jwt, body) => {
	let data;
	let jwtReq = getItem("auth_token");
	console.log(jwtReq, "jwt token");
	const response = await fetch(`http://13.235.95.152:5001/api/${endpoint}`, {
		// const response = await fetch(`http://localhost:5001/api/${endpoint}`, {
		method: `${method}`,
		headers: {
			Accept: "application/json",
			Authorization: jwtReq
			? `Bearer ${jwtReq.substring(1, jwtReq.length - 1)}`
			: "Bearer",
		},
		body: body,
	})

	if (!response.ok) {
		data = { sucess: false, errCode: response.status }
	} else {
		data = { sucess: true, data: await response.json() }
	}

	return data
}

export default fetchCallFile
