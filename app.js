const express = require("express");
const http = require("http");
const path = require("path");
const { routesInit } = require("./routes/configRoutes")
require("./db/mongoConnect");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
routesInit(app);
const server = http.createServer(app);
server.listen(3001);