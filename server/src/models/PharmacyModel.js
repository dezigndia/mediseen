const mongoose = require("mongoose")
const addressSchema = require("./Schemas/addressSchema")
const deliverySchema = require("./Schemas/deliverySchema")
const paymentSchema = require("./Schemas/paymentSchema")
const productSchema = require("./Schemas/productSchema")
const staffSchema = require("./Schemas/staffSchema")
const workSchema = require("./Schemas/workTimings")

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
            type: addressSchema,
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
            type: [productSchema],
        },
        deliveryDetails: {
            type: deliverySchema,
        },
    },
    { timestamps: true }
)

const Pharmarcy = mongoose.model("Pharmarcy", pharmacySchema)

module.exports = Pharmarcy
