const status = require("../models/status"); // Import from (models/status).
const { status_schema } = require("../validations/statusValidations"); // Imports From (validations/statusValidations).

const getallData = (req, res) => {
  status.get((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const add_status = async (req, res) => {
  try {
    const status_valid = await status_schema.validateAsync(req.body, {
      abortEarly: false,
    });
    status.add(status_valid, (results) => {
      if (!results) {
        res.status(406).json({ error });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    let err = [];
    error.details.forEach((e) => {
      err.push({ key: e.path[0], message: e.message });
    });
    res.status(406).json({ errors: err });
  }
};

const update_status = async (req, res) => {
  try {
    const status_valid = await status_schema.validateAsync(req.body, {
      abortEarly: false,
    });
    status.update(status_valid, req.params.id, (results) => {
      if (!results) {
        return res.json(Error);
      } else {
        return res.status(200).json(results);
      }
    });
  } catch (error) {
    let err = [];
    error.details.forEach((e) => {
      err.push({ key: e.path[0], message: e.message });
    });
    res.status(406).json({ errors: err });
  }
};

module.exports = { getallData, add_status, update_status }; // Exports All The Given Files.
