const mongoose = require("mongoose")
const workSchema = require("./workTimings")

const clinicSchema = new mongoose.Schema({
    clinicId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
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
