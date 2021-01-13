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
        // need to make it enum
        type: String,
        required: true,
    },
    _id: true,
})

module.exports = staffSchema
