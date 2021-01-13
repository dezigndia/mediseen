const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        // need to make it enum
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
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
        type: Number,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
    },
    _id: true,
})

module.exports = productSchema
