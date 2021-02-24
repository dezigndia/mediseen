const router = require("express").Router()
const { authenticate } = require("../utils/authenticate")
const BlobController = require("../controllers/blobController")
const blobController = new BlobController()

router.post("/upload", authenticate(), blobController.blobUpload)

module.exports = router
