const router = require("express").Router()

const { example } = require("../controllers/exampleController")

router.post("/", example)

module.exports = router
