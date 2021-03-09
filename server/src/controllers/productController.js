const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const ProductService = require("../services/product/product.service")
const productService = new ProductService()

class ProductController {
    createProduct = expressAsyncHandler(async (req, res) => {
        const { _id } = res.locals.user
        const data = await productService.createProduct(req.body, _id)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong.")
        }
    })
    createBatchProduct = expressAsyncHandler(async (req, res) => {
        const { _id } = res.locals.user
        const data = await productService.createBatchProduct(req.body, _id)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong.")
        }
    })

    getAllProducts = expressAsyncHandler(async (req, res) => {
        const { limit, skip, ownerId } = req.query

        const data = await productService.getAllProducts(limit, skip, ownerId)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Product List not found.")
        }
    })

    getProductsByBusiness = expressAsyncHandler(async (req, res) => {
        const { limit, skip } = req.query
        const { _id } = res.locals.user

        const data = await productService.getProductsByBusiness(limit, skip, _id)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Product List not found.")
        }
    })
    updateProductByID = expressAsyncHandler(async (req, res) => {
        const { id } = req.params
        const newData = req.body

        const data = await productService.updateProductByID(id, newData)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error updating product.")
        }
    })
    getProductById = expressAsyncHandler(async (req, res) => {
        const { id } = req.params
        const data = await productService.getProductById(id)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error fetching product")
        }
    })
}

module.exports = ProductController
