const Joi = require("joi");

const validate_complete_transaction = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().max(1000),
    otp: Joi.string().required().min(3),
  });
  const result = schema.validate({ user: req.user, otp: req.otp });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_complete_transaction;
