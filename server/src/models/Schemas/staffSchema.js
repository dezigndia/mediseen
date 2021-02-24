const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

module.exports = staffSchema
