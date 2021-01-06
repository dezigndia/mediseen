const router = require("express").Router()

const IndexController = require("../controllers/exampleController")
const ic = new IndexController();

router.get("/", ic.index);
router.use("/user",require('./userRoute'));
module.exports = router
