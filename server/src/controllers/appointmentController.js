const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppointmentService = require("../services/appointment/appointment.service")
const AppError = require("../utils/errorHandler")

const appointmentService = new AppointmentService()

class AppointmentController {
    createAppointment = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        let bodydata = req.body
        user.type == "user"
            ? (bodydata.userPhoneNumber = user.phone)
            : (bodydata.businessPhoneNumber = user.phone)

        bodydata.createdBy = user.phone
        bodydata.createdByType = user.type
        const data = await appointmentService.createAppointment(bodydata)
        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAppointmentbybusiness = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        const { limit, skip } = req.query
        const searchQuery = req.query
        if (!(user.type == "doctor" || user.type == "hospital")) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const data = await appointmentService.getAppointmentbybusiness(
            limit,
            skip,
            user.phone,
            searchQuery
        )

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAppointmentbyUser = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        const { limit, skip } = req.query
        const searchQuery = req.query
        if (user.type != "user") {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const data = await appointmentService.getAppointmentbyUser(
            limit,
            skip,
            user.phone,
            searchQuery
        )

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAppointmentbyId = expressAsyncHandler(async (req, res) => {
        const { id } = req.params
        const data = await appointmentService.getAppointmentbyId(id)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    updateAppointmentbyId = expressAsyncHandler(async (req, res) => {
        const { id } = req.params
        const newData = req.body
        const data = await appointmentService.updateAppointmentbyId(id, newData)
        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
}

module.exports = AppointmentController
