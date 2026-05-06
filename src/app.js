const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/user"));
module.exports = app;
