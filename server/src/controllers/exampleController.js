const expressAsyncHandler = require("express-async-handler")
const statusCodes = require("http-status-codes")

class IndexController {
	index = expressAsyncHandler(async (req, res) => {
		return res.status(statusCodes.OK).send({ status: true, message: "success" })
	})
}

module.exports = IndexController
