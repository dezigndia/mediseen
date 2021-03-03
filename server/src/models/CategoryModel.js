const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        userPhone: {
            type: String,
        },
        type: {
            type: String,
        },
        values: {
            type: [String],
            default: [],
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Category = mongoose.model("category", categorySchema)

module.exports = Category
