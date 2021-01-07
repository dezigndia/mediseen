const mongoose = require("mongoose")

const AddressSchema = require("./Schemas/addressSchema")
const ContactSchema = require("./Schemas/contactSchema")

const doctorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		contact: [ContactSchema],
		address: [AddressSchema],
		image: String,
		isActive: {
			type: Boolean,
			default: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		specialist: {
			type: String,
			default: null,
		},
		workingHours: {
			type: String,
			default: null,
		},
		fee: {
			type: Number,
			default: null,
		},
		education: [{ type: String }],
	},
	{ timestamps: true }
)

const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor
