const router = require("express").Router();
const apiController = require("./apiControllers.js");

router.get("/", apiController.GetDefault)
// get video details from url
router.post("/youtube-video-details", apiController.postVideoDetails);
// send get req with video details
router.get("/youtube-video-details", apiController.getVideoDetails);
// clear and reset video details
router.get("/clear-url", apiController.post_clearUrl);
// download and save mp3 audio
router.post("/youtube-audio-converter", apiController.convertToAudio);
// download to mp3
router.get("/youtube-audio-downloader", apiController.downloadAudio)
// download and save 
router.post("/youtube-video-converter", apiController.convertToVideo);
// download to mp4
router.get("/youtube-video-downloader", apiController.downloadVideo)
// ternminate stream
// router.post("/terminateStream", apiController.post_terminateStream )
router.post ("/test-download", apiController.testVideoDownload)


module.exports = router;
