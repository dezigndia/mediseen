const mongoose = require("mongoose")

const daySchema = new mongoose.Schema({
    _id: false,
    morning: {
        from: { type: String },
        to: { type: String },
    },
    evening: {
        from: { type: String },
        to: { type: String },
    },
})

const workSchema = new mongoose.Schema({
    _id: false,
    Monday: { type: daySchema },
    Tuesday: { type: daySchema },
    Wednesday: { type: daySchema },
    Thursday: { type: daySchema },
    Friday: { type: daySchema },
    Saturday: { type: daySchema },
    Sunday: { type: daySchema },
})

module.exports = workSchema
