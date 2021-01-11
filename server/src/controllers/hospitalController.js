const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

const HospitalService = require("../services/hospital/hospital.service")
const hospService = new HospitalService()

class HospitalController {
	createHospital = expressAsyncHandler(async (req, res) => {
		const data = await hospService.createHospital(req.body)

		if (data) {
			return res
				.status(StatusCodes.CREATED)
				.json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
		}
	})

	getHospitals = expressAsyncHandler(async (req, res) => {
		const { limit, skip } = req.query

		const data = await hospService.getHospital(null, null, limit, skip)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital List not found.")
		}
	})

	getHospitalByID = expressAsyncHandler(async (req, res) => {
		const { hosId } = req.params

		const data = await hospService.getHospital("_id", hosId)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital List not found.")
		}
	})

	updateHospital = expressAsyncHandler(async (req, res) => {
		const { hosId } = req.params

		const { name } = req.body

		const data = await hospService.updateHospital(hosId, { name })

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital not found.")
		}
	})

	deleteHospital = expressAsyncHandler(async (req, res) => {
		const { hosId } = req.params

		const data = await hospService.deleteHospital(hosId)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital not found.")
		}
	})
}

module.exports = HospitalController