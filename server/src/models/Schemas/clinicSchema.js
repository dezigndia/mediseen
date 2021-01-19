const mongoose = require("mongoose")
const workSchema = require("./workTimings")

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    fee: {
        type: Number,
    },
    timePerSlot: {
        type: String, // in minutes
    },
    feeCollect: {
        type: String,
    },
    teleConsulting: {
        type: Boolean,
    },
    workingHours: {
        type: workSchema,
    },
})

module.exports = clinicSchema
