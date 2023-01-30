const emp_roles = require("../models/emp_roles");
const {emp_roles_schema} = require("../validations/emp_roles_validationsa");

const addInto_emp_role = async(req, res) => {
  try {
    const values = await emp_roles_schema.validateAsync(req.body,{
      abortEarly: false,
    })
    emp_roles.add(values, (results) => {
      if (!results) {
        return res.status(401).json(Error);
      }
      if (results.code === 0) {
      return res.status(406).json({message: "Cannot Add or Update(Maybe emp_id is Exist or Role_id is Exist)"})
      }
       else {
        return res.json(results);
      }
    });
  } catch (error) {           // Creating An Array to Get All The Required Errors As Array Format.
    let err = []
    error.details.forEach((e) => {
      err.push({keys: e.path[0], message: e.message});
    });
    res.status(406).json({errors: err})
  };
};

module.exports = { addInto_emp_role }; // Export this Files.
