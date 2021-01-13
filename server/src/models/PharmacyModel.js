const mongoose = require("mongoose")
const deliverySchema = require("./Schemas/deliverySchema")
const paymentSchema = require("./Schemas/paymentSchema")
const productsSchema = require("./Schemas/productsSchema")

const pharmacySchema = new mongoose.Schema(
    {
        phone: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: AddressSchema,
            required: true,
        },
        email: {
            type: String,
        },
        title: {
            type: String,
        },
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        // need to confirm if required
        about: {
            type: String,
        },
        status: {
            type: String,
        },
        loggedIn: {
            type: Boolean,
            default: true,
        },
        workingHours: [workSchema],
        ratings: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        staffsDetails: {
            type: [staffSchema],
        },
        paymentDetails: {
            type: paymentSchema,
        },
        products: {
            type: [productsSchema],
        },
        deliveryDetails: {
            type: deliverySchema,
        },
    },
    { timestamps: true }
)

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema)

module.exports = Pharmacy
