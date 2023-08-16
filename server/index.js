const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config;
const videoschema = require("./model/SaveSchema.js");
const socketIO = require("socket.io");
const yt = require("yt-converter");
const { deleteVideosInFolder } = require("./mp4downloads/deletefilesmp4.js");
const { deleteAudiosInFolderMp3 } = require("./mp3downloads/deletefilesmp3.js");
const app = express();
const fs = require("fs");
const path = require("path");
const myRouter = require("./routes/routes.js");


const mp4DownloadsFolderPath = path.join(__dirname, "mp4downloads");
const mp3DownloadsFolderPath = path.join(__dirname, "mp3downloads");



if (!fs.existsSync(mp4DownloadsFolderPath)) {
  fs.mkdirSync(mp4DownloadsFolderPath);
}

if (!fs.existsSync(mp3DownloadsFolderPath)) {
  fs.mkdirSync(mp3DownloadsFolderPath);
}

app.use(express.json());
// Enable CORS with specific origin and methods
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.ssaver.co/");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());
app.use("/", myRouter);
// call delete videos funtion
folderPath = "./mp4downloads";
deleteVideosInFolder(folderPath);

folderPathMp3 = "./mp3downloads";
deleteAudiosInFolderMp3(folderPathMp3);


PORT = process.env.PORT || 4000;
URI =
  "mongodb+srv://ibrahimdoba55:ibrahim123@authdb.kuauwfm.mongodb.net/AuthDB?retryWrites=true&w=majority";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connect"));

app.listen(PORT, () => console.log(`Server Running in ${PORT}`));
