const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const { getConditions, getSortingConditions } = require("../services/admin/admin.service")
const AppointmentService = require("../services/appointment/appointment.service")
const { errorMessage } = require("../utils/constants")
const AppError = require("../utils/errorHandler")

const appointmentService = new AppointmentService()

class AppointmentController {
    createAppointment = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        let bodydata = req.body
        user.type == "user"
            ? (bodydata.userPhoneNumber = user.phone)
            : (bodydata.buisnessPhoneNumber = user.phone)

        bodydata.createdBy = user.phone
        bodydata.createdByType = user.type
        const data = await appointmentService.createAppointment(bodydata)
        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAppointmentbyBuisness = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        const { limit, skip } = req.query
        if (!(user.type == "doctor" || user.type == "hospital")) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const data = await appointmentService.getAppointmentbyBuisness(limit, skip, user.phone)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAppointmentbyUser = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        const { limit, skip } = req.query
        if (user.type != "user") {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const data = await appointmentService.getAppointmentbyUser(limit, skip, user.phone)

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
    getAppointments = expressAsyncHandler(async (req, res) => {
        let { limit, skip } = req.query
        limit = limit - "0"
        skip = skip - "0"

        let conditions = getConditions(req)
        let sortingCond = getSortingConditions(req)
        let data = await appointmentService.getAllAppointments(limit, skip, conditions, sortingCond)

        let totalCount = await appointmentService.getTotalAppointmentCount(
            limit,
            skip,
            conditions,
            sortingCond
        )

        if (!data || totalCount === null) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ message: errorMessage })
        }

        return res.status(StatusCodes.OK).json({ data: data, totalCount: totalCount })
    })

    getAppointmentbyBuisnessCount = expressAsyncHandler(async (req, res) => {
        let count = await appointmentService.getAppointmentByBusinessCount(req, res)
        res.status(StatusCodes.OK).json({ count: count })
    })
}

module.exports = AppointmentController
