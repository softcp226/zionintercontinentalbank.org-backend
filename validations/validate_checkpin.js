const Joi = require("joi");

const validate_checkPin = (req) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    pin: Joi.number().required().min(4),
  });
  const result = schema.validate({
    user: req.user,
    pin: req.pin,
  });

  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_checkPin;
