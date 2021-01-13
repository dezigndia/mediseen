const mongoose = require("mongoose")

const deliverySchema = new mongoose.Schema({
    type: {
        //need to make it enum
        type: String,
        required: true,
    },
    deliveryCharges: {
        type: String,
    },
    minimumAmount: {
        type: String,
    },
    codAvailable: {
        type: Boolean,
    },
    deliveryDistance: {
        type: String,
    },
})

module.exports = deliverySchema
