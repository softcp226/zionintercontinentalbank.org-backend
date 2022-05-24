const Joi = require("joi");

const validateFetchUser = (req) => {
  const schema = Joi.object({
    user: Joi.string().max(1000).required(),
  });
  const result = schema.validate({ user: req.user });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validateFetchUser;
