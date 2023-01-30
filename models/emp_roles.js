const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const emp_roles = () => {};

emp_roles.add = (values, cb) => {
  myconnections.query(
    "INSERT INTO `employee_roles`(`emp_id`, `role_id`) VALUES (?, ?)",
    [values.emp_id, values.role_id],
    (err, Result) => {
      if (!Result) {
       cb({code: 0});
      } else {
        return cb({ message: "Posted Succesfully" });
      }
    }
  );
};

module.exports = emp_roles; // Export the Files.
