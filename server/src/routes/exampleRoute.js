const router = require("express").Router()

const IndexController = require("../controllers/exampleController")
const ic = new IndexController()

router.get("/", ic.index)

module.exports = router
