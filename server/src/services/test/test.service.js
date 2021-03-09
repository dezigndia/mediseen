const Test = require("../../models/TestModel")
const expressAsyncHandler = require("express-async-handler")

class TestService {
    createTest = expressAsyncHandler(async (body, ownerId) => {
        let data = body
        data.ownerId = ownerId
        return await Test.create(body)
    })
    createBatchTest = expressAsyncHandler(async (body, ownerId) => {
        let data = body.map(item => {
            return { ...item, ownerId }
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
}
module.exports = TestService
