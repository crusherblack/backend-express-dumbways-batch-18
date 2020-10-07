//import express module
const express = require("express");

//use express in app variable
const app = express();

const router = require("./src/routes/router");
const router2 = require("./src/routes/router2");

app.use(express.json());

app.use("/api/v1/", router);
app.use("/api/v2/", router2);

//define the server port
const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
