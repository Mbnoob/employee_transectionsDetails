const status = require("../models/status");

const getallData = (req, res) => {
  status.get((results) => {
    if (!results[0]) {
      return res.status(400).json({ message: "Data is Empty" });
    } else {
      return res.json(results);
    }
  });
};

const add_status = (req, res) => {
  let data = req.body;
  status.add(data, (results) => {
    if (!results) {
      res.status(406).json({ Error });
    } else {
      res.status(200).json(results);
    }
  });
};

const update_status = (req, res) => {
  let data = req.body;
  status.update(data, req.params.id, (results) => {
    if (!results) {
      return res.json(Error);
    } else {
      return res.status(200).json(results);
    }
  });
};

module.exports = { getallData, add_status, update_status };
