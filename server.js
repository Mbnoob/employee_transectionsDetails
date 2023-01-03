require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./controller/router");
app.use(express.json());

app.use("/employee", router);
app.use("/roles", router);
app.use("/transactions", router);
app.use("/status", router);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`Server Connected Sucessfully on ${process.env.PORT}`);
  } else {
    console.log(err);
  }
});
