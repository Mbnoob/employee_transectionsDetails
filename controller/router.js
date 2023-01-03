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

const express = require("express");
const router = express.Router();

//--------------🎇Empolyee 🎆--------------

router.get("/get", getAll);

router.post("/post", addData);

router.put("/put/:id", updateData);

router.put("/delete/:id", deleteUsers);

//-----------🎄Roles🎍--------------------

router.get("/getall", getDataRole);

router.post("/addrole", addtoRole);

router.put("/updaterole/:id", updateRoles);

//-----------✨Ttansections🎊----------------

router.get("/get_all", get_all);

router.post("/addtrans", add_data);

router.put("/updatetrans/:id", update_data);

router.put("/deletetrans/:id", delete_data);

//-----------✨Status🎊----------------

router.get("/getallData", getallData);

router.post("/add_status", add_status);

router.put("/update_status/:id", update_status);

module.exports = router;
