const Joi = require("joi");

const validate_change_password_02 = (req) => {
  const schema = Joi.object({
    reset_token: Joi.string().required(),
    password: Joi.string().required().min(8),
    pin: Joi.number().required().min(4),
  });
  const result = schema.validate({
    reset_token: req.reset_token,
    password: req.password,
    pin: req.pin,
  });

  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_change_password_02;
