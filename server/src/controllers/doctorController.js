const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

const DoctorService = require("../services/doctor/doctor.service")
const docService = new DoctorService()

class DoctorController {
	createDoctor = expressAsyncHandler(async (req, res) => {
		const data = await docService.createDoctor(req.body)

		if (data) {
			return res
				.status(StatusCodes.CREATED)
				.json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
		}
	})

	getDoctors = expressAsyncHandler(async (req, res) => {
		const { limit, skip } = req.query

		const data = await docService.getDoctor(null, null, limit, skip)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Doctor List not found.")
		}
	})

	getDoctorByID = expressAsyncHandler(async (req, res) => {
		const { docId } = req.params

		const data = await docService.getDoctor("_id", docId)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.NOT_FOUND, "Doctor List not found.")
		}
	})

	getAvailableHosList = expressAsyncHandler(async(req,res)=>{
		const { docId } = req.params
		const data= await hospService.getAvailHosList(docId);
		if(data){
			return res.status(StatusCodes.OK).json({status:true, payload:data})
		}else{
			throw new AppError(StatusCodes.NOT_FOUND, "Hospital not found.")
		}
	})

	updateDoctor = expressAsyncHandler(async (req, res) => {
		const { docId } = req.params

		const { name } = req.body

		const data = await docService.updateDoctor(docId, { name })

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Doctor not found.")
		}
	})

	deleteDoctor = expressAsyncHandler(async (req, res) => {
		const { docId } = req.params

		const data = await docService.deleteDoctor(docId)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found.")
		}
	})
}

module.exports = DoctorController
