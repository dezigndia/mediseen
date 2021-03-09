const Appointment = require("../../models/AppointmentModel")
const expressAsyncHandler = require("express-async-handler")
const { getConditions } = require("../admin/admin.service")

class AppointmentService {
    createAppointment = expressAsyncHandler(async body => {
        return await Appointment.create(body)
    })

    getAppointmentbyBuisness = expressAsyncHandler(async (limit, skip, buisnessPhoneNumber) => {
        return await Appointment.find({ buisnessPhoneNumber: buisnessPhoneNumber })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
    })
    getAppointmentbyUser = expressAsyncHandler(async (limit, skip, userPhoneNumber) => {
        return await Appointment.find({ userPhoneNumber: userPhoneNumber })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
    })

    getAppointmentbyId = expressAsyncHandler(async id => {
        return await Appointment.findOne({ _id: id })
    })
    updateAppointmentbyId = expressAsyncHandler(async (id, newData) => {
        let appointment = {}
        for (const [key, value] of Object.entries(payload)) {
            appointment[`${key}`] = value
        }
        return await Appointment.findByIdAndUpdate(id, appointment)
    })

    getAllAppointments = async (limit, skip, conditions, sortConditions) => {
        try {
            let data = await Appointment.find(conditions)
                .sort(sortConditions)
                .skip(skip)
                .limit(limit)
            return data
        } catch (e) {
            return null
        }
    }

    getTotalAppointmentCount = async (limit, skip, conditions, sortConditions) => {
        try {
            let data = await Appointment.countDocuments(conditions)
                .sort(sortConditions)
                .skip(skip)
                .limit(limit)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    getAppointmentByBusinessCount = expressAsyncHandler(async (req, res) => {
        return await Appointment.countDocuments(getConditions(req))
    })
}

module.exports = AppointmentService
