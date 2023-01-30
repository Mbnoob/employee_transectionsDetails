const role = require("../models/roles"); // Imports From (models/roles).
const { role_schema } = require("../validations/rolePart_validations"); // Import From (validations/rolePart_validations).

const getDataRole = (req, res) => {
  role.getRoles((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const addtoRole = async (req, res) => {
  try {
    const values = await role_schema.validateAsync(req.body, {     //Validatios 
      abortEarly: false,
    });
    role.addRoles(values, (results) => {
      if (!results) {
        res.status(406).json({ Error });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    let err = [];
    error.details.forEach((e) => {
      err.push({ key: e.path[0], message: e.message });
    });
    res.status(406).json({ errors: err, message: error.message });
  }
};

const updateRoles = async (req, res) => {
  try {
    const updateRole_valid = await role_schema.validateAsync(req.body, {  // Validations
      abortEarly: false,
    });
    role.updates(updateRole_valid, req.params.id, (results) => {
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
    res.status(406).json({ erros: err });
  }
};

module.exports = { getDataRole, addtoRole, updateRoles };  //Exports All The Given Fils.
