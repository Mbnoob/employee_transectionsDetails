const employee = require("../models/employee"); // Imports Form (models/employee).
const { genSaltSync, hashSync } = require("bcrypt"); // Import (Bcrypt is a password hashing function) .
const { empSchema } = require("../validations/userValidations"); // Imports From (validations/userValidations) validations.
const joi = require("joi");

//🔅Starting The Part of Creating Models🔆

const getAll = (req, res) => {
  employee.findAll((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const addData = async (req, res) => {
  try {
    const values = await empSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const salt = genSaltSync(10); // Generating salts Rounds.
    values.passwords = hashSync(values.passwords, salt); // Password Hash Done
    employee.add(values, (results) => {
      if (!results) {
        res.status(405).json({ Error });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    let err = [];
    error.details.forEach((e) => {
      err.push({ value: e.message, key: e.path[0] });
    });
    res.status(406).json({ error: err });
  }
};

const updateData = async (req, res) => {
  let data = [];
  // When User need to Update a specifies data, it can Update that specifies fields at a time 👇.

  // First Name validation goes here 👇
  const firstName_validations = joi.object({
    first_name: joi.string().min(3).max(10).required(), // validations
  });
  if (req.body.hasOwnProperty("first_name")) {
    try {
      let first = await firstName_validations.validateAsync(req.body);
      data["first_name"] = first.first_name;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // Last Name Validations Gose here 👇
  const lastName_validation = joi.object({
    last_name: joi.string().min(3).max(10).required(), // validations
  });
  if (req.body.hasOwnProperty("last_name")) {
    try {
      let last = await lastName_validation.validateAsync(req.body);
      data["last_name"] = last.last_name;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  //Date of Barth Validations Gose here 👇
  const dob_validations = joi.object({
    dob: joi.date().iso().required(), // validations
  });
  if (req.body.hasOwnProperty("dob")) {
    try {
      let dob_value = await dob_validations.validateAsync(req.body);
      data["dob"] = dob_value.dob;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // Address Validations Gose Here 👇
  const address_validation = joi.object({
    address: joi.string().required(), // validations
  });
  if (req.body.hasOwnProperty("address")) {
    try {
      let address_valid = await address_validation.validateAsync(req.body);
      data["address"] = address_valid.address;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // Gender Validations Gose Here 👇
  const gender_validation = joi.object({
    gender: joi.string().required().valid("male", "female"),
  }); // validations
  if (req.body.hasOwnProperty("gender")) {
    try {
      let gender_valid = await gender_validation.validateAsync(req.body);
      data["gender"] = gender_valid.gender;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // Email Validations Gose Here 👇
  const email_validations = joi.object({
    email: joi
      .string()
      .lowercase()
      .regex(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/) // validations
      .required()
      .messages({
        "string.pattern.base": `Email Can't match This required Pattern`,
      }),
  });
  if (req.body.hasOwnProperty("email")) {
    try {
      let email_valid = await email_validations.validateAsync(req.body);
      data["email"] = email_valid.email;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // Phone Number validations Gose Here 👇
  const phoneNo_validation = joi.object({
    phone_number: joi
      .string()
      .regex(/^[0-9]{10}$/) // validations
      .required()
      .messages({
        "string.pattern.base": `Phone-number Must At last 10 Digit Longs`,
      }),
  });
  if (req.body.hasOwnProperty("phone_number")) {
    try {
      let phone_valid = await phoneNo_validation.validateAsync(req.body);
      data["phone_number"] = phone_valid.phone_number;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  //Passwords Validations Gose Here 👇
  const password_validation = joi.object({
    passwords: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) // validations
      .required()
      .messages({
        "string.pattern.base": `password Can't Match Required Patterns or minimum 8 Character Longs`,
      }),
  });
  if (req.body.hasOwnProperty("passwords")) {
    try {
      let password_valid = await password_validation.validateAsync(req.body);
      const salt = genSaltSync(10);
      data["passwords"] = hashSync(password_valid.passwords, salt);
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  // Is Online Validations Gose Here 👇
  const isOnline_validations = joi.object({
    is_online: joi.string().valid("yes", "no").required(), // validations
  });
  if (req.body.hasOwnProperty("is_online")) {
    try {
      let is_online_valid = await isOnline_validations.validateAsync(req.body);
      data["is_online"] = is_online_valid.is_online;
    } catch (error) {
      let err = [];
      error.details.forEach((e) => {
        err.push({ key: e.path[0], message: e.message });
      });
      return res.status(406).json({ errors: err });
    }
  }

  employee.update(data, req.params.id, (results) => {
    if (!results) {
      return res.json(Error);
    } else {
      return res.status(200).json(results);
    }
  });
};

const deleteUsers = (req, res) => {
  employee.delete(req.params.id, (results) => {
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

module.exports = { getAll, addData, updateData, deleteUsers }; // Exports All The Given Files.
