const Appointment = require("../../models/AppointmentModel")
const expressAsyncHandler = require("express-async-handler")

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
}

module.exports = AppointmentService
