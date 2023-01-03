const myconnections = require("../config/db_config");

const role = () => {};

role.getRoles = (cb) => {
  myconnections.query("SELECT * FROM `roles`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

role.addRoles = (data, cb) => {
  myconnections.query(
    "INSERT INTO `roles`( `title`) VALUES (?)",
    [data.title],
    (err, results) => {
      if (err) {
        cb({ status: 406, message: err.sqlMessage });
      } else {
        cb({ message: "Posted Succesfully" });
      }
    }
  );
};

role.updates = (data, id, cb) => {
  myconnections.query(
    "UPDATE `roles` SET `title`= ?,`updated_at`= CURRENT_TIMESTAMP WHERE id =?",
    [data.title, id],
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

module.exports = role;
