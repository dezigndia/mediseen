const Pharmarcy = require("../../models/PharmacyModel")
const expressAsyncHandler = require("express-async-handler")

class PharmacyService {
    createPharmacy = expressAsyncHandler(async body => {
        return await Pharmarcy.create(body)
    })

    getPharmacy = expressAsyncHandler(async (type, value, limit, skip) => {
        if (!type) {
            return await Pharmarcy.find().limit(parseInt(limit)).skip(parseInt(skip))
        } else {
            let payload = {}
            payload[`${type}`] = value
            return await Pharmarcy.findOne(payload)
        }
    })
    getPharmacyProductCategories = expressAsyncHandler(async () => {
        return [
            { label: "Category 1", value: "1" },
            { label: "Category 2", value: "2" },
            { label: "Category 3", value: "3" },
            { label: "Category 4", value: "4" },
        ]
    })
    getPharmacyStaffRoles = expressAsyncHandler(async () => {
        return [
            { label: "Delivery Boy", value: "delivery_boy" },
            { label: "Role 2", value: "role2" },
        ]
    })
}
module.exports = PharmacyService
