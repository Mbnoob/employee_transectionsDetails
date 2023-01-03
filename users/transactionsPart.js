const transactions = require("../models/transactions");

const get_all = (req, res) => {
  transactions.get((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const add_data = (req, res) => {
  let data = req.body;
  transactions.add(data, (results) => {
    if (!results) {
      res.status(406).json({ Error });
    } else {
      res.status(200).json(results);
    }
  });
};

const update_data = (req, res) => {
  let data = req.body;
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

module.exports = { get_all, add_data, update_data, delete_data };
