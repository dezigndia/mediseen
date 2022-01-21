const mongoose = require("mongoose")
const autoIncrement = require("mongoose-auto-increment")
const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: Number,
        },
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
                    productId: { type: String, required: true },
                    name: { type: String, required: true },
                    sellingPrice: { type: Number, required: true },
                    qty: { type: Number, required: true },
                },
            ],
            _id: false,
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
        assignedDeliveryPerson: {
            type: String,
        },
        assignedCollectionPerson: {
            type: String,
        },
    },
    { timestamps: true }
)
autoIncrement.initialize(mongoose.connection)

orderSchema.plugin(autoIncrement.plugin, {
    model: "Order",
    field: "orderId",
    startAt: 1234,
    incrementBy: 1,
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order

function arrayLimit(val) {
    return val.length > 0
}
