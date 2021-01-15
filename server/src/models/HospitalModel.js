const mongoose = require("mongoose")

const commonSchema = require("./Schemas/commonSchema")
const paymentSchema = require("./Schemas/paymentSchema")
const staffSchema = require("./Schemas/staffSchema")
const workSchema = require("./Schemas/workTimings")

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
    },

    mobileNumber: {
        type: String,
    },
    fee: {
        type: Number,
    },
    timePerSlot: {
        type: String,
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

const hospitalSchema = new mongoose.Schema(
    {
        ...commonSchema,
        type: {
            type: "string",
            default: "hospital",
        },
        doctors: {
            type: [doctorSchema],
            default: [],
        },
        payment: {
            type: paymentSchema,
        },
        staffs: {
            type: [staffSchema],
            default: [],
        },
        image: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)
hospitalSchema.pre("save", function () {
    this.type = "hospital"
})
const Hospital = mongoose.model("Hospital", hospitalSchema, "business")

module.exports = Hospital
