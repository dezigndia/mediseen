const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	_id: false,
})

module.exports = contactSchema
