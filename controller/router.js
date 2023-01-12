const {
  getAll,
  addData,
  updateData,
  deleteUsers,
} = require("../users/employeeParts");

const { getDataRole, addtoRole, updateRoles } = require("../users/roleParts");

const {
  get_all,
  add_data,
  update_data,
  delete_data,
} = require("../users/transactionsPart");

const {
  getallData,
  add_status,
  update_status,
} = require("../users/statusParts");

const { userLogin } = require("../users/userLogin");

const { checkToken } = require("../auth/validation");

const { isAdmin } = require("../auth/validation");

const express = require("express");
const router = express.Router();

//--------------🎇Empolyee 🎆--------------

router.get("/get", checkToken, getAll);

router.post("/post", addData);

router.put("/put/:id", updateData);

router.put("/delete/:id", checkToken, deleteUsers);

//-----------🎄Roles🎍--------------------

router.get("/getall", checkToken, getDataRole);

router.post("/addrole", checkToken, addtoRole);

router.put("/updaterole/:id", checkToken, updateRoles);

//-----------✨Ttansections🎊----------------

router.get("/get_all", checkToken, get_all);

router.post("/addtrans", checkToken, add_data);

router.put("/updatetrans/:id", checkToken, update_data);

router.put("/deletetrans/:id", checkToken, delete_data);

//-----------✨Status🎊----------------

router.get("/getallData", checkToken, getallData);

router.post("/add_status", checkToken, add_status);

router.put("/update_status/:id", checkToken, update_status);

router.post("/emplogin", userLogin);

module.exports = router;
