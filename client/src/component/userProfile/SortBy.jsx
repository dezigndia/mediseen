import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { useSpring, animated } from "react-spring/web.cjs" // web.cjs is required for IE 11 support
import Radio from "@material-ui/core/Radio"
import { Grid, Paper } from "@material-ui/core"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import TypeRow from "./TypeRow"

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	paper: {
		backgroundColor: "white",
		padding: "2rem 1rem",
		width: "90vw",
		maxWidth: "50rem",
	},
	colorBlue: {
		color: "blue",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: "1.2rem",
		width: "95%",
	},
	iconButton: {
		padding: 10,
		color: "#23D6BD",
	},
	search: {
		display: "flex",
		alignItems: "center",
		padding: "0.2rem 0.5rem",
		width: "100%",
	},
}))

const Fade = React.forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter()
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited()
			}
		},
	})
	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	)
})

Fade.propTypes = {
	children: PropTypes.element,
	in: PropTypes.bool.isRequired,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
}

const SortBy = ({ open = true, type, setOpen }) => {
	const classes = useStyles()
	return (
		<Modal
			onClose={() => setOpen(false)}
			className={classes.modal}
			open={open}
			closeAfterTransition={true}
		>
			<Fade in={open}>
				<Paper className={classes.paper} elevation={3}>
					<Grid
						container
						spacing={2}
						alignItems="center"
						direction="column"
					>
						<Grid item xs={12}>
							<h2 style={{ textAlign: "center" }}>Record Sort By</h2>
						</Grid>
						<Grid container item alignItems="center">
							<Grid item xs={4}>
								<h4>Sort by</h4>
							</Grid>
							<Grid item container xs={4} alignItems="center">
								<Grid itemxs={6}>
									<Radio checked={true} color="secondary" />
								</Grid>
								<Grid item xs={6}>
									<h5>Date</h5>
								</Grid>
							</Grid>
							<Grid item container xs={4} alignItems="center">
								<Grid itemxs={6}>
									<Radio checked={true} />
								</Grid>
								<Grid item xs={6}>
									<h5>Name</h5>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase
									className={classes.input}
									placeholder="Search..."
									inputProps={{ "aria-label": "search google maps" }}
								/>
								<IconButton
									type="submit"
									className={classes.iconButton}
									aria-label="search"
								>
									<SearchIcon />
								</IconButton>
							</Paper>
						</Grid>
						<Grid item container xs={12}>
							<Grid item>
								<TypeRow order={type} />
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		</Modal>
	)
}

export default SortBy
