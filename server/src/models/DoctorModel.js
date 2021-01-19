const mongoose = require("mongoose")

const clinicSchema = require("./Schemas/clinicSchema")
const commonSchema = require("./Schemas/commonSchema")
const paymentSchema = require("./Schemas/paymentSchema")

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
        },
        payment: {
            type: paymentSchema, //REVIEW if array of object
        },
        //REVIEW education: [{ type: String }],
        //REVIEW  websiteProfile
    },
    { timestamps: true }
)
doctorSchema.pre("save", function () {
    this.type = "doctor"
})
const Doctor = mongoose.model("Doctor", doctorSchema, "business")

module.exports = Doctor
