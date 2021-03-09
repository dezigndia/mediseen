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
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    createBatchTest = expressAsyncHandler(async (req, res) => {
        const { _id } = res.locals.user
        const data = await testService.createBatchTest(req.body, _id)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })

    getAllTests = expressAsyncHandler(async (req, res) => {
        const { limit, skip, ownerId } = req.query

        const data = await testService.getAllTests(limit, skip, ownerId)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(statusCodes.NOT_FOUND, "Test List not found.")
        }
    })

    getTestsByBusiness = expressAsyncHandler(async (req, res) => {
        const { limit, skip } = req.query
        const { _id } = res.locals.user

        const data = await testService.getTestsByBusiness(limit, skip, _id)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(statusCodes.NOT_FOUND, "Test List not found.")
        }
    })
}

module.exports = TestController
