const Joi = require("@hapi/joi");

const AdminValidator = {
  validateUser: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(15),
    });
    const value = schema.validate(req.body, {
      abortEarly: false
    });
    if (value.error) {
      return res
        .status(403)
        .json({
          status: false,
          error: value.error.message
        });
    }
    next();
  },

  twilioVerifyValidate: (req, res, next) => {
    const schema = Joi.object({
      phoneNumber: Joi.string().length(10).required(),
      code: Joi.string().length(6).required(),
      name: Joi.string().min(5).max(30).required(),
    });
    const value = schema.validate(req.body, {
      abortEarly: false
    });
    if (value.error) {
      return res
        .status(403)
        .json({
          status: false,
          error: value.error.message
        });
    }
    next();
  },
  
}

module.exports = AdminValidator;