const joi = require("joi");

const status_schema = joi.object({
  statues: joi
    .string()
    .valid("pending", "processing", "approved", "paid", "decline")   // Validations
    .required(),
});

module.exports = { status_schema }; // Exports Files
