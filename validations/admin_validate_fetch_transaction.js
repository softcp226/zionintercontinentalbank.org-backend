const Joi = require("joi");

const validateFetchUser = (req) => {
  const schema = Joi.object({
    admin: Joi.string().max(1000).required(),
    user: Joi.string().max(1000).required(),
  });
  const result = schema.validate({ admin: req.admin, user: req.user });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validateFetchUser;
