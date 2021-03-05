const router = require("express").Router()
const { authenticate } = require("../utils/authenticate")
const TestContoller = require("../controllers/testController")
const testController = new TestContoller()

router.post("/create", authenticate(), testController.createTest)
router.post("/create/batch", authenticate(), testController.createBatchTest)
router.get("/find/all", testController.getAllTests)
router.get("/find/business", authenticate(), testController.getTestsByBusiness)
router.put("/update/:id", authenticate(), testController.updateTestByID)

module.exports = router
