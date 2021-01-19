const router = require("express").Router()

const ProductContoller = require("../controllers/productController")
const productController = new ProductContoller()

router.post("/", productController.createProduct)
router.get("/", productController.getProducts)

module.exports = router
