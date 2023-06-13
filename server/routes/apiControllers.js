const router = require("express").Router();

const bodyParser = require("body-parser");
const videoSchema = require("../model/SaveSchema");
const mongoose = require("mongoose");
const yt = require("yt-converter");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const { Readable } = require("stream");

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
    updateStream.push(`${p}\n`);
  };

  onClose = async (c) => {
    close = c;
    if (close) {
      console.log(newname);
      updateStream.push(null);
      //  res.download(`./mp3downloads/${newname}.mp3`);
      get_DownloadMp3();
      const newVideoData = new videoSchema({
        url: url,
        itag: 140,
        title: newname,
      });
      await newVideoData.save();
    }
    console.log("Finish");
  };

  const updateStream = new Readable({
    read() {
      // Nothing needed here
    },
  });

  // Set the response headers
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Pipe the update stream to the response stream
  updateStream.pipe(res);

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
      mp3data = newname;
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_DownloadMp3 = async (res, req) => {
  try {
    console.log(mp3data);
    // await res.send(mp3data)
    await res.download(`./mp3downloads/${mp3data}.mp3`);
  } catch (err) {
    console.log(err);
  }
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

    onData = async (p) => {
      percentage = p;
      console.log("percent value", p);
      updateStream.push(JSON.stringify({ percentage: p }) + "\n");
    };

    onClose = async (c) => {
      close = c;
      if (close) {
        updateStream.push(null);
        console.log(combinedname);
        get_DownloadToMp4(req, res, combinedname);

        // res.download(`./mp4downloads/${combinedname}.mp4`);
        // console.log(combinedname);
        // console.log(title);

        const newVideoData = new videoSchema({
          url: url,
          itag: MainTag,
          title: combinedname,
        });
        await newVideoData.save();
      }
      console.log("Finish");
    };

    const updateStream = new Readable({
      read() {},
    });
    // Set the response headers
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // pipe the update stream to the response stream
    updateStream.pipe(res);

    const downloadFolder = path.resolve(__dirname, "../mp4downloads");
    const MainTag = itag[0];

    try {
      yt.convertVideo(
        {
          url: url,
          itag: MainTag,
          directoryDownload: downloadFolder,
          title: combinedname,
        },
        onData,
        onClose
      ).then((VideoData) => {
        newNameHere = combinedname
        console.log("naehereis",newNameHere)
      });

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
const get_DownloadToMp4 = async (req, res) => {
  try {
    

     console.log("videoname", newNameHere);
     await res.download(`./mp4downloads/${newNameHere}.mp4`);
  } catch (err) {
    console.log(err);
  }
};
// itag 243, 396, 134

module.exports = {
  Post_getDetail,
  Get_getDetail,
  post_clearUrl,
  post_SaveAsAudio,
  get_DownloadMp3,
  post_SaveAsVideo,
  get_DownloadToMp4,
};
