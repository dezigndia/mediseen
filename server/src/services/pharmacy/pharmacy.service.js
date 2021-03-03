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
}
module.exports = PharmacyService
