const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

const PathologyService = require("../services/pathology/pathology.service")
const pathService = new PathologyService()

class PathologyController {
	createPathology = expressAsyncHandler(async (req, res) => {
		const data = await pathService.createPathology(req.body)

		if (data) {
			
			return res
				.status(StatusCodes.CREATED)
				.json({ status: true, payload: data })
		} else {
			throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
		}
	})

	getPathology = expressAsyncHandler(async (req, res) => {
		const { limit, skip } = req.query

		const data = await pathService.getPathology(null, null, limit, skip)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital List not found.")
		}
	})

	getPathologyByID = expressAsyncHandler(async (req, res) => {
		const { pathId } = req.params

		const data = await pathService.getPathology("_id", pathId)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital List not found.")
		}
	})

	updatePathology = expressAsyncHandler(async (req, res) => {
		const { pathId } = req.params

		const { name, address, contact, image, workTimings, payment, testName, testPrice } = req.body

		const data = await pathService.updatePathology(pathId, {name, address, contact, image, workTimings, payment, testName, testPrice })

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital not found.")
		}
	})

	deletePathology = expressAsyncHandler(async (req, res) => {
		const { pathId } = req.params

		const data = await pathService.deletePathology(pathId)

		if (data) {
			return res.status(StatusCodes.OK).json({ status: true, payload: data })
		} else {
			throw new AppError(statusCodes.NOT_FOUND, "Hospital not found.")
		}
	})
}

module.exports = PathologyController