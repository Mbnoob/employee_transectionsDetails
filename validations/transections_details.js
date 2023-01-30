const joi = require("joi");

const add_details_schema = joi.object({
  trans_id: joi.number().required(),
  description: joi.string().min(5).max(50).required(),
  amounts: joi.number().min(10000).max(100000).required(),
});

module.exports = { add_details_schema };