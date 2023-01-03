const { removeListener } = require("../config/db_config");
const { param } = require("../controller/router");
const role = require("../models/roles");

const getDataRole = (req, res) => {
  role.getRoles((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const addtoRole = (req, res) => {
  let data = req.body;
  role.addRoles(data, (results) => {
    if (!results) {
      res.status(406).json({ Error });
    } else {
      res.status(200).json(results);
    }
  });
};

const updateRoles = (req, res) => {
  let data = req.body;
  role.updates(data, req.params.id, (results) => {
    if (!results) {
      return res.json(Error);
    } else {
      return res.status(200).json(results);
    }
  });
};

module.exports = { getDataRole, addtoRole, updateRoles};
