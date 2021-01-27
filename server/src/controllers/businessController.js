const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const BusinessService = require("../services/business/business.service")
const businessService = new BusinessService()

class BusinessController {
    getBusinessList = expressAsyncHandler(async (req, res) => {
        const { limit, skip, category, specialist, area } = req.query

        const data = await businessService.getAllBusiness(limit, skip, category, specialist, area)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(statusCodes.NOT_FOUND, "Businesss List not found.")
        }
    })

}

module.exports = BusinessController
