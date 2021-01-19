const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    ownerId:{
        type: String,
        required: true,
    },
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
        type: String,
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
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product