const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema(
    {
        userPhoneNumber: {
            type: String,
        },
        buisnessPhoneNumber: {
            type: String,
        },
        createdBy: {
            type: String,
        },
        createdByType: {
            type: String,
        },
        buisnessType: {
            type: String,
        },
        buisnessName: {
            type: String,
        },
        timings: {
            from: { type: String },
            to: { type: String },
        },
        isCancelled: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },
        patient: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            mobileNumber: {
                type: String,
            },
            gender: {
                type: String,
            },
            dob: {
                type: String,
            },
            age: {
                type: String,
            },
            month: {
                type: String,
            },
            paymentStatus: {
                type: String,
            },
            videoConsulting: {
                type: Boolean,
            },
        },
    },
    { timestamps: true }
)

const Appointment = mongoose.model("appointment", appointmentSchema)

module.exports = Appointment
