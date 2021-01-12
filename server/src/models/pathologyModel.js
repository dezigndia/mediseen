const mongoose = require("mongoose")

const addressSchema = require("./Schemas/addressSchema")
const contactSchema = require("./Schemas/contactSchema")
const paymentSchema = require("./Schemas/paymentSchema")
const workSchema = require("./Schemas/workTimings")

const pathologySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
        address: [addressSchema],
        contact: [contactSchema],
        image: String,
        workTimings: [workSchema],
        payment: [paymentSchema],
        testName:{type:String},
        testPrice:{type:String},
		
	},
	{ timestamps: true }
)

const Pathology = mongoose.model("Pathology", pathologySchema)

module.exports = Pathology
