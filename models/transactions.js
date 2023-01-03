const myconnections = require("../config/db_config");

const transactions = () => {};

transactions.get = (cb) => {
  myconnections.query("SELECT * FROM `transactions`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

transactions.add = (data, cb) => {
  myconnections.query(
    "INSERT INTO `transactions`(`emp_id`, `amounts`, `types`, `payments_date`, `current_status_id`) VALUES (?, ?, ?, ?, ?)",
    [
      data.emp_id,
      data.amounts,
      data.types,
      data.payments_date,
      data.current_status_id,
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
  myconnections.query(
    "UPDATE `transactions` SET `emp_id`=?,`amounts`= ?,`types`=?,`payments_date`=?,`current_status_id`=?,`updated_at`= CURRENT_TIMESTAMP WHERE id =?",
    [
      data.emp_id,
      data.amounts,
      data.types,
      data.payments_date,
      data.current_status_id,
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

transactions.delete = (id, res) => {
  myconnections.query(
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

module.exports = transactions;
