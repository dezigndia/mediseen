import React from "react"
import { Switch, Route } from "react-router"
import Appointment from "./Appointment"
import Order from "./Order"
import OrderPlace from "./PlaceOrder"
import Prescription from "./Prescription"
import Profile from "./Profile"
import AddAddress from "./AddAddress"
import Success from "./Success"

const UserProfile = () => {
	return (
		<Switch>
			<Route path="/user-profile/pres/:id" component={Prescription} />
			<Route path="/user-profile/appointment/:id" component={Appointment} />
			<Route path="/user-profile/order/:id" component={Order} />
			<Route path="/user-profile/order-place/:id" component={OrderPlace} />
			<Route path="/user-profile/add-address" component={AddAddress} />
			<Route path="/user-profile/success" component={Success} />
			<Route path="/" component={Profile} />	
		</Switch>
	)
}

export default UserProfile
