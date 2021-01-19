const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const ProductService = require("../services/product/product.service")
const productService = new ProductService()

class ProductController {
    createProduct = expressAsyncHandler(async (req, res) => {
        const data = await productService.createProduct(req.body)

        if (data) {
            return res.status(StatusCodes.CREATED).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })

    getProducts = expressAsyncHandler(async (req, res) => {
        const { limit, skip } = req.query

        const data = await productService.getProducts(null, null, limit, skip)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(statusCodes.NOT_FOUND, "Product List not found.")
        }
    })

}

module.exports = ProductController
