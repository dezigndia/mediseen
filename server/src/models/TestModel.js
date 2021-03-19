const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    hasDiscount: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        min: 0,
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    qtyType: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    },
    fastingRequired: {
        type: Boolean, // only in tests
    },
    weight: {
        type: String, // in kgs
    },
    businessName: {
        type: String,
    },
})

const Test = mongoose.model("Test", testSchema)

module.exports = Test
