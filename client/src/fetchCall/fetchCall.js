import { getItem } from "../services/storage";

const fetchCall = async (endpoint, method, jwt, body, type) => {
  let data;
  let jwtReq = getItem("auth_token");
  //   jwtReq.splice(0, 3);
  console.log(jwtReq, "jwt token");

  const response = await fetch(`http://13.235.95.152:5001/api/${endpoint}`, {
    method: `${method}`,
    headers: {
      Accept: "application/json",
      "Content-Type":
        type === "file"
          ? "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
          : "application/json",
      Authorization: jwtReq
        ? `Bearer ${jwtReq.substring(1, jwtReq.length - 1)}`
        : "Bearer",
    },
    body: body && type === "file" ? body : JSON.stringify(body),
  });

  console.log(response);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.clear();
      window.location.assign("/");
    }
    data = { sucess: false, errCode: response.status };
  } else {
    data = { sucess: true, data: await response.json() };
  }

  return data;
};

export default fetchCall;
