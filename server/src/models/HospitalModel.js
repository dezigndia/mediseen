const mongoose = require("mongoose")

const AddressSchema = require("./Schemas/addressSchema")
const ContactSchema = require("./Schemas/contactSchema")


const hospitalSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
        address: [AddressSchema],
        contact: [ContactSchema],
        image: String,
        total_employees: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: true,
        },
        isVerified: {
			type: Boolean,
			default: true,
		}
	},
	{ timestamps: true }
)

const Hospital = mongoose.model("Hospital", hospitalSchema)

module.exports = Hospital
