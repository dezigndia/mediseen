const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
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
    company: {
        type: String,
    },
    barcode: {
        type: String,
    },
    weight: {
        type: String,
    },
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
