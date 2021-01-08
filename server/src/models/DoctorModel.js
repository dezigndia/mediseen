const mongoose = require("mongoose")

const clinicSchema = require("./Schemas/clinicSchema")
const paymentSchema = require("./Schemas/paymentSchema")

const doctorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
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
		clinic: [clinicSchema],
		education: [{ type: String }],
		payment: paymentSchema,
	},
	{ timestamps: true }
)

const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor
