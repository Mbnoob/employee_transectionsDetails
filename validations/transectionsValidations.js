const joi = require("joi");

const transection_Schema = joi.object({
  emp_id: joi.number().integer().required(),
  amounts: joi.number().required(),
  types: joi.string().valid("debits", "credits").required(), // Validations
  payments_date: joi.date().iso().required(),
  current_status_id: joi.number().integer().required(),
});

module.exports = { transection_Schema }; //Exports Files.