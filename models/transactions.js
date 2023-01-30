const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const transactions = () => {};

transactions.get = (cb) => {
  //Define SQL Query.
  myconnections.query("SELECT * FROM `transactions`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

transactions.add = (transections_valid, cb) => {
  myconnections.query(
    //Define SQL Query.
    "INSERT INTO `transactions`(`emp_id`, `amounts`, `types`, `payments_date`, `current_status_id`) VALUES (?, ?, ?, ?, ?)",
    [
      transections_valid.emp_id,
      transections_valid.amounts,
      transections_valid.types,
      transections_valid.payments_date,
      transections_valid.current_status_id,
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

transactions.update = (data, id, cb) => {
  const parameters = [Object.values(data), id]; //💥 Click Here👉(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values).
  myconnections.query(
    //Define SQL Query.
    "Update `transactions` SET " + Object.keys(data).map((key) => `${key} = ?`).join(", ") + ", `updated_at`= CURRENT_TIMESTAMP " + " WHERE id = ?",
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

transactions.delete = (id, res) => {
  myconnections.query(
    //Define SQL Query.
    "UPDATE `transactions` SET `is_deleted`='true',`deleted_at`=CURRENT_TIMESTAMP,`deleted_by`=CURRENT_USER,`updated_at`= CURRENT_TIMESTAMP WHERE id =?",
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

module.exports = transactions; // Exports The Files.