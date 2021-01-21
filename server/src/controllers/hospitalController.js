const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const BusinessService = require("../services/business/business.service")
const businessService = new BusinessService()

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
		const { limit, skip, type, value } = req.query

		const data = await hospService.getHospital(type, value, limit, skip)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.NOT_FOUND, "Hospital List not found.")
		}
	})

	getHospitalByID = expressAsyncHandler(async (req, res) => {
		const { hosId } = req.params

		const data = await businessService.getBusinessById(hosId);

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.NOT_FOUND, "Hospital Not found.")
		}
	})

	getAvailableDocList = expressAsyncHandler(async(req,res)=>{
		const { hosId } = req.params
		const data= await hospService.getAvailDocList(hosId);
		if(data){
			return res.status(StatusCodes.OK).json({status:true, payload:data})
		}else{
			throw new AppError(StatusCodes.NOT_FOUND, "No Available Doctor.")
		}
	})

	

	updateHospital = expressAsyncHandler(async (req, res) => {
		const { hosId } = req.params

		
		const data = await hospService.updateHospital(hosId, body)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.NOT_FOUND, "Hospital not found.")
		}
	})

	deleteHospital = expressAsyncHandler(async (req, res) => {
		const { hosId } = req.params

		const data = await hospService.deleteHospital(hosId)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.NOT_FOUND, "Hospital not found.")
		}
	})
}

module.exports = HospitalController