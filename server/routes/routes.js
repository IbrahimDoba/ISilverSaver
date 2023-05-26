const router = require("express").Router();

const bodyParser = require("body-parser");
const videoSchema = require("../model/SaveSchema");
const yt = require("yt-converter");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path')

router.use(bodyParser.json());

let videoInfo = null;
let mp3data = null;
let onData;
let onClose;
let percentage;
let close;
// get video details from url
router.post("/geturldetail", async (req, res) => {
  const url = req.body.url;
  try {
    await yt.getInfo(url).then((info) => {
      videoInfo = info;
      res.status(200).json({ message: "video datas" });
    });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});
// send get req with video details
router.get("/geturldetail", async (req, res) => {
  try {
    if (videoInfo) {
      res.send(videoInfo);
    } else {
      res.status(400).json({ error: "not avaiable" });
    }
  } catch (error) {
    console.log(error);
  }
});
// clear and reset video details
router.get("/clearUrl", async (req, res) => {
  const url = req.query.url;
  try {
    await yt.getInfo(url).then((info) => {
      videoInfo = info;
    });
  } catch (err) {
    res.json(err);
  }
});
// download and send mp3 video 
router.post("/convertToMp3", async (req, res) => {
  const url = req.body.url;
  const title = req.body.title;

  onData = (p) => {
    percentage = p;
    console.log(p);
  };

  onClose = (c) => {
    close = c;
    if (close) {
     res.download(`./downloads/${title}.mp3`);
      // console.log(title)
    }
    console.log("Finish");
  };
  const downloadFolder = path.resolve(__dirname, '../downloads')

  await yt
    .convertAudio(
      {
        url: url,
        itag: 140,
        directoryDownload: downloadFolder,
        title: title,
      },
      onData,
      onClose
    )
    .then((Vdata) => {
      mp3data = Vdata;
     
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
