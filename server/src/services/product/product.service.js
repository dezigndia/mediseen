const Product = require("../../models/ProductModel")
const expressAsyncHandler = require("express-async-handler")

class ProductService {
    createProduct = expressAsyncHandler(async (body, ownerId) => {
        let data = body
        data.ownerId = ownerId
        return await Product.create(body)
    })
    createBatchProduct = expressAsyncHandler(async (body, ownerId) => {
        let data = body.map(item => {
            return { ...item, ownerId }
        })
        return await Product.insertMany(data)
    })

    getAllProducts = expressAsyncHandler(async (limit, skip, ownerId) => {
        let filter = {}
        if (ownerId) {
            filter.ownerId = ownerId
        }
        return await Product.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
    })

    getProductsByBusiness = expressAsyncHandler(async (limit, skip, ownerId) => {
        return await Product.find({ ownerId: ownerId }).limit(parseInt(limit)).skip(parseInt(skip))
    })
}
module.exports = ProductService
