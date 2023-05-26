const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config;
const videoschema = require("./model/SaveSchema.js");
const socketIO = require("socket.io");
const { emitProgress, emitFinish } = require("./routes/socket.js");
const yt = require("yt-converter");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const myRouter = require("./routes/routes.js");

app.use(express.json());
app.use(cors());

app.use("/", myRouter);

PORT = process.env.PORT || 4000;
URI =
  "mongodb+srv://ibrahimdoba55:ibrahim123@authdb.kuauwfm.mongodb.net/AuthDB?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connect"));

http.listen(PORT, () => console.log(`Server Running in ${PORT}`));
