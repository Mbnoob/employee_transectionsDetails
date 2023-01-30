const myconnections = require("../config/db_config"); // Import Database From (config/db_config).

const login = () => {};

login.withLogin = (email, cb) => {
  myconnections.query(
    // Define SQL Query.
    "SELECT employees.* , roles.title as roles FROM employees JOIN employee_roles ON employee_roles.emp_id = employees.id JOIN roles ON roles.id = employee_roles.role_id WHERE employees.email = ?",
    [email],
    (err, results) => {
      if (err) {
        return cb(err);
      } else {
        return cb(results);
      }
    }
  );
};

module.exports = login; // Export The Files.
