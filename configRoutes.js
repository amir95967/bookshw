const indexR = require("./index");
const usersR = require("./users")
const cakesR = require("./cakes")
const carsR = require("./cars")
const booksR = require("./books")


exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/cakes", cakesR);
  app.use("/cars", carsR);
  app.use("/books", booksR);
}