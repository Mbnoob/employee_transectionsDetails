const transactions = require("../models/transactions"); // Imports From (models/transactions).
const {
  transection_Schema,
} = require("../validations/transectionsValidations"); // Imports From (validations/transectionsValidations).
const joi = require("joi");

const get_all = (req, res) => {
  transactions.get((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const add_data = async (req, res) => {
  try {
    const transections_valid = await transection_Schema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    transactions.add(transections_valid, (results) => {
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

const update_data = async (req, res) => {
  let data = [];
  // When User need to Update a specifies data, it can Update that specifies fields at a time 👇.

  // Employee id validations Gose Here
  const emp_id_schema = joi.object({
    emp_id: joi.number().integer().required(),
  });
  if (req.body.hasOwnProperty("emp_id")) {
    try {
      let emp_id_valid = await emp_id_schema.validateAsync(req.body, {
        abortEarly: false,
      });
      data["emp_id"] = emp_id_valid.emp_id;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // Amounts Validations Gose Here
  const amounts_schema = joi.object({
    amounts: joi.number().required(),
  });
  if (req.body.hasOwnProperty("amounts")) {
    try {
      let amounts_valid = await amounts_schema.validateAsync(req.body, {
        abortEarly: false,
      });
      data["amounts"] = amounts_valid.amounts;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  //Types Validations Gose Here
  const types_schema = joi.object({
    types: joi.string().valid("debits", "credits").required(),
  });
  if (req.body.hasOwnProperty("types")) {
    try {
      let types_valid = await types_schema.validateAsync(req.body, {
        abortEarly: false,
      });
      data["types"] = types_valid.types;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // payments_date Validations Gose Here
  const paymentsDate_schema = joi.object({
    payments_date: joi.date().iso().required(),
  });
  if (req.body.hasOwnProperty("payments_date")) {
    try {
      let paymentsDate_valid = await paymentsDate_schema.validateAsync(
        req.body,
        {
          abortEarly: false,
        }
      );
      data["payments_date"] = paymentsDate_valid.payments_date;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  //current_status_id Validations Gose Here
  const currentStatusid_schema = joi.object({
    current_status_id: joi.number().integer().required(),
  });
  if (req.body.hasOwnProperty("current_status_id")) {
    try {
      let currentStatusid_valid = await currentStatusid_schema.validateAsync(
        req.body,
        {
          abortEarly: false,
        }
      );
      data["current_status_id"] = currentStatusid_valid.current_status_id;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  transactions.update(data, req.params.id, (results) => {
    if (!results) {
      return res.json(Error);
    } else {
      return res.status(200).json(results);
    }
  });
};

const delete_data = (req, res) => {
  transactions.delete(req.params.id, (results) => {
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Given Id is not found in Database" });
    }
    if (results.affectedRows === 1) {
      return res.status(200).json({ message: "Data Delete Status Updated" });
    } else {
      return res.json(results);
    }
  });
};

module.exports = { get_all, add_data, update_data, delete_data }; // Exports All The Given Files.
