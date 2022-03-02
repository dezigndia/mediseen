const Order = require("../../models/OrderModel")
const expressAsyncHandler = require("express-async-handler")
const ProductService = require("../product/product.service")

const productService = new ProductService()
class OrderService {
    createOrder = expressAsyncHandler(async body => {
        if(body.isPrescription===false){
        const sums = await Promise.all(
            body.products.map(async p => {
                const prod = await productService.getProductById(p.productId)
                return prod.sellingPrice * p.qty
            })
        )
        var total = sums.reduce(function (a, b) {
            return a + b
        }, 0)
        body.grandTotal = total
        return Order.create(body)
    }
        else{
            console.log(body)
        return Order.create(body)
        }
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
            .sort({"createdAt":-1})
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
        let data = Order.find({ businessPhoneNumber: phoneNumber, ...searchQuery })
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
    getDetailsByPhone = expressAsyncHandler(async businessPhoneNumber => {
        var d = new Date()
        d.setHours(0, 0, 0, 0)
        let filter = {
            businessPhoneNumber,
            status: "delivered",
        }
        let data = await Order.aggregate([
            {
                $match: filter,
            },
            {
                $project: {
                    grandTotal: 1,
                    _id: 0,
                },
            },
            {
                $group: {
                    _id: null,
                    sum: {
                        $sum: "$grandTotal",
                    },
                },
            },
        ])
        let totalSales = data && data[0] ? data[0].sum : 0
        filter.updatedAt = {
            $gte: d,
        }
        let dataReq = await Order.aggregate([
            {
                $match: filter,
            },
            {
                $project: {
                    grandTotal: 1,
                    _id: 0,
                },
            },
            {
                $group: {
                    _id: null,
                    sum: {
                        $sum: "$grandTotal",
                    },
                },
            },
        ])
        let todaysSales = dataReq && dataReq[0] ? dataReq[0].sum : 0

        return { todaysSales, totalSales }
    })
}

module.exports = OrderService
