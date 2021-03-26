const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const { getConditions, getSortingConditions } = require("../services/admin/admin.service")
const AppointmentService = require("../services/appointment/appointment.service")
const { errorMessage } = require("../utils/constants")
const AppError = require("../utils/errorHandler")
const Doctor = require("../models/DoctorModel")
const Hospital = require("../models/HospitalModel")
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
        switch (bodydata.businessType) {
            case "doctor": {
                const doctor = await Doctor.findOne({ phone: bodydata.userPhoneNumber })
                console.log(doctor)
                const clinic = doctor.clinic.find(c => c._id == bodydata.clinicId)
                if (!clinic) {
                    throw new AppError(StatusCodes.BAD_GATEWAY, "No clinic found")
                } else {
                    bodydata.grandTotal = clinic.fee
                }
                break
            }
            case "hospital": {
                const hospital = await Hospital.findOne({ phone: bodydata.userPhoneNumber })
                console.log(hospital)
                const doctor = hospital.doctors.find(c => c.doctorId == bodydata.doctorId)
                if (!doctor) {
                    throw new AppError(StatusCodes.BAD_GATEWAY, "No doctor found")
                } else {
                    bodydata.grandTotal = doctor.fee
                }
                break
            }
            default: {
                throw new AppError(
                    StatusCodes.BAD_GATEWAY,
                    "Business type must be doctor or hospital"
                )
            }
        }
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
    getPatients = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        const { limit, skip, patient_name } = req.query
        const data = await appointmentService.getPatients(limit, skip, user.phone, patient_name)
        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getBookedSlots = expressAsyncHandler(async (req, res) => {
        const { phone } = req.params
        const { date } = req.query
        const data = await appointmentService.getBookedSlots(phone, date)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
}

module.exports = AppointmentController
