const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        phone: {
            type: String,
        },
        status: {
            type: String,
        },
        photo: {
            type: String,
        },
        loggedIn: {
            type: Boolean,
        },
        type: {
            type: String,
            default: "user",
        },
        photos: {
            type: [String],
            default: [],
        },
        address: [
            {
                name: {
                    type: String,
                    required: true,
                },
                number: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                state: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                },
                pincode: {
                    type: Number,
                    required: true,
                },
                area: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
    },
    { timestamps: true }
)

userSchema.pre("save", function () {
    this.type = "user"
})

const User = mongoose.model("User", userSchema)

module.exports = User
