const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const transaction_details = () => {};

transaction_details.getAll = (cb) => {
  //Define SQL Query.
  myconnections.query("SELECT * FROM `transaction_details`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

transaction_details.add_details = (add_transDetails_valid, cb) => {
  //Define SQL Query.
  myconnections.query(
    "INSERT INTO `transaction_details`(`trans_id`, `description`, `amounts`) VALUES (?, ?, ?)",
    [
      add_transDetails_valid.trans_id,
      add_transDetails_valid.description,
      add_transDetails_valid.amounts,
    ],
    (err, results) => {
      if (!results) {
        cb({code: 0});
       } else {
         return cb({ message: "Posted Succesfully" });
       }
    }
  );
};

transaction_details.update_details = (data,id,cb)=>{
  const parameters = [Object.values(data), id];
  //💥 Click Here👉(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values).
  myconnections.query(
    //Define SQL Query.
    "Update `transaction_details` SET " + Object.keys(data).map((key) => `${key} = ?`).join(", ") + ", `updated_at`= CURRENT_TIMESTAMP " + " WHERE id = ?",
    //💥 Click Here(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).
    //💥 What Is MAP👉(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
    parameters,
    (err, results) => {     
      if (err) {
        return cb(err)
      }
      else {
        return cb(results);
      }
    }
  );
}
module.exports = transaction_details; // Exports The Files.
