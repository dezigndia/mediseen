const Pathology = require("../../models/pathologyModel")
const expressAsyncHandler = require("express-async-handler")

class PathologyService {
	createPathology = expressAsyncHandler(async (body) => {
		const {name, address, contact, image, workTimings, payment, testName, testPrice} = body
		return Pathology.create({name, address, contact, image, workTimings, payment, testName, testPrice})
	})

	getPathology = expressAsyncHandler(async (type, value, limit, skip) => {
		if (!type) {
			return await Pathology.find().limit(parseInt(limit)).skip(parseInt(skip))
		} else {
			let payload = {}
			payload[`${type}`] = value
			return await Pathology.findOne(payload)
		}
	})

	updatePathology = expressAsyncHandler(async (id, payload) => {
		let pathology = await this.getPathology("_id", id)

		for (const [key, value] of Object.entries(payload)) {
			pathology[`${key}`] = value
		}

		return await Pathology.findByIdAndUpdate(id, pathology)
	})

	async deletePathology(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await Pathology.findByIdAndDelete(id)
				if (data) {
					resolve(true)
				}
			} catch (error) {
				return reject(error)
			}
		})
	}
}

module.exports = PathologyService