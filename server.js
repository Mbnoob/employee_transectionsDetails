// Creating a Server.

require("dotenv").config();
const express = require("express");
const app = express(); // Use Express.
const router = require("./controller/router"); // import Router Part.
app.use(express.json()); // Convert Express To Json File Format.

app.use("/employee", router);
app.use("/roles", router);
app.use("/transactions", router);
app.use("/status", router);
app.use("/emp_roles", router);
app.use("/transection_details", router);
app.use("/transections_status", router);
app.use("/", router);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`🎄Server Connected Sucessfully on ${process.env.PORT}🎃`);
  } else {
    console.log(err);
  }
});
