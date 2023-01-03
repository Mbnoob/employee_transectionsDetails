const myconnections = require("../config/db_config");

const status = () => {};

status.get = (cb) => {
  myconnections.query("SELECT * FROM `statuses`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

status.add = (data, cb) => {
  myconnections.query(
    "INSERT INTO `statuses`(`statues`) VALUES (?)",
    [data.statues],
    (err, results) => {
      if (err) {
        cb({ status: 406, message: err.sqlMessage });
      } else {
        cb({ message: "Posted Succesfully" });
      }
    }
  );
};

status.update = (data, id, cb) => {
  myconnections.query(
    "UPDATE `statuses` SET `statues`= ?,`updated_at`=CURRENT_TIMESTAMP WHERE id = ?",
    [data.statues, id],
    (err, results) => {
      if (results.affectedRows === 0) {
        return cb({ message: "User Not Exist in Database" });
      }
      if (err) {
        return cb({ status: 404, err });
      } else {
        return cb({ status: 200, message: "Updated Succesfully" });
      }
    }
  );
};
module.exports = status;
