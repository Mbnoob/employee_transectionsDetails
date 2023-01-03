const {
  getAll,
  addData,
  updateData,
  deleteUsers,
} = require("../users/employeeParts");

const {
  getDataRole,
  addtoRole,
  updateRoles,
  deleteData,
} = require("../users/roleParts");

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

router.put("/deleted/:id", deleteData);

module.exports = router;
