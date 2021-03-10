import React, { useState, useCallback } from "react"

import SearchInput from "./searchInput/searchInput.component"
import SearchInputWithSuggestion from "./searchInputWithSuggestion/searchInputWithSuggestion.component"
import PrimaryIconButton from "../../../../reusableComponent/primaryButton.component"

import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		alignItems: "center",
		padding: "0.2rem 0.5rem",
		width: "70%",
	},
	container: {
		margin: "1rem 0.5rem",
		display: "flex",
		alignItems: "center",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: "1.2rem",
	},
	iconButton: {
		padding: 10,
		color: "#23D6BD",
	},
	button: {
		width: "25%",
		marginLeft: "1rem",
	},
}))

const Search = () => {
	const [isFocused, setIsFocused] = useState(false)
	const [recentSearches, setRecentSearches] = useState(["abc", "abc", "abc"])

	const classes = useStyles()

	const focusHandler = useCallback((e) => {
		setIsFocused(true)
	}, [])

	const blurHandler = useCallback((e) => {
		setIsFocused(false)
	}, [])

	return (
		<React.Fragment>
			<div className={classes.container}>
				<Paper component="form" elevation={3} className={classes.paper}>
					<InputBase
						className={classes.input}
						placeholder="Medicine, doctors, clinic, Hospitals...."
					/>
					<IconButton
						type="submit"
						className={classes.iconButton}
						aria-label="search"
					>
						<SearchIcon />
					</IconButton>
				</Paper>
				<div className={classes.button}>
					<PrimaryIconButton label="ReOrder" />
				</div>
			</div>

			{/* {isFocused ? (
				<SearchInputWithSuggestion {...{ recentSearches, blurHandler }} />
			) : null} */}
		</React.Fragment>
	)
}

export default Search
