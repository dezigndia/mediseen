const { body, validationResult } = require("express-validator")

const checkDoctor = (req, res, next) => {
	body("specialist").notEmpty().isLength({ max: 30 })
	body("education").notEmpty().isLength({ max: 10 })
	body("name").notEmpty().isLength({ min: 5, max: 50 })
}
