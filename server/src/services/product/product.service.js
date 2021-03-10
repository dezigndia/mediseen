const Product = require("../../models/ProductModel")
const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

class ProductService {
    createProduct = expressAsyncHandler(async (body, ownerId) => {
        let data = body
        data.ownerId = ownerId
        if (data.mrp - data.sellingPrice >= 0) {
            data.discount = ((data.mrp - data.sellingPrice) / data.mrp) * 100
            data.hasDiscount = true
        }
        return await Product.create(body)
    })
    createBatchProduct = expressAsyncHandler(async (body, ownerId) => {
        let data = body.map(item => {
            if (item.mrp - item.sellingPrice >= 0) {
                return {
                    ...item,
                    ownerId,
                    discount: ((item.mrp - item.sellingPrice) / item.mrp) * 100,
                    hasDiscount: true,
                }
            } else {
                return { ...item, ownerId }
            }
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
        return await Product.findOneAndUpdate({ _id: id }, newData, { new: true })
    })

    getProductById = expressAsyncHandler(async id => {
        const product = await Product.findOne(id)
        if (!product) new AppError(StatusCodes.NOT_FOUND, "No Product found with given Id")
        else return product
    })
    getBulkProductsById = expressAsyncHandler(async ids => {
        const product = await Product.find({ _id: { $in: ids } })
        return product
    })
}
module.exports = ProductService
