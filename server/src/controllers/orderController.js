const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const OrderService = require("../services/order/order.service")
const AppError = require("../utils/errorHandler")

const orderService = new OrderService()

class OrderController {
    createOrder = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        let bodydata = req.body
        bodydata.userPhoneNumber = user.phone
        const data = await orderService.createOrder(bodydata)
        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAllMyUserOrders = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        const { limit, skip } = req.query
        const searchQuery = req.query
        if (user.type != "user") {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const data = await orderService.getAllMyUserOrders(limit, skip, user.phone, searchQuery)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAllMyBusinessOrders = expressAsyncHandler(async (req, res) => {
        const { user } = res.locals
        const { limit, skip } = req.query
        const searchQuery = req.query
        if (user.type != "pharmacy" || user.type != "pathology") {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Unauthorized Access",
            })
        }
        const data = await orderService.getAllMyBusinessOrders(limit, skip, user.phone.searchQuery)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getOrderbyId = expressAsyncHandler(async (req, res) => {
        const { id } = req.params
        const data = await orderService.getOrderbyId(id)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    updateOrderbyId = expressAsyncHandler(async (req, res) => {
        const { id } = req.params
        const data = await orderService.updateOrderbyId(id, req.body)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
}

module.exports = OrderController
