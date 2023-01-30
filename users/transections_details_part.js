const transaction_details = require("../models/transaction_details");
const { add_details_schema } = require("../validations/transections_details");
const joi = require("joi");

const getAll_trans_details = (req, res) => {
  transaction_details.getAll((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const add_transection_details = async (req, res) => {
  try {
    const add_transDetails_valid = await add_details_schema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    transaction_details.add_details(add_transDetails_valid, (results) => {
      if (!results) {
        return res.status(401).json(Error);
      }
      if (results.code === 0) {
        return res.status(406).json({
          message:
            "Cannot Add or Update(Maybe Transections id is Already Exist or Not Found in Database)",
        });
      } else {
        return res.json(results);
      }
    });
  } catch (error) {
    let err = [];
    error.details.forEach((element) => {
      err.push({ keys: element.path[0], message: element.message });
    });
    res.status(406).json({ Error: err });
  }
};

const update_transections_details = async (req, res) => {
  let data = [];
  // Transections id Update
  const trans_id_validations = joi.object({
    trans_id: joi.number().required(), // validations
  });

  if (req.body.hasOwnProperty("trans_id")) {
    try {
      let trans_id_valid = await trans_id_validations.validateAsync(req.body, {
        abortEarly: false,
      });
      data["trans_id"] = trans_id_valid.trans_id;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ Errors: err });
    }
  }

  // Descriptions Update
  const trans_description_schema = joi.object({
    description: joi.string().required(),
  });

  if (req.body.hasOwnProperty("description")) {
    try {
      let discreptions_valid = await trans_description_schema.validateAsync(req.body,{
        abortEarly: false,
      });
      data["description"] = discreptions_valid.description;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ Errors: err });
    }
  };

  //amounts Validations Updated
  const amount_validation_schema = joi.object({
    amounts: joi.number().min(10000).max(200000).required(),
  });

  if (req.body.hasOwnProperty("amounts")) {
    try {
      let amounts_valid = await amount_validation_schema.validateAsync(req.body,{
        abortEarly: false,
      });
      data["amounts"] = amounts_valid.amounts;
      
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ Errors: err });
    }
  };

  transaction_details.update_details(data, req.params.id, (results) => {
    console.log(results);
    if (results.errno === 1062) {
      return res
        .status(406)
        .json({ Error: "Duplicate Value, This Value is Already Exist" });
    }
    if (results.affectedRows === 0) {
      return res.status(401).json({ Error: "User ID Is Not Exist" });
    }
    if (results.errno === 1452) {
      return res
        .status(406)
        .json({
          Error: "Cannot Add or Update, Maybe Transections Id is Not Exist",
        });
    } else {
      return res.status(200).json({ message: "Updated Successful" });
    }
  });
};

module.exports = {
  getAll_trans_details,
  add_transection_details,
  update_transections_details,
};
