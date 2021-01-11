const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
		hashed_pass: {
			type: String,
		},
		phone: String,
		status: String,
		loggedIn: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
