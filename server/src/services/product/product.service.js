const Product = require("../../models/ProductModel")
const expressAsyncHandler = require("express-async-handler")

class ProductService {
    createProduct = expressAsyncHandler(async body => {
        return await Product.create(body)
    })

    getProducts = expressAsyncHandler(async (type, value, limit, skip) => {
        if (!type) {
            return await Product.find().limit(parseInt(limit)).skip(parseInt(skip))
        } else {
            let payload = {}
            payload[`${type}`] = value
            return await Product.findOne(payload)
        }
    })
}
module.exports = ProductService
