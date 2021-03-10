const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
        },
        mobileNumber: {
            type: String,
            required: true,
        },
        userPhoneNumber: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
        },
        bill: {
            type: String,
            default: "",
        },
        businessName: {
            type: String,
            required: true,
        },
        businessPhoneNumber: {
            type: String,
            required: true,
        },
        businessType: {
            type: String,
            required: true,
        },
        productType: {
            type: String,
        },
        products: {
            type: [
                {
                    productId: String,
                },
                {
                    qty: Number,
                },
            ],
            default: [],
            minlength: 1,
        },
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
        isPrescription: {
            type: Boolean,
            default: false,
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
