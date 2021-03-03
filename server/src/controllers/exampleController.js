const expressAsyncHandler = require("express-async-handler")
const StatusCodes = require("http-status-codes")

class IndexController {
    index = expressAsyncHandler(async (req, res) => {
        return res.status(StatusCodes.OK).send({ status: true, message: "success" })
    })
}

module.exports = IndexController
