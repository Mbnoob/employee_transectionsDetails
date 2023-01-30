const joi = require("joi");

const trans_status_schema = joi.object({
  transaction_id: joi.number().required(),
  transactions_status_id: joi.number().required(),
  created_by: joi.number().required(),
});

module.exports = {trans_status_schema}