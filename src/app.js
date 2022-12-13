const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });
const db = require("./config/connect");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
// app.use(express.static(__dirname + "/uploads"));
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.static(__dirname + "/controler-company/test"));
const router = require("./routers");
const routerAdmin = require("./routers-admin");
const routerCompany = require("./routers-company");

db();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.urlencoded());
// app.use(express.json());

app.use("/api", router);
app.use("/api/admin", routerAdmin);
app.use("/api/company", routerCompany);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
  });
}

// ----------- socket -------------
const { handleSocketEvent } = require("./socketIo");

const server = app.listen(PORT, () =>
  console.log("Server listening at http://localhost:" + PORT)
);

const socketIO = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000" },
});

handleSocketEvent(socketIO);
