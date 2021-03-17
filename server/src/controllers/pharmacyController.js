const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const BusinessService = require("../services/business/business.service")
const businessService = new BusinessService()

const PharmacyService = require("../services/pharmacy/pharmacy.service")
const pharmacyService = new PharmacyService()

class PharmacyController {
    createPharmacy = expressAsyncHandler(async (req, res) => {
        const data = await pharmacyService.createPharmacy(req.body)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })

    getPharmacies = expressAsyncHandler(async (req, res) => {
        const { limit, skip } = req.query

        const data = await pharmacyService.getPharmacy(null, null, limit, skip)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Pharmacy List not found.")
        }
    })

    getPharmacyByID = expressAsyncHandler(async (req, res) => {
        const { pharmacyId } = req.params
        console.log(pharmacyId)
        const data = await businessService.getBusinessById(pharmacyId)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Pharmacy not found with given id.")
        }
    })
}

module.exports = PharmacyController
