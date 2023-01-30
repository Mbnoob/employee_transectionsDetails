// This Is The part Of Checkings Roles Authentications (Only For Admin or Moderator).

const { verify } = require("jsonwebtoken");

const isAdminorModerator = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7); // To Get The Actual Token From B.E.A.R.E.R
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      if (
        decoded.result[0].roles === "admin" ||
        decoded.result[0].roles === "moderator"
      ) {
        next();
      } else {
        res.status(406).json({ message: "You Are Not Admin or Moderator" });
      }
    });
  } else {
    res.status(400).json({ message: "Access Failed" });
  }
};

module.exports = { isAdminorModerator }; // Exports The File.