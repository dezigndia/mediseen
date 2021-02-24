const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        patientName: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },
        userPhoneNumber: {
            type: String,
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        image_url: {
            type: String,
        },
        buisnessPhoneNumber: {
            type: String,
        },
        buisnessType: {
            type: String,
        },
        productType: {
            type: String,
        },
        products: [
            {
                productId: String,
            },
            {
                qty: Number,
            },
        ],
        totalItems: {
            type: Number,
        },
        basePrice: {
            type: Number,
        },
        deliveryCharges: {
            type: Number,
        },
        grandTotal: {
            type: Number,
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
            payment: {
                type: String,
            },
            orderType: {
                type: String,
            },
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "shipped", "delivered", "cancelled", "others"],
            default: "pending",
        },
    },
    { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
