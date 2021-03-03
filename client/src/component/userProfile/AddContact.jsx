import React from "react"
import { Grid, Paper } from "@material-ui/core"
import { useSpring, animated } from "react-spring/web.cjs"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	paper: {
		backgroundColor: "white",
		padding: "2rem 1rem",
		width: "95vw",
		maxWidth: "50rem",
	},
	colorBlue: {
		color: "blue",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: "1.2rem",
		width: "100%",
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

const AddContact = ({ open, setOpen }) => {
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
						alignItems="center"
						justify="center"
						spacing={2}
						xs={12}
					>
						<Grid item xs={12}>
							<h3 style={{ textAlign: "center" }}>Add/Edit Contact</h3>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase className={classes.input} placeholder="Name" />
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase className={classes.input} placeholder="Mobile" />
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase className={classes.input} placeholder="Address" />
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper component="form" elevation={3} className={classes.search}>
								<InputBase className={classes.input} placeholder="Pincode" />
							</Paper>
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		</Modal>
	)
}

export default AddContact
