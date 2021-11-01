const mongoose = require("mongoose")

const clinicSchema = require("./Schemas/clinicSchema")
const commonSchema = require("./Schemas/commonSchema")
const paymentSchema = require("./Schemas/paymentSchema")
const workSchema = require("./Schemas/workTimings")

const doctorSchema = new mongoose.Schema(
    {
        ...commonSchema,
        type: {
            type: "string",
            default: "doctor",
        },
        image: {
            type: String,
        },
        clinic: {
            type: [clinicSchema],
            default: [],
            _id: false,
        },
        payment: {
            type: paymentSchema,
        },
        workingHours: {
            type: workSchema,
        },
    },
    { timestamps: true }
)

doctorSchema.methods.toJSON = function () {
    const doctor = this
    const doctorObject = doctor.toObject()

    delete doctorObject.password
    return doctorObject
}

doctorSchema.pre("save", function () {
    this.type = "doctor"
})
const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor
