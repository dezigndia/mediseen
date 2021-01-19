const Doctor = require("../../models/DoctorModel")
const expressAsyncHandler = require("express-async-handler")

class BusinessService {
    getAllBusiness = expressAsyncHandler(async (limit, skip, category, specialist, area) => {
        let filter = {}
        if (area) {
            filter.area = area
        }
        if (specialist) {
            filter.specialist = specialist
        }
        if (category) {
            filter.type = category
        }
        return await Doctor.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
    })
}
module.exports = BusinessService
