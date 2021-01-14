const mongoose = require("mongoose")

const AddressSchema = require("./addressSchema")
const ContactSchema = require("./contactSchema")
const workSchema = require("./workTimings")

const clinicSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	contact: ContactSchema,
	address: AddressSchema,
	image: String,
	workingHours: [workSchema],
	fee: {
		type: Number,
		default: null,
	},
	feeCollect: String,
	teleConsulting: Boolean,
	_id: false,
})

module.exports = clinicSchema
