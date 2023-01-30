// This Is The Validations Parts Of Employees_Roles Coloumns.

const joi = require("joi");

const emp_roles_schema = joi.object({
  emp_id: joi.number().required(),
  role_id: joi.number().required(),
});

module.exports = { emp_roles_schema };