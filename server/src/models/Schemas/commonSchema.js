const commonSchema = {
    phone: {
        type: String,
    },
    buisnessName: {
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
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    specialist: {
        type: String,
        required: true,
    },
    document: {
        type: String,
    },
    // image: {
    //     type: String, //optional, only for Hospital etc
    // },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}

module.exports = commonSchema
