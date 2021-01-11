const Joi = require("@hapi/joi")
const { StatusCodes } = require("http-status-codes")

const educationSchema = Joi.array().items(Joi.string())

const workDaySchema = Joi.object().keys({
	from: Joi.number(),
	to: Joi.number(),
})

const workingHoursSchema = Joi.object().keys({
	Monday: workDaySchema,
	Sunday: workDaySchema,
	Tuesday: workDaySchema,
	Wednesday: workDaySchema,
	Thursday: workDaySchema,
	Friday: workDaySchema,
	Saturday: workDaySchema,
})

const contactSchema = Joi.object().keys({
	email: Joi.string().trim(),
	phone: Joi.string().trim(),
})

const addressSchema = Joi.object().keys({
	city: Joi.string().trim(),
	state: Joi.string().trim(),
	area: Joi.string().trim(),
	country: Joi.string().trim(),
	pincode: Joi.number(),
})

const paymentSchema = Joi.object().keys({
	onlinePayment: Joi.boolean(),
	type: Joi.string().trim(),
	upiID: Joi.string().trim(),
	bankInfo: Joi.object().keys({
		ifsc: Joi.string().trim(),
		accNum: Joi.string().trim(),
	}),
})

const clinicSchema = Joi.array().items(
	Joi.object().keys({
		name: Joi.string().trim().required(),
		image: Joi.string().trim(),
		fees: Joi.number(),
		feeCollect: Joi.string().trim(),
		teleConsulting: Joi.boolean(),
		workingHours: workingHoursSchema,
		contact: contactSchema,
		address: addressSchema,
	})
)

const doctorValidator = {
	validateDoctor: (req, res, next) => {
		const schema = Joi.object().keys({
			name: Joi.string().trim().required(),
			image: Joi.string().trim(),
			specialist: Joi.string().trim(),
			education: educationSchema,
			clinic: clinicSchema,
			paymentInfo: paymentSchema,
		})

		const value = schema.validate(req.body, {
			abortEarly: false,
		})
		if (value.error) {
			return res.status(StatusCodes.NOT_ACCEPTABLE).json({
				status: false,
				error: value.error.message,
			})
		}
		next()
	},
}

module.exports = doctorValidator
