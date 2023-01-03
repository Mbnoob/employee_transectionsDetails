const myconnections = require("../config/db_config");

const employee = () => {};

employee.findAll = (cb) => {
  myconnections.query("SELECT * FROM `employees`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

employee.add = (data, cb) => {
  myconnections.query(
    "INSERT INTO `employees`(`first_name`,`last_name`,`dob`,`address`,`gender`,`email_id`,`phone_number`,`passwords`,`is_online`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      data.first_name,
      data.last_name,
      data.dob,
      data.address,
      data.gender,
      data.email_id,
      data.phone_number,
      data.passwords,
      data.is_online,
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
  myconnections.query(
    "UPDATE `employees` SET `first_name`= ?,`last_name`= ?,`dob`= ?,`address`= ?,`gender`= ?,`email_id`= ?,`phone_number`= ?,`passwords`= ?,`is_online`= ?, `updated_at`= CURRENT_TIMESTAMP WHERE id = ?",
    [
      data.first_name,
      data.last_name,
      data.dob,
      data.address,
      data.gender,
      data.email_id,
      data.phone_number,
      data.passwords,
      data.is_online,
      id,
    ],
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

module.exports = employee;
