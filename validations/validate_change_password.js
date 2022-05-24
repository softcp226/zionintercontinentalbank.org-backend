const Joi = require("joi");

const validate_change_password = (req) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    password: Joi.string().required().min(8),
    pin: Joi.number().required().min(4),
  });
  const result = schema.validate({
    user: req.user,
    password: req.password,
    pin: req.pin,
  });

  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_change_password;
