const Product = require("../../models/ProductModel")
const expressAsyncHandler = require("express-async-handler")

class ProductService {
    createProduct = expressAsyncHandler(async (body, ownerId) => {
        let data = body
        data.ownerId = ownerId
        data.discount = data.mrp - data.sellingPrice
        return await Product.create(body)
    })
    createBatchProduct = expressAsyncHandler(async (body, ownerId) => {
        let data = body.map(item => {
            return { ...item, ownerId, discount: item.mrp - item.sellingPrice }
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
    updateProductByID = expressAsyncHandler(async (id, payload) => {
        let newData = {}
        for (const [key, value] of Object.entries(payload)) {
            newData[`${key}`] = value
        }
        delete newData["ownerId"]
        return await Product.findOneAndUpdate({ _id: id }, newData)
    })
}
module.exports = ProductService
