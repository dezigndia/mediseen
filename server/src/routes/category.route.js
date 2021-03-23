const router = require("express").Router()
const { authenticate } = require("../utils/authenticate")

const CategoryController = require("../controllers/categoryController")
const cc = new CategoryController()

router.get("/", authenticate(), cc.getAllCategories)
router.get("/type/:type", authenticate(), cc.getCategoriesByType)
router.post("/", authenticate(), cc.createCategory)

module.exports = router


// GET=> /category/type/:type

// POST => 
