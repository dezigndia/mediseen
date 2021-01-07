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
}

module.exports = DoctorController
