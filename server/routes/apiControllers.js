const router = require("express").Router();

const bodyParser = require("body-parser");
const videoSchema = require("../model/SaveSchema");
const mongoose = require("mongoose");
const yt = require("yt-converter");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

router.use(bodyParser.json());

let videoInfo = null;
let onData;
let onClose;
let close;
let newname = null;

// get video details from url
const Post_getDetail = async (req, res) => {
  const url = req.body.url;
  try {
    await yt.getInfo(url).then((info) => {
      videoInfo = info;
      videoname = info.title;
      res.status(200).json({ message: "video datas" });
      const newname = videoname.replace(/[\/\\:*?"'|]/g, "-"); // sanitize funtion

      console.log(newname);
    });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

// send get req with video details
const Get_getDetail = async (req, res) => {
  try {
    if (videoInfo) {
      res.send(videoInfo);
    } else {
      res.status(400).json({ error: "not avaiable" });
    }
  } catch (error) {
    console.log(error);
  }
};

// clear and reset video details
const post_clearUrl = async (req, res) => {
  const url = req.query.url;
  try {
    await yt.getInfo(url).then((info) => {
      videoInfo = info;
    });
  } catch (err) {
    res.json(err);
  }
};

// download and send mp3 video
const post_SaveAsAudio = async (req, res) => {
  const url = req.body.url;
  const title = req.body.title;

  const newname = title.replace(/[\/\\:*?"'|]/g, "");

  const onData = (p) => {
    percentage = p;
    console.log(p);
  };

  onClose = async (c) => {
    close = c;
    if (close) {
      res.download(`./mp3downloads/${newname}.mp3`);
      console.log(newname);

      const newVideoData = new videoSchema({
        url: url,
        itag: 140,
        title: newname,
      });
      await newVideoData.save()
    }
    console.log("Finish");
  };
  const downloadFolder = path.resolve(__dirname, "../mp3downloads");

  await yt
    .convertAudio(
      {
        url: url,
        itag: 140,
        directoryDownload: downloadFolder,
        title: newname,
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
};

// download and save as Mp$

const post_SaveAsVideo = async (req, res) => {
  try {
    const url = req.body.url;
    const title = req.body.title;
    const itag = req.body.itag;
    const qualityLabel = req.body.qualityLabel;

    const newname = title.replace(/[\/\\:*?"'|]/g, "-");
    const combinedname = newname + qualityLabel;

    onData = (p) => {
      percentage = p;
      console.log(p);
    };

    onClose = async (c) => {
      close = c;
      if (close) {
        res.download(`./Mp4downloads/${combinedname}.mp4`);
        console.log(combinedname);
        console.log(title);

        const newVideoData = new videoSchema({
          url: url,
          itag: MainTag,
          title: combinedname,
        });
        await newVideoData.save();
      }
      console.log("Finish");
    };
    const downloadFolder = path.resolve(__dirname, "../Mp4downloads");
    const MainTag = itag[0];

    try {
      const Vdata = await yt.convertVideo(
        {
          url: url,
          itag: MainTag,
          directoryDownload: downloadFolder,
          title: combinedname,
        },
        onData,
        onClose
      );

      mp3data = Vdata;
      console.log(MainTag);
    } catch (err) {
      console.log(err);
      // Handle the error here or throw it to be caught by a higher-level error handler
      throw err;
    }
  } catch (err) {
    console.log(err);
    // Handle the error here or send an appropriate response to the client
    res.status(500).send("Internal Server Error");
  }
};
 // itag 243, 396, 134

module.exports = {
  Post_getDetail,
  Get_getDetail,
  post_clearUrl,
  post_SaveAsAudio,

  post_SaveAsVideo,
};
