const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const role = () => {};

role.getRoles = (cb) => {
  // Define SQL Query.
  myconnections.query("SELECT * FROM `roles`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

role.addRoles = (values, cb) => {
  let sql = "INSERT INTO `roles`( `title`) VALUES (?)" // Define SQL Query.
  myconnections.query(
    sql,
    [values.title],
    (err,results) => {
      if (err) {
        cb({ status: 406, message: err.sqlMessage });
      } else {
        cb({ message: "Posted Succesfully" });
      }
    }
  );
  console.log(sql)
};

role.updates = (updateRole_valid, id, cb) => {
  myconnections.query(
    // Define SQL Query.
    "UPDATE `roles` SET `title`= ?,`updated_at`= CURRENT_TIMESTAMP WHERE id =?",
    [updateRole_valid.title, id],
    (err, results) => {
      if (results.affectedRows === 0) {
        return cb({ message: "Id is Invalid or Not Exist in Database" });
      }
      if (err) {
        return cb({ status: 404, err });
      } else {
        return cb({ status: 200, message: "Updated Succesfully" });
      }
    }
  );
};

module.exports = role; //Exports The Files.