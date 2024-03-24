const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const { port, domain } = require("./config.json");

const connectionDB = require("./server/database/connection");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
connectionDB();

app.set("views", [
  path.resolve(__dirname, "views"),
  path.resolve(__dirname, "views/other"),
  path.resolve(__dirname, "views/admin"),
  path.resolve(__dirname, "views/perms"),
]);
app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/uploads", express.static(path.resolve(__dirname, "assets/uploads")));

app.use("/", require("./server/routes/router"));

app.listen(port, () => {
  console.log(`Server is running on ${domain}:${port}`);
});
