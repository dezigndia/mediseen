const Doctor = require("../../models/DoctorModel")
const Hospital = require("../../models/HospitalModel")
const Pathology = require("../../models/PathologyModel")
const Pharmacy = require("../../models/PharmacyModel")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../../utils/errorHandler")
const expressAsyncHandler = require("express-async-handler")
const { getRegex, splitStringRegex } = require("../../utils/getRegex")

class BusinessService {
    createNewBusiness = expressAsyncHandler(async (category, data) => {
        if (data && data.phone) {
            const found = await Doctor.findOne({ phone: data.phone })
            if (found) {
                console.log(found)
                throw new AppError(StatusCodes.CONFLICT, "The phone number is already registered")
            }
            switch (category) {
                case "doctor": {
                    return await Doctor.create(data)
                }
                case "pharmacy": {
                    return await Pharmacy.create(data)
                }
                case "hospital": {
                    return await Hospital.create(data)
                }
                case "pathology": {
                    return await Pathology.create(data)
                }
                default: {
                    throw new AppError(
                        StatusCodes.BAD_REQUEST,
                        "Category must be one of doctor, pharmacy, hospital, pathology"
                    )
                }
            }
        } else {
            throw new AppError(StatusCodes.BAD_REQUEST, "Validation error, phone must be specified")
        }
    })
    getBusinessById = expressAsyncHandler(async id => {
        //FIXME fix type
        return await Doctor.findById(id)
    })
    getAllBusiness = expressAsyncHandler(
        async (limit, skip, category, specialist, area, search) => {
            let filter = {}
            if (area) {
                filter.area = getRegex(area)
            }
            if (specialist) {
                filter.specialist = getRegex(specialist)
            }
            if (category) {
                filter.type = getRegex(category)
            }
            if (search) {
                const op = splitStringRegex(search)
                const searchfirstName = op[0]
                //FIXME fix type
                return Doctor.find({
                    $or: [
                        { businessName: getRegex(search) },
                        { firstName: getRegex(searchfirstName) },
                    ],
                    $and: [filter],
                })
            } else {
                //FIXME fix type
                return await Doctor.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
            }
        }
    )

    getBusinessByPhoneNumber = expressAsyncHandler(async (phoneNumber, category) => {
        switch (category) {
            case "doctor": {
                return await Doctor.findOne({ phone: phoneNumber, type: category })
            }
            case "pharmacy": {
                return await Pharmacy.findOne({ phone: phoneNumber, type: category })
            }
            case "hospital": {
                return await Hospital.findOne({ phone: phoneNumber, type: category })
            }
            case "pathology": {
                return await Pathology.findOne({ phone: phoneNumber, type: category })
            }
            default: {
                throw Error("Category must be one of doctor, pharmacy, hospital, pathology")
            }
        }
    })

    updateBusiness = expressAsyncHandler(async (category, phoneNumber, data) => {
        switch (category) {
            case "doctor": {
                return await Doctor.updateOne(
                    { phone: phoneNumber, type: category },
                    { $set: data }
                )
            }
            case "pharmacy": {
                return await Pharmacy.updateOne(
                    { phone: phoneNumber, type: category },
                    { $set: data }
                )
            }
            case "hospital": {
                return await Hospital.updateOne(
                    { phone: phoneNumber, type: category },
                    { $set: data }
                )
            }
            case "pathology": {
                return await Pathology.updateOne(
                    { phone: phoneNumber, type: category },
                    { $set: data }
                )
            }
            default: {
                throw Error("Category must be one of doctor, pharmacy, hospital, pathology")
            }
        }
    })

    deleteBusiness = expressAsyncHandler(async phoneNumber => {
        await Doctor.deleteOne({ phone: phoneNumber })
    })
}
module.exports = BusinessService
