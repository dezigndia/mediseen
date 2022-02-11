const Doctor = require("../../models/DoctorModel")
const Hospital = require("../../models/HospitalModel")
const Pathology = require("../../models/PathologyModel")
const Pharmacy = require("../../models/PharmacyModel")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../../utils/errorHandler")
const expressAsyncHandler = require("express-async-handler")
const { getRegex, splitStringRegex } = require("../../utils/getRegex")
const buisnessHelper = require("../../utils/buisnessHelper")

class BusinessService {
    createNewBusiness = expressAsyncHandler(async (category, data) => {
        if (data && data.phone) {
            // const found = await Doctor.findOne({ phone: data.phone })
            // // if (found) {
            //     console.log(found)
            //     throw new AppError(StatusCodes.CONFLICT, "The phone number is already registered")
            // }
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
    getPharmacyById = expressAsyncHandler(async id => {
        //FIXME fix type
        return  await Pharmacy.findById(id)
    })

    getPathologyById = expressAsyncHandler(async id => {
        //FIXME fix type
        return  await Pathology.findById(id)
    })

    getDoctorById = expressAsyncHandler(async id => {
        //FIXME fix type
        return await Doctor.findById(id)
    })


    getHospitalById = expressAsyncHandler(async id => {
        //FIXME fix type
        return await Hospital.findById(id)
    })

    getAllBusiness = expressAsyncHandler(
        async (limit, skip, city, category, specialist, area, search, admin = false) => {
            let filter = { isActive: true }
            if (city) {
                filter.area = getRegex(city)
            }
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
                    switch (category) {
                        case "doctor": {
                            return await Doctor.find({
                                $or: [
                                    { businessName: getRegex(searchfirstName) },
                                    { firstName: getRegex(searchfirstName) },
                                ]
                            })
                        }
                        case "pharmacy": {
                            return await Pharmacy.find({
                                $or: [
                                    { businessName: getRegex(searchfirstName) },
                                    { firstName: getRegex(searchfirstName) },
                                ]
                            })
                        }
                        case "hospital": {
                            return await Hospital.find({
                                $or: [
                                    { businessName: getRegex(searchfirstName) },
                                    { firstName: getRegex(searchfirstName) },
                                ]
                            })
                        }
                        case "pathology": {
                            return await Pathology.find({
                                $or: [
                                    { businessName: getRegex(searchfirstName) },
                                    { firstName: getRegex(searchfirstName) },
                                ]
                            })
                        }
                    }
                
            } else {
                //FIXME fix type
                //  return await Pharmarcy.find().limit(parseInt(limit)).skip(parseInt(skip))
                switch (category) {
                    case "doctor": {
                        return await Doctor.find({type: category })
                    }
                    case "pharmacy": {
                        return await Pharmacy.find({type: category })
                    }
                    case "hospital": {
                        return await Hospital.find({type: category })
                    }
                    case "pathology": {
                        return await Pathology.find({type: category })
                    }
                    default: {
                        return  await Doctor.find({type: category })
                    }
                }}
        }
    )

    getBusinessCount = expressAsyncHandler(async (city, category, specialist, area, search) => {
        let filter = {}

        if (city!=="undefined") {
            filter.city = getRegex(city)
        }
        if (area) {
            filter.area = getRegex(area)
        }
        if (specialist) {
            filter.specialist = getRegex(specialist)
        }
        if (category) {
            filter.type = getRegex(category)
        }
        console.log(filter)
        if (filter) {
          
            const doctor = await Doctor.find(filter).count()
            const pharmacy = await Pharmacy.find(filter).count()
            const hospital = await Hospital.find(filter).count()
            const pathology = await Pathology.find(filter).count()
          //  return buisnessHelper.getBusinessCountByType(data)
          let count = {
            doctor: doctor,
            hospital: pharmacy,
            pharmacy: hospital,
            pathology: pathology,
        }
          return  count;
        }
        else {
            //FIXME fix type
            const doctor = await Doctor.find().count()
            console.log("dfdfdfdf")
            const pharmacy = await Pharmacy.find().count()
            const hospital = await Hospital.find().count()
            const pathology = await Pathology.find().count()
          //  return buisnessHelper.getBusinessCountByType(data)
          let count = {
            doctor: doctor,
            hospital: pharmacy,
            pharmacy: hospital,
            pathology: pathology,
        }
          return  count;
        }

    })

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
    acceptDoctor = expressAsyncHandler(async (phoneNumber, docId, status) => {
        if (status === "accept")
            await Hospital.updateOne(
            { phone: phoneNumber, "doctors.doctorId": docId },
            { $set: { "doctors.$.status": "accepted" } }
            )
        else
            await Hospital.updateOne(
                { phone: phoneNumber, "doctors.doctorId": docId },
                { $set: { "doctors.$.status": "rejected" } }
            )
    })
    acceptHospital = expressAsyncHandler(async (phoneNumber, clinicId, status) => {
        if (status ==="accept"){
      await Doctor.updateOne(
                { phone: phoneNumber, "clinic.clinicId": clinicId },
                { $set: { "clinic.$.status": "accepted" } }
        
            )

      }
        else{
            await Doctor.updateOne(
                { phone: phoneNumber, "clinic.clinicId": clinicId },
                { $set: { "clinic.$.status": "rejected" } }
            )
        }
    })

    getPendingRequests = expressAsyncHandler(async (bId, type) => {
        console.log(type, bId)
        if (type ==="doctor") {
            let result = await Hospital.find({ type: "hospital", "doctors.doctorId": bId,"doctors.status":"pending"})
            return result
        } else {
            let result = await Doctor.find({ type: "doctor", "clinic.clinicId": bId,"clinic.status":"pending" })
            return result
        }
    })
}
module.exports = BusinessService
