import React, { useEffect } from "react"
import {
	Grid,
	makeStyles,
	ThemeProvider,
	createMuiTheme,
} from "@material-ui/core"
import { Switch, Route,Redirect, useHistory } from "react-router-dom"

import VendorsPannel from "./vendorsPannel/vendorsPannel.component"

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
	
	const classes = useStyles();

	return (
		<ThemeProvider theme={newTheme}>
			<Grid container direction="row" justify="center" className={classes.root}>
				<Switch>
					<Route exact path='/' component={Redirector} />
					<Route path='/vendor' component={VendorsPannel} />
				</Switch>
			</Grid>
		</ThemeProvider>
	)
}


var Redirector=()=>{
	const history=useHistory();
	useEffect(()=>{
		history.push('./vendor');
	});
	return (<div />);
}

export default React.memo(Components)
