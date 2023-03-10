// This Is The part Of Checking Users.

const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7); // To Get The Actual Token From B.E.A.R.E.R
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        next();
      }
    });
  } else {
    return res.status(400).json({ message: "Access Failed" });
  }
};

module.exports = { checkToken }; // Exports The File.