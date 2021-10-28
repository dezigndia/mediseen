const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const AppError = require("../utils/errorHandler")

const CategoryService = require("../services/category/category.service")
const categoryService = new CategoryService()

class CategoryController {
    createCategory = expressAsyncHandler(async (req, res) => {
        const { phone } = res.locals.user
        const { type, data } = req.body
        const result= await categoryService.createCategory(phone, type, data)
        if (result) {
            return res.status(StatusCodes.CREATED).json({ status: true,payload: result })
        } else {
            throw new AppError(StatusCodes.BAD_GATEWAY, "Something went wrong.")
        }
    })
    getAllCategories = expressAsyncHandler(async (req, res) => {
        const { phone } = res.locals.user

        const data = await categoryService.getAllCategories(phone)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Category List not found.")
        }
    })

    getCategoriesByType = expressAsyncHandler(async (req, res) => {
        const { type } = req.params
        const { phone } = res.locals.user

        const data = await categoryService.getCategoriesByType(type, phone)

        if (data) {
            return res.status(StatusCodes.OK).json({ status: true, payload: data })
        } else {
            throw new AppError(StatusCodes.NOT_FOUND, "Category List not found.")
        }
    })
}

module.exports = CategoryController
