const router = require("express").Router()
const { authenticate } = require("../utils/authenticate")
const OrderController = require("../controllers/orderController")

const oc = new OrderController()

router.post("/", authenticate(), oc.createOrder)
router.get("/all", authenticate(), oc.getAllMyUserOrders)
router.get("/all/business", authenticate(), oc.getAllMyBusinessOrders)
router.get("/id/:id", authenticate(), oc.getOrderbyId)
router.put("/update/:id", authenticate(), oc.updateOrderbyId)

module.exports = router
