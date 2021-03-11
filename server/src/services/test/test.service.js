const Test = require("../../models/TestModel")
const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")

class TestService {
    createTest = expressAsyncHandler(async (body, ownerId) => {
        let data = body
        data.ownerId = ownerId
        if (data.mrp - data.sellingPrice >= 0) {
            data.discount = ((data.mrp - data.sellingPrice) / data.mrp) * 100
            data.hasDiscount = true
        }
        return await Test.create(body)
    })
    createBatchTest = expressAsyncHandler(async (body, ownerId) => {
        let data = body.map(item => {
            if (item.mrp - item.sellingPrice > 0) {
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
        return await Test.insertMany(data)
    })

    getAllTests = expressAsyncHandler(async (limit, skip, ownerId) => {
        let filter = {}
        if (ownerId) {
            filter.ownerId = ownerId
        }
        return await Test.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
    })
    getTestsByBusiness = expressAsyncHandler(async (limit, skip, ownerId) => {
        return await Test.find({ ownerId: ownerId }).limit(parseInt(limit)).skip(parseInt(skip))
    })
    updateTestByID = expressAsyncHandler(async (id, payload) => {
        let newData = {}
        for (const [key, value] of Object.entries(payload)) {
            newData[`${key}`] = value
        }
        delete newData["ownerId"]
        return await Test.findOneAndUpdate({ _id: id }, newData, { new: true })
    })
    getTestById = expressAsyncHandler(async id => {
        const test = await Test.findOne(id)
        if (!test) new AppError(StatusCodes.NOT_FOUND, "No test found with given Id")
        else return test
    })
    getBulkTestsById = expressAsyncHandler(async ids => {
        return await Test.find({ _id: { $in: ids } })
    })
}
module.exports = TestService
