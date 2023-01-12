const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Access Failed" });
  }
};

const isAdmin = (req, res, next) => {
  let role = req.body.role
  if (role === "Admin") {
    res.json({ message: "Welcome Admin" });
    next();
  } else {
    res.json({ message: "You are not admin" });
  }
};

module.exports = { checkToken, isAdmin };
