import React from "react"
import { Switch, Route } from "react-router"
import Profile from "./Profile"

const UserProfile = () => {
	return (
		<Switch>
			<Route path="/" component={Profile} />
		</Switch>
	)
}

export default UserProfile
