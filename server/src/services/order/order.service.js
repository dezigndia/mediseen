const Order = require("../../models/OrderModel")
const expressAsyncHandler = require("express-async-handler")

class OrderService {
    createOrder = expressAsyncHandler(async body => {
        return Order.create(body)
    })
    getAllMyOrders = expressAsyncHandler(async (limit, skip, userPhoneNumber) => {
        return Order.find({ userPhoneNumber: userPhoneNumber })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
    })

    getOrderbyId = expressAsyncHandler(async id => {
        return Order.findOne({ _id: id })
    })

    updateOrderbyId = expressAsyncHandler(async (id, payload) => {
        let ord = {}
        for (const [key, value] of Object.entries(payload)) {
            ord[`${key}`] = value
        }
        return await Order.findByIdAndUpdate(id, ord)
    })
}

module.exports = OrderService
