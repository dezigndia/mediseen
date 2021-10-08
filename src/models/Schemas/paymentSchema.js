const mongoose = require("mongoose")

const bankSchema = new mongoose.Schema({
    ifsc: {
        type: String,
        required: true,
    },
    accNum: {
        type: String,
        required: true,
    },
})

const paymentSchema = new mongoose.Schema({
    _id: false,
    onlinePayment: {
        type: Boolean,
    },
    type: {
        type: String,
        enum: ["upi", "bank"],
    },
    upiId: {
        type: String,
    },
    bankInfo: [bankSchema], //REVIEW  was given an array , but in UI it is one object
})

module.exports = paymentSchema
