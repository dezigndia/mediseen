import React from "react"
import {
	Grid,
	makeStyles,
	ThemeProvider,
	createMuiTheme,
} from "@material-ui/core"
import { Switch, Route, useHistory,Router } from "react-router-dom"

// customComponents
import LoginPage from "./loginAndSignUpPage/loginPage.component"
import AllowAccess from "./allowAccess/allowAccess.component"
import App from "./app/app.component"
import VendorsPannel from "./vendorsPannel/vendorsPannel.component"
import UserProfile from "./userProfile/UserProfile"
import { getItem } from "../services/storage"

// creating style
const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
	},
}))

// modifying theme for theme provider
const newTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#220555",
		},
		secondary: {
			main: "#5C4BD1",
		},
	},
})

// This grid is the root grid with width = screenWidth ,
// it has no break points

const Components = () => {
	const classes = useStyles()
	const history = useHistory();
	return (
		<ThemeProvider theme={newTheme}>
			<Grid container direction="row" justify="center" className={classes.root}>
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={getItem('auth_token') && (history.location.pathname==="/home" || history.location.pathname==="/") ? history.push('/home')  : LoginPage} />
					<Route path="/allowAccess" component={AllowAccess}  />
					<Route path="/home" component={App} />
					<Route path="/user-profile" component={UserProfile} />
					<Route path="/vendor" component={VendorsPannel} />
				</Switch>
				</Router>
			</Grid>
		</ThemeProvider>
	)
}

export default React.memo(Components)
