const Order = require("../../models/OrderModel")
const expressAsyncHandler = require("express-async-handler")

class OrderService {
    createOrder = expressAsyncHandler(async body => {
        return Order.create(body)
    })
    getAllMyUserOrders = expressAsyncHandler(async (limit, skip, userPhoneNumber, searchQuery) => {
        delete searchQuery["limit"]
        delete searchQuery["skip"]
        let date
        if (searchQuery.date) {
            date = searchQuery.date
            delete searchQuery["date"]
        }
        if (searchQuery.date) {
            date = searchQuery.date
            delete searchQuery["date"]
        }
        let data = Order.find({ userPhoneNumber: userPhoneNumber, ...searchQuery })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
        if (date) {
            return data.filter(obj => {
                return (
                    new Date(obj.date).getDate() === new Date(+date).getDate() &&
                    new Date(obj.date).getMonth() === new Date(+date).getMonth() &&
                    new Date(obj.date).getFullYear() === new Date(+date).getFullYear()
                )
            })
        }
        return data
    })
    getAllMyBusinessOrders = expressAsyncHandler(async (limit, skip, phoneNumber, searchQuery) => {
        delete searchQuery["limit"]
        delete searchQuery["skip"]
        let date
        if (searchQuery.date) {
            date = searchQuery.date
            delete searchQuery["date"]
        }
        let data = Order.find({ buisnessPhoneNumber: phoneNumber, ...searchQuery })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
        if (date) {
            return data.filter(obj => {
                return (
                    new Date(obj.date).getDate() === new Date(+date).getDate() &&
                    new Date(obj.date).getMonth() === new Date(+date).getMonth() &&
                    new Date(obj.date).getFullYear() === new Date(+date).getFullYear()
                )
            })
        }
        return data
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
