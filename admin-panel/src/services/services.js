import { baseUrl } from "variables/constants";
import { endPointsArray } from "variables/constants";
import { testurl } from "variables/constants";
import AlertMessages from "../components/CommonComponents/AlertMessages";
export const fetchCall = async (type, body = null, queryParams = null) => {
  let data;
  const jwt = JSON.parse(localStorage.getItem("userData"));
  const { method, endpoint } = endPointsArray[type];

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
      data = { success: false, data: await response.json() };
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
  // console.log(body);
  const searchParams = new URLSearchParams();
  Object.keys(body).forEach((key) => searchParams.append(key, body[key]));
  console.log(searchParams.toString());
  // return new URLSearchParams(body).toString();
  return searchParams.toString();
};

export function readableDate(date) {
  let d = new Date(date);
  return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}
