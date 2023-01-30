const joi = require("joi");

const role_schema = joi.object({
  title: joi.string().max(20).required(), // Validations
});

module.exports = { role_schema }; // Exports Files.