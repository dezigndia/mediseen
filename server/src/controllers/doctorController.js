const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

const DoctorService = require("../services/doctor/doctor.service")
const docService = new DoctorService()

class DoctorController {
	createDoctor = expressAsyncHandler(async (req, res) => {
		const {
			name,
			email,
			phone,
			city,
			country,
			state,
			pincode,
			area,
			specialist,
			workingHours,
			fee,
			education,
		} = req.body

		const doc = {
			name,
			contact: {
				email,
				phone,
			},

			address: {
				city,
				country,
				state,
				pincode,
				area,
			},

			specialist,
			workingHours,
			fee,
			education,
		}

		const data = await docService.createDoctor(doc)

		if (data) {
			res.status(StatusCodes.CREATED).json({ status: true, payload: data })
		}
	})

	getDoctors = expressAsyncHandler(async (req, res) => {
		const { limit, skip } = req.query

		const data = await docService.getDoctor(null, null, limit, skip)

		if (data) {
			res.status(200).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Doctor List not found.")
		}
	})

	getDoctorByID = expressAsyncHandler(async (req, res) => {
		const { docId } = req.params

		const data = await docService.getDoctor("_id", docId)

		if (data) {
			res.status(200).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Doctor List not found.")
		}
	})

	updateDoctor = expressAsyncHandler(async (req, res) => {
		const { docId } = req.params

		const { name } = req.body

		const data = await docService.updateDoctor(docId, { name })

		if (data) {
			res.status(200).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Doctor not found.")
		}
	})

	deleteDoctor = expressAsyncHandler(async (req, res) => {
		const { docId } = req.params

		const data = await docService.deleteDoctor(docId)

		if (data) {
			res.status(200).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Doctor not found.")
		}
	})
}

module.exports = DoctorController
