const router = require("express").Router();
const apiController = require("./apiControllers.js");


// get video details from url
router.post("/geturldetail", apiController.Post_getDetail);
// send get req with video details
router.get("/geturldetail", apiController.Get_getDetail);
// clear and reset video details
router.get("/clearUrl", apiController.post_clearUrl);
// download and save mp3 audio
router.post("/convertToMp3", apiController.post_SaveAsAudio);
// download to mp3
router.get("/downloadToMp3", apiController.get_DownloadMp3)
// download and save 
router.post("/downloadToMp4", apiController.post_SaveAsVideo);
// download to mp4
router.get("/downloadToVideo", apiController.get_DownloadToMp4)


module.exports = router;
