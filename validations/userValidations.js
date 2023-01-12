const joi = require("joi");

const empSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  dob: joi.date().iso().required(),
  address: joi.string().required(),
  gender: joi.string().required().valid("male", "female"),
  email: joi
    .string()
    .lowercase()
    .regex(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required()
    .messages({
      "string.pattern.base": `Email Can't match This required Pattern`,
    }),
  phone_number: joi
    .string()
    .regex(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": `Phone-number Must At last 10 Digit Longs`,
    }),
  passwords: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required()
    .messages({
      "string.pattern.base": `password Can't Match Required Patterns or minimum 8 Character Longs`,
    }),
  is_online: joi.string().valid("yes", "no").required(),
});

module.exports = { empSchema };
