const expressAsyncHandler = require("express-async-handler")

exports.example = expressAsyncHandler(async (req, res) => {
	res.json({ status: "success", payload: "Hi" })
})
