const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	pincode: {
		type: Number,
		required: true,
	},
	area: {
		type: String,
		required: true,
	},
	_id: false,
})

module.exports = addressSchema
