const transaction_statuses = require("../models/transaction_statuses");
const {
  trans_status_schema,
} = require("../validations/transections_statuses_validations");

const get_all_trans_status = (req, res) => {
  transaction_statuses.getAll((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const addData_trans_status = async (req, res) => {
  try {
    const trans_status_valid = await trans_status_schema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    transaction_statuses.addData(trans_status_valid, (results) => {
      console.log(results);
      if (results.errno === 1062) {
        return res
          .status(406)
          .json({ Error: "Cannot Add or Update, Duplicate Entry Occures" });
      } else {
        return res.json({ Message: "Posted Sucessfully" });
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


module.exports = { get_all_trans_status, addData_trans_status };
