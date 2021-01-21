const Doctor = require("../../models/DoctorModel")
const expressAsyncHandler = require("express-async-handler")

const {getRegex} = require('../../utils/getRegex')

class DoctorService {
    createDoctor = expressAsyncHandler(async body => {
        return Doctor.create(body)
    })

    getDoctor = expressAsyncHandler(async (type, value, limit, skip) => {
        if (!type) {
            return await Doctor.find().limit(parseInt(limit)).skip(parseInt(skip))
        } else {
            let payload = {}
            payload[`${type}`] = getRegex(value)
            return await Doctor.findOne(payload)
        }
    })

    updateDoctor = expressAsyncHandler(async (id, payload) => {
        let doctor = await this.getDoctor("_id", id)

        for (const [key, value] of Object.entries(payload)) {
            doctor[`${key}`] = value
        }

        return await Doctor.findByIdAndUpdate(id, doctor)
    })

    async deleteDoctor(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await Doctor.findByIdAndDelete(id)
                if (data) {
                    resolve(true)
                }
            } catch (error) {
                return reject(error)
            }
        })
    }
}

module.exports = DoctorService
