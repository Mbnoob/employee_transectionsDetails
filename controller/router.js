const {
  getAll,
  addData,
  updateData,
  deleteUsers,
} = require("../users/employeeParts");

const { getDataRole, addtoRole, updateRoles } = require("../users/roleParts"); // Imported From (users/roleParts) File.

const {
  get_all,
  add_data,
  update_data,
  delete_data,
} = require("../users/transactionsPart"); // Imported From (users/transactionsPart) File.

const {
  getallData,
  add_status,
  update_status,
} = require("../users/statusParts"); // Imported From (users/statusParts) File.

const { addInto_emp_role } = require("../users/emp_roles_parts"); // Imported from (users/emp_roles_parts).

const {
  getAll_trans_details,
  add_transection_details,
  update_transections_details,
} = require("../users/transections_details_part");

const { get_all_trans_status, addData_trans_status } = require("../users/transaction_statuses_part");

const { userLogin } = require("../users/userLogin"); // Imported From (users/userLogin) File.

const { checkToken } = require("../auth/validation"); // Imported From (auth/validation) File.

const { isAdminorModerator } = require("../auth/isAdminorModerator"); // imported From (auth/isAdminorModerator) File.

const { onlyAdmin } = require("../auth/onlyAdmin"); // Imported Form (auth/onlyAdmin) File.

const express = require("express");
const router = express.Router(); // The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.

//--------------🎇Empolyee 🎆--------------

router.get("/employees_details_get", isAdminorModerator, getAll); // To Get All The Details Of Employees.

router.post("/employees_registrations", checkToken, addData); // To Registared a New Employees.

router.put("/employees_details_update/:id", checkToken, updateData); // To Update a Employees Details.

router.put("/delete_emoployees/:id", onlyAdmin, deleteUsers); // To Delete a Employees Details.

//-----------🎄Roles🎍--------------------

router.get("/get_all_roles", checkToken, getDataRole); // To Get All Roles Details.

router.post("/add_new_roles", checkToken, addtoRole); // To Add New Roles in The Database.

router.put("/update_roles/:id", checkToken, updateRoles); // To Update a Roles Details.

//-----------✨Ttansections🎊----------------

router.get("/get_all_transections", isAdminorModerator, get_all); // To Get All Transections Details.

router.post("/add_transections", onlyAdmin, add_data); // To Add New Transections Details in Database.

router.put("/update_trnsections_details/:id", onlyAdmin, update_data); // To Update Transctions Details.

router.put("/delete_transectios/:id", onlyAdmin, delete_data); // To Delete a Transections Details.

//-----------✨Status🎊----------------

router.get("/get_all_status", isAdminorModerator, getallData); // To Get All The Status Details.

router.post("/add_status", isAdminorModerator, add_status); // To Add a Status In Database.

router.put("/update_status/:id", isAdminorModerator, update_status); // To Update a Status Details.

//..............🎏Employee_Roles🎑....................

router.post("/add_emp_roles", isAdminorModerator, addInto_emp_role);

//------------------🎊Transsectin_Details Parts🎉-----------------------------

router.get(
  "/get_transections_details",
  isAdminorModerator,
  getAll_trans_details
);

router.post(
  "/add_transections_details",
  isAdminorModerator,
  add_transection_details
);

router.put(
  "/update_transections_details/:id",
  isAdminorModerator,
  update_transections_details
);

// -------------------Transections Status Part Is Here-------------

router.get("/get_all_trans_status", isAdminorModerator, get_all_trans_status);

router.post("/addData_trans_status", isAdminorModerator, addData_trans_status);

//---------------------0------------------------------
router.post("/emplogin", userLogin); // User login Part.

module.exports = router; // It exports as a 'router' file. (The 'module.exports' is a special object which is included in every JavaScript file in the Node.js application by default. The module is a variable that represents the current module, and exports is an object that will be exposed as a module. So, whatever you assign to module.exports will be exposed as a module.)
