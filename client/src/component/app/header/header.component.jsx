import React from "react"
import "./header.styles.scss"

import { IconButton, Button } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
// import Search from './search/search.component';
import Search from '../main/searchPage/search/search.component';
import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

/*
 **different headers will be rendered acc to different active pages
 **use  class purpleAppHeader and whiteAppHeader for different Header Colors
 */

const Header = ({ activePage, currentLocation, currentUser }) => {
	const city = useSelector((state) => state.location.city)
	return (
		<header className="appHeader">
				<Search />
			<Link to="/allowAccess/LocationAccess">
				<Button endIcon={<ExpandMoreIcon />}>
					{city ? city : "Set Location"}
				</Button>
			</Link>
			<IconButton>
				<Link to="/user-profile">
					<AccountCircleIcon />
				</Link>
			</IconButton>
		</header>
	)
}

export default Header
