const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema(
    {
        userPhoneNumber: {
            type: String,
            required: true,
        },
        businessPhoneNumber: {
            type: String,
            required: true,
        },
        doctor: {
            type: String,
        },
        address: {
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            pincode: {
                type: Number,
            },
            area: {
                type: String,
            },
        },
        createdBy: {
            type: String,
            required: true,
        },
        createdByType: {
            type: String,
            required: true,
        },
        businessType: {
            type: String,
            required: true,
        },
        businessName: {
            type: String,
            required: true,
        },
        timings: {
            from: { type: String },
            to: { type: String },
        },
        date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "paid", "completed","cancelled"],
            default: "pending",
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
