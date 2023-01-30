const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const employee = () => {};

employee.findAll = (cb) => {
  //Define SQL Query.
  myconnections.query("SELECT * FROM `employees`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

employee.add = (values, cb) => {
  //Define SQL Query.
  myconnections.query(
    "INSERT INTO `employees`(`first_name`,`last_name`,`dob`,`address`,`gender`,`email`,`phone_number`,`passwords`,`is_online`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      values.first_name,
      values.last_name,
      values.dob,
      values.address,
      values.gender,
      values.email,
      values.phone_number,
      values.passwords,
      values.is_online,
    ],
    (err, results) => {
      if (err) {
        cb({ status: 406, message: err.sqlMessage });
      } else {
        cb({ message: "Posted Succesfully" });
      }
    }
  );
};

employee.update = (data, id, cb) => {
  const parameters = [Object.values(data), id];
  //💥 Click Here👉(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values).
  myconnections.query(
    //Define SQL Query.
    "Update `employees` SET " + Object.keys(data).map((key) => `${key} = ?`).join(", ") + ", `updated_at`= CURRENT_TIMESTAMP " + " WHERE id = ?",
    //💥 Click Here(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).
    //💥 What Is MAP👉(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
    parameters,
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

employee.delete = (id, res) => {
  myconnections.query(
    // Define SQL Query.
    "UPDATE `employees` SET `is_deleted`= true,`deleted_at`= CURRENT_TIMESTAMP,`deleted_by`= CURRENT_USER,`updated_at`= CURRENT_TIMESTAMP WHERE id = ?",
    [id],
    (err, results) => {
      if (results) {
        return res(results);
      }
      if (err) {
        return res(err);
      } else {
        return res(results);
      }
    }
  );
};

module.exports = employee; // Exports The Files.