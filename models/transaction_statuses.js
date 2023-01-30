const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const transaction_statuses = () => {};

transaction_statuses.getAll = (cb) => {
  myconnections.query(
    "SELECT * FROM `transaction_statuses`",
    (err, results) => {
      if (err) {
        cb(err);
      } else {
        cb(results);
      }
    }
  );
};

transaction_statuses.addData = (trans_status_valid, cb) => {
  myconnections.query(
    "INSERT INTO `transaction_statuses`(`transaction_id`, `transactions_status_id`, `created_by`) VALUES (?, ?, ?)",
    [
      trans_status_valid.transaction_id,
      trans_status_valid.transactions_status_id,
      trans_status_valid.created_by,
    ],
    (err, results) => {
      if (err) {
        cb(err);
      } else {
        cb(results);
      }
    }
  );
};


module.exports = transaction_statuses;
