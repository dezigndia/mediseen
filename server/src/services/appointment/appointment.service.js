const Appointment = require("../../models/AppointmentModel")
const expressAsyncHandler = require("express-async-handler")

class AppointmentService {
    createAppointment = expressAsyncHandler(async body => {
        return await Appointment.create(body)
    })

    getAppointmentbyBuisness = expressAsyncHandler(
        async (limit, skip, buisnessPhoneNumber, searchQuery) => {
            delete searchQuery["limit"]
            delete searchQuery["skip"]
            let date
            if (searchQuery.date) {
                date = searchQuery.date
                delete searchQuery["date"]
            }
            let data = await Appointment.find({
                buisnessPhoneNumber: buisnessPhoneNumber,
                ...searchQuery,
            })
                .limit(parseInt(limit))
                .skip(parseInt(skip))
            if (date) {
                return data.filter(obj => {
                    return (
                        new Date(obj.date).getDate() === new Date(+date).getDate() &&
                        new Date(obj.date).getMonth() === new Date(+date).getMonth() &&
                        new Date(obj.date).getFullYear() === new Date(+date).getFullYear()
                    )
                })
            }
            return data
        }
    )
    getAppointmentbyUser = expressAsyncHandler(
        async (limit, skip, userPhoneNumber, searchQuery) => {
            return await Appointment.find({ userPhoneNumber: userPhoneNumber, ...searchQuery })
                .limit(parseInt(limit))
                .skip(parseInt(skip))
        }
    )

    getAppointmentbyId = expressAsyncHandler(async id => {
        return await Appointment.findOne({ _id: id })
    })
    updateAppointmentbyId = expressAsyncHandler(async (id, newData) => {
        let appointment = {}
        for (const [key, value] of Object.entries(newData)) {
            appointment[`${key}`] = value
        }
        return await Appointment.findByIdAndUpdate(id, appointment)
    })
}

module.exports = AppointmentService
