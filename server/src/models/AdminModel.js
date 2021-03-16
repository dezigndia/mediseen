const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        departments: {
            type: Array,
            default: [],
        },
        phoneNumber: {
            type: String,
        },
    },
    { timestamps: true }
)

const Admin = mongoose.model("admin", adminSchema)

module.exports = Admin
