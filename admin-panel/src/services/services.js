import { baseUrl } from "variables/constants";
import { endPointsArray } from "variables/constants";
import { testurl } from "variables/constants";

export const fetchCall = async (type, body = null, queryParams = null) => {
  let data;
  const jwt = JSON.parse(localStorage.getItem("userData"));
  console.log(jwt);
  const { method, endpoint } = endPointsArray[type];
  console.log(
    "links",
    `${testurl + endpoint + queryParams ? "/" + queryParams : ""}`
  );
  try {
    const response = await fetch(
      `${testurl + endpoint}${queryParams ? "?" + queryParams : ""}`,
      {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: jwt ? jwt.token : "Bearer",
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    if (!response.ok) {
      data = { success: false, errCode: response.status };
    } else {
      data = { success: true, data: await response.json() };
    }

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const isLoggedIn = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  return userData && userData.token ? true : false;
};
export const removeEmptyFromObject = (obj) => {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
};
export const convertBodyToQueryParams = (body) => {
  return new URLSearchParams(body).toString();
};
