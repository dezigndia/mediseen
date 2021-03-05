const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const TestService = require("../services/test/test.service")
const testService = new TestService()

class TestController {
    createTest = expressAsyncHandler(async (req, res) => {
        const { _id } = res.locals.user
        const data = await testService.createTest(req.body, _id)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong.")
        }
    })
    createBatchTest = expressAsyncHandler(async (req, res) => {
        const { _id } = res.locals.user
        const data = await testService.createBatchTest(req.body, _id)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong.")
        }
    })

    getAllTests = expressAsyncHandler(async (req, res) => {
        const { limit, skip, ownerId } = req.query

        const data = await testService.getAllTests(limit, skip, ownerId)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Test List not found.")
        }
    })

    getTestsByBusiness = expressAsyncHandler(async (req, res) => {
        const { limit, skip } = req.query
        const { _id } = res.locals.user

        const data = await testService.getTestsByBusiness(limit, skip, _id)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Test List not found.")
        }
    })
    updateTestByID = expressAsyncHandler(async (req, res) => {
        const { id } = req.params
        const newData = req.body

        const data = await testService.updateTestByID(id, newData)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error updating test")
        }
    })
}

module.exports = TestController
