const router = require("express").Router()
const { authenticate } = require("../utils/authenticate")
const ProductContoller = require("../controllers/productController")
const productController = new ProductContoller()

router.post("/create", authenticate(), productController.createProduct)
router.post("/create/batch", authenticate(), productController.createBatchProduct)
router.get("/find/all", productController.getAllProducts)
router.get("/find/business", authenticate(), productController.getProductsByBusiness)
router.put("/update/:id", authenticate(), productController.updateProductByID)
router.get("/find/id/:id", productController.getProductById)

module.exports = router
//TODO make get product by id
