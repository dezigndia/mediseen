const mongoose = require("mongoose")
const commonSchema = require("./Schemas/commonSchema")
const deliverySchema = require("./Schemas/deliverySchema")
const paymentSchema = require("./Schemas/paymentSchema")
const staffSchema = require("./Schemas/staffSchema")
const workSchema = require("./Schemas/workTimings")

const pharmacySchema = new mongoose.Schema(
    {
        ...commonSchema,
        type: {
            type: "string",
            default: "pharmacy",
        },
        workingHours: {
            type: workSchema,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        staffs: {
            type: [staffSchema],
            default: [],
        },
        payment: {
            type: [paymentSchema],
            default: [],
        },
        // Products Model Separated
        // products: {
        //     type: [productSchema],
        //     default: [],
        // },
        deliveryDetails: {
            type: deliverySchema,
        },
        //REVIEW need to confirm if required
        // about: {
        //     type: String,
        // },
        // status: {
        //     type: String,
        // },
        // loggedIn: {
        //     type: Boolean,
        //     // default: true,
        // },
    },
    { timestamps: true }
)

pharmacySchema.pre("save", function () {
    this.type = "pharmacy"
})
const Pharmarcy = mongoose.model("Pharmarcy", pharmacySchema, "business")

module.exports = Pharmarcy
