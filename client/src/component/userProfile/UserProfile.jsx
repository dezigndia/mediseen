import React from "react"
import { Switch, Route } from "react-router"
import Appointment from "./Appointment"
import Order from "./Order"
import Prescription from "./Prescription"
import Profile from "./Profile"

const UserProfile = () => {
	return (
		<Switch>
			<Route path="/user-profile/pres/:id" component={Prescription} />
			<Route path="/user-profile/appointment/:id" component={Appointment} />
			<Route path="/user-profile/order/:id" component={Order} />
			<Route path="/" component={Profile} />
		</Switch>
	)
}

export default UserProfile
