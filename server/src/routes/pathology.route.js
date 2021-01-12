const router = require("express").Router()
const AdminValidator = require("../validators")

const PathologyController = require("../controllers/pathologyController");
const pc = new PathologyController();


router.post("/",pc.createPathology)
router.get("/",pc.getPathology)
router.get("/:pathId",pc.getPathologyByID)
router.put("/:pathId",pc.updatePathology)
router.delete("/:pathId", pc.deletePathology)


module.exports = router
