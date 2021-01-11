const Hospital = require("../../models/HospitalModel")
const expressAsyncHandler = require("express-async-handler")

class HospitalService {
	createHospital = expressAsyncHandler(async (body) => {
		const {name, address, contact, image, total_employees, isActive, isVerified} = body
		return Hospital.create({name, address, contact, image, total_employees, isActive, isVerified})
	})

	getHospital = expressAsyncHandler(async (type, value, limit, skip) => {
		if (!type) {
			return await Hospital.find().limit(parseInt(limit)).skip(parseInt(skip))
		} else {
			let payload = {}
			payload[`${type}`] = value
			return await Hospital.findOne(payload)
		}
	})

	updateHospital = expressAsyncHandler(async (id, payload) => {
		let hospital = await this.getHospital("_id", id)

		for (const [key, value] of Object.entries(payload)) {
			hospital[`${key}`] = value
		}

		return await Hospital.findByIdAndUpdate(id, hospital)
	})

	async deleteHospital(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await Hospital.findByIdAndDelete(id)
				if (data) {
					resolve(true)
				}
			} catch (error) {
				return reject(error)
			}
		})
	}
}

module.exports = HospitalService