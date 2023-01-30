const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const status = () => {};

status.get = (cb) => {
   //Define SQL Query.
  myconnections.query("SELECT * FROM `statuses`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

status.add = (status_valid, cb) => {
  myconnections.query(
     //Define SQL Query.
    "INSERT INTO `statuses`(`statues`) VALUES (?)",
    [status_valid.statues],
    (err, results) => {
      if (err) {
        cb({ status: 406, message: err.sqlMessage });
      } else {
        cb({ message: "Posted Succesfully" });
      }
    }
  );
};

status.update = (status_valid, id, cb) => {
  myconnections.query(
     //Define SQL Query.
    "UPDATE `statuses` SET `statues`= ?,`updated_at`=CURRENT_TIMESTAMP WHERE id = ?",
    [status_valid.statues, id],
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

module.exports = status; // Exports The Files.