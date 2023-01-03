const employee = require("../models/employee");
const { genSaltSync, hashSync } = require("bcrypt");

const getAll = (req, res) => {
  employee.findAll((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const addData = (req, res) => {
  let data = req.body;
  const salt = genSaltSync(10);
  data.passwords = hashSync(data.passwords, salt);
  employee.add(data, (results) => {
    if (!results) {
      res.status(406).json({ Error });
    } else {
      res.status(200).json(results);
    }
  });
};

const updateData = (req, res) => {
  let data = req.body;
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

module.exports = { getAll, addData, updateData, deleteUsers };
