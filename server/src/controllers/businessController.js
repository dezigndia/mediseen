const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
const config = require("config")
const BusinessService = require("../services/business/business.service")
const businessService = new BusinessService()

class BusinessController {
    getBusinessList = expressAsyncHandler(async (req, res) => {
        const { limit, skip, category, specialist, area, search } = req.query

        const data = await businessService.getAllBusiness(
            limit,
            skip,
            category,
            specialist,
            area,
            search
        )

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Businesss List not found.")
        }
    })
    getBusinessCount = expressAsyncHandler(async (req, res) => {
        const { category, specialist, area, search, city } = req.query

        const data = await businessService.getBusinessCount(
            city,
            category,
            specialist,
            area,
            search
        )
        return res.status(StatusCodes.OK).json({ status: true, payload: data })
    })
    createNewBusiness = expressAsyncHandler(async (req, res) => {
        const { category } = req.query
        const body = req.body
        const data = await businessService.createNewBusiness(category, body)

        if (data) {
            const token = await jwt.sign(
                data.toObject(),
                config.has("jwt.secret") ? config.get("jwt.secret") : null
            )
            return res.status(StatusCodes.OK).json({ status: true, payload: data, token: token })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Busisness could'nt be added")
        }
    })
    getBusinessDetails = expressAsyncHandler(async (req, res) => {
        const { phone, type } = res.locals.user
        const data = await businessService.getBusinessByPhoneNumber(phone, type)
        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }
    })
    getBusinessByPhoneNumber = expressAsyncHandler(async (req, res) => {
        const { phoneNumber } = req.query
        const data = await businessService.getBusinessByPhoneNumber(phoneNumber)
        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Businesss not found with given phone.")
        }
    })
    updateBusiness = expressAsyncHandler(async (req, res) => {
        const { phone, type } = res.locals.user
        const updateData = req.body
        const data = await businessService.updateBusiness(type, phone, updateData)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: "Updated" })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }
    })
    deleteBusiness = expressAsyncHandler(async (req, res) => {
        try {
            const { phone } = res.locals.user
            await businessService.deleteBusiness(phone)

            return res
                .status(StatusCodes.OK)
                .json({ status: true, payload: "deleted successfully" })
        } catch (err) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }
    })
}

module.exports = BusinessController
