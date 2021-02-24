const mongoose = require("mongoose")

const commonSchema = require("./Schemas/commonSchema")
const paymentSchema = require("./Schemas/paymentSchema")
const staffSchema = require("./Schemas/staffSchema")
const workSchema = require("./Schemas/workTimings")

const collectionSchema = new mongoose.Schema({
    availability: {
        type: String,
        enum: ["customer", "centre"],
    },
    collectionChargesPerVisit: {
        type: Number,
        min: 0,
    },
    minCollectionAmount: {
        type: Number,
        min: 0,
    },
    hardCopyReportDeliveryCharges: {
        type: Number,
        min: 0,
    },
    codAvailable: {
        type: Boolean,
    },
    collectionDistance: {
        type: Number, // in KMs
    },
})
function arrayLimit(val) {
    return val.length <= 3
}
const testSchema = new mongoose.Schema({
    images: {
        type: [String],
        validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
    },
    name: {
        type: String,
    },
    test: {
        type: String,
    },
    mrp: {
        type: String,
    },
    sp: {
        type: String,
    },
    details: {
        type: String,
    },
    qty: {
        type: Number,
    },
    type: {
        type: String,
    },
    fastingRequired: {
        type: Boolean,
        default: false,
    },
})

const pathologySchema = new mongoose.Schema(
    {
        ...commonSchema,
        type: {
            type: "string",
            default: "pathology",
        },
        workingHours: {
            type: workSchema,
        },
        staffs: {
            type: [staffSchema],
            default: [],
        },
        collections: {
            type: collectionSchema,
        },
        payment: {
            type: paymentSchema,
        },
        tests: {
            type: testSchema,
        },
        // address: {
        //     type: [addressSchema],
        //     default: [],
        // },
        // image: String,

        // testName: { type: String },
        // testPrice: { type: String },
    },
    { timestamps: true }
)
pathologySchema.pre("save", function () {
    this.type = "pathology"
})
const Pathology = mongoose.model("Pathology", pathologySchema, "business")

module.exports = Pathology
