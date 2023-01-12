const login = require("../models/login");
const { sign } = require("jsonwebtoken");
const { compareSync } = require("bcrypt");

const userLogin = (req, res) => {
  let values = req.body;
  login.withLogin(values.email, (response) => {
    if (!response[0]) {
      return res.json({ message: "Invalid Email-id" });
    }
    let result = compareSync(values.passwords, response[0].passwords);
    if (result) {
      let jsonwebtoken = sign({ result: response }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPAIRED,
      });
      return res.json({
        message: "login sucessfully",
        roles: response[0].roles,
        token: jsonwebtoken,
      });
    } else {
      return res.status(406).json({ message: "Invalid passwords" });
    }
  });
};

module.exports = { userLogin };
