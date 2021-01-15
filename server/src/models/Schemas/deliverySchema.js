const mongoose = require("mongoose")

const deliverySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["pickup", "delivery"],
        required: true,
    },
    deliveryCharges: {
        type: Number,
    },
    minimumAmount: {
        type: Number,
    },
    codAvailable: {
        type: Boolean,
    },
    deliveryDistance: {
        type: Number, //in kms
    },
})

module.exports = deliverySchema
