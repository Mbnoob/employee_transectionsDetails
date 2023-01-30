const login = require("../models/login"); // Import From (models/login).
const { sign } = require("jsonwebtoken"); // Json Web Token 
const { compareSync } = require("bcrypt"); // Compare Passwords.

const userLogin = (req, res) => {
  let values = req.body;
  login.withLogin(values.email, (response) => {
    if (!response[0]) {
      return res.json({ message: "Invalid Email-id" });
    }
    let result = compareSync(values.passwords, response[0].passwords); // Compare Passwords.
    if (result) {
      let jsonwebtoken = sign({ result: response }, process.env.JWT_SECRET, {    // Creating JWT Tokens
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

module.exports = { userLogin }; // Exports Files.
