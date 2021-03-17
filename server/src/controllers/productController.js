const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const ProductService = require("../services/product/product.service")
const productService = new ProductService()

class ProductController {
    createProduct = expressAsyncHandler(async (req, res) => {
        const { _id, businessName } = res.locals.user
        const data = await productService.createProduct(req.body, _id, businessName)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    createBatchProduct = expressAsyncHandler(async (req, res) => {
        const { _id } = res.locals.user
        const data = await productService.createBatchProduct(req.body, _id)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })

    getAllProducts = expressAsyncHandler(async (req, res) => {
        const { limit, skip, ownerId } = req.query

        const data = await productService.getAllProducts(limit, skip, ownerId)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(statusCodes.NOT_FOUND, "Product List not found.")
        }
    })

    getProductsByBusiness = expressAsyncHandler(async (req, res) => {
        const { limit, skip } = req.query
        const { _id } = res.locals.user

        const data = await productService.getProductsByBusiness(limit, skip, _id)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(statusCodes.NOT_FOUND, "Product List not found.")
        }
    })
}

module.exports = ProductController
