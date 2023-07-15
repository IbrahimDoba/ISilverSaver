import React, { useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import { AiOutlineDown } from "react-icons/ai";

const Homepage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoToMp3, setVideoToMp3] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [matchedData, setMatchedData] = useState([]);
  // const [endStream, setEndSteam] = useState(false);

  // remove string after underscore
  const removeString = () => {
    const modifiedUrl = videoUrl.split("_channel")[0];
    setVideoUrl(modifiedUrl);
  };
  // create modal for notifications
  const AlertModal = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex  items-center justify-center border bg-gray-300/75 ">
        <div className=" flex h-[200px] w-[400px] flex-col justify-between rounded-lg bg-white p-6 shadow-2xl max-md:w-[350px]">
          <p className="text-center text-2xl">{message}</p>
          {/* {endStream && (
            <button
              onClick={termiateStream}
              className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
            >
              Terminate Download
            </button>
          )} */}
          <button
            className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
            onClick={onClose}
          >
            close
          </button>
        </div>
      </div>
    );
  };
  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };
  // handle dropdown item click
  const handleDropClick = () => {
    setShowDrop(!showDrop);
  };

  // submit function and get info of url
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    removeString();
    try {
      if (videoUrl === "") {
        setModalMessage("YouTube Link Is Missing!");
        setShowModal(true);
        setIsLoading(false);
        return;
      }
      await axios.post("https://youtube-saver.onrender.com/geturldetail", {
        url: videoUrl,
      });

      await fetchVideoInfo();
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalMessage("Invalid link");
        setShowModal(true);
        setIsLoading(false);
      }
    }
  };
  // get video info
  const fetchVideoInfo = async () => {
    const res = await axios.get("https://youtube-saver.onrender.com/geturldetail");
    try {
      setVideoInfo([res.data]);
      console.log("videoinfo", videoInfo);
      setVideoTitle(res.data.title);

      const QLtoMatch = [
        "2160p60",
        "1440p60",
        "1080p60",
        "1080p",
        "720p",
        "480p",
        "360p",
        "240p",
      ];

      const allMatchedData = res.data.formatsVideo.filter((data) =>
        QLtoMatch.includes(data.qualityLabel)
      );
      console.log("QL", allMatchedData);
      setMatchedData(allMatchedData);
    } catch (error) {
      
      console.log("err", error);
    }
  };
  const handleDropItemClick = (qualityLabel) => {
    const GetItag = matchedData
      .filter((data) => data.qualityLabel === qualityLabel)
      .map((data) => data.itag);

    convertToMp4(GetItag, qualityLabel);
    console.log(`Clicked ${qualityLabel}`, GetItag);
  };
  // clear search input and saved input
  const clearSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get("https://youtube-saver.onrender.com/clearUrl", {
      params: {
        url: "",
      },
    });
    console.log("cleardata", res.data);
    setVideoInfo([]);
    setVideoUrl("");
    setIsLoading(false);
  };

  // donwload  audio funtions
  const convertToMp3 = async (e) => {
    e.preventDefault();
    if (!videoUrl || videoUrl.trim() === "") {
      setShowModal(true);
      setModalMessage("YouTube Link Is Missing!");
      return;
    }
    console.log(videoToMp3);
    setVideoToMp3(true);
    setShowModal(true);
    setModalMessage("Download Getting Ready Please Wait.....");

    fetch("https://youtube-saver.onrender.com/convertToMp3", {
      method: "POST",
      body: JSON.stringify({ url: videoUrl, title: videoTitle }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const reader = response.body.getReader();
        let received = "";

        function read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              // Perform any necessary tasks after the conversion is complete
              setVideoToMp3(false);
              setShowModal(true);
              setModalMessage("Download Complete: " + received + "%");
              DownloadToMp3();
              return;
            }

            // Process the received data
            const chunk = new TextDecoder("utf-8").decode(value);

            received = Math.round(parseFloat(chunk));
            console.log("Received:", received);
            setModalMessage("Download Percentage: " + received + "%");

            // Continue reading the stream
            read();
          });
        }

        read();
      })
      .catch((err) => {
        console.error("Error occurred during POST", err);
        setShowModal(true);
        setModalMessage("An error occurred while converting this video!!");
        setVideoToMp3(false);
      });
  };

  const DownloadToMp3 = () => {
    axios
      .get("https://youtube-saver.onrender.com/downloadToMp3", { responseType: "blob" })
      .then((res) => {
        FileDownload(res.data, `${videoTitle}.mp3`);
        setVideoToMp3(false);

        setShowModal(true);
        setModalMessage("Download Successful");
        if (showModal === true) {
          setShowModal(false);
        }
      });
  };

  const convertToMp4 = async (itag, qualityLabel) => {
    // e.preventDefault();
    if (!videoUrl || videoUrl.trim() === "") {
      setShowModal(true);
      setModalMessage("YouTube Link Is Missing!");
      return;
    }
    setVideoToMp3(true);
    setShowModal(true);
    setModalMessage("Download Getting Ready Please Wait.....");

    fetch("https://youtube-saver.onrender.com/downloadToMp4", {
      method: "POST",
      body: JSON.stringify({
        url: videoUrl,
        title: videoTitle,
        itag: itag,
        qualityLabel: qualityLabel,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const reader = res.body.getReader();
        let received = "";

        function read() {
          reader.read().then(({ done, value }) => {
            // if (done && received !== 100) {
            //   setModalMessage("Download Canceled ");
            //   console.log("terminated");
            //   return;
            // }
            if (done) {
              // perfrom task after conversion is completed
              setVideoToMp3(false);
              setShowModal(true);
              setModalMessage("Download Complete: " + received + "%");
              DownloadToMp4(qualityLabel);
              console.log("done value", done);
              return;
            }

            // process the recieved datas
            const decoder = new TextDecoder("utf-8");
            const chunk = decoder.decode(value);
            const parsedChunk = JSON.parse(chunk);
            const percentageValue = parsedChunk.percentage.percentage;
            received = Math.round(parseFloat(percentageValue));

            console.log("Recived: ", received);
            setModalMessage("Download Percentage: " + received + "%");
            // setEndSteam(true);

            // continue reading the stream
            read();
          });
        }
        read();
      })
      .catch((err) => {
        console.error("Error occurred during POST", err);
        setShowModal(true);
        setModalMessage("An error occured while converting this video!!");
        setVideoToMp3(false);
      });
  };

  const DownloadToMp4 = (qualityLabel, combinedname) =>
    axios
      .get("https://youtube-saver.onrender.com/downloadToVideo", {
        responseType: "blob",
        params: {
          titlename: combinedname,
        },
      })
      .then((res) => {
        const combinedname = videoTitle + qualityLabel;
        // const blob = new Blob([res.data], { type: "video/mp4" });

        //  create a url object from the blob
        // const url = window.URL.createObjectURL(blob);

        // create a temp anchor tag to initiate the download
        // const a = document.createElement("a");
        // a.href = url;
        // a.download = combinedname + ".mp4";
        // a.click();

        // clean up the url obj
        // window.URL.revokeObjectURL(url);

        FileDownload(res.data, `${combinedname}.mp4`);
        setVideoToMp3(true);
        setShowModal(true);
        setModalMessage("Download successful");
      });

  // const termiateStream = async () => {
  //   axios.post("http://localhost:4000/terminateStream");
  //   try {
  //     console.log("Steam Terminated sucess");
  //   } catch (err) {
  //     console.log("error transimiing steam", err);
  //   }
  // };

  return (
    <div className="flex flex-col items-center  bg-[#ffffff]">
      <form
        onSubmit={handleSubmit}
        className=" mx-auto my-6  lg:min-w-[600px] max-md:w-[80%]"
      >
        {showModal && (
          <AlertModal message={modalMessage} onClose={closeModal} />
        )}
        <div className="flex items-center  border-b-2 border-[#93dc99] py-2">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mr-3 w-full  appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
            placeholder="Enter Youtube URL"
          />
          <button
            onClick={clearSearch}
            className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none max-md:px-2 max-md:text-sm"
          >
            Clear
          </button>
          <button
            type="submit"
            className="focus:shadow-outline ml-4 rounded bg-[#93dc99] px-4 py-2 font-bold text-TXT hover:bg-ACT focus:outline-none max-md:px-2 max-md:text-sm"
          >
            Search
          </button>
        </div>
      </form>
      {isloading ? (
        <div className="flex min-h-[500px] min-w-[800px] flex-col items-center justify-center border bg-white">
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-13 dark:text-white-600 mr-2 w-12 animate-spin fill-blue-600 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3 text-lg font-semibold">Loading....</p>
        </div>
      ) : (
        <>
          {videoInfo && videoInfo.length > 0 ? (
            videoInfo.map((video, index) => (
              <div
                key={index}
                className="flex min-h-[500px] min-w-[800px] flex-col items-center justify-center border bg-white max-lg:min-w-[650px] max-md:min-h-[250px] max-md:min-w-[350px]"
              >
                <img
                  className="w-[80%] object-contain  "
                  src={video.thumbnails[4].url || video.thumbnails[3].url}
                  alt="thumbnail"
                />
                <h2 className="mt-4 text-2xl font-semibold max-md:text-sm">
                  {video.title}
                </h2>
              </div>
            ))
          ) : (
            <div className="  flex min-h-[250px] min-w-[800px] items-center justify-center border bg-white max-lg:min-w-[650px] max-md:min-h-[150px] max-md:min-w-[350px]">
              <span className="text-xl font-semibold">No image available</span>
            </div>
          )}
        </>
      )}
      <div className="  mt-6 flex w-[450px] justify-between  max-md:w-full max-md:justify-around">
        <button
          // disabled={videoToMp3}
          onClick={convertToMp3}
          className="focus:shadow-outline max-h-[40px] rounded bg-[#93dc99] px-4 py-2 font-bold text-TXT hover:bg-ACT max-md:max-h-[60px] max-md:w-[150px] max-md:px-2
          max-md:text-sm "
        >
          Download Audio
        </button>
        <div className="flex flex-col items-end ">
          <button
            onClick={handleDropClick}
            className="focus:shadow-outline flex items-center rounded bg-[#93dc99] px-4 py-2 font-bold text-TXT  hover:bg-ACT
            max-md:text-sm "
          >
            Download Video
            <AiOutlineDown className="ml-4" />
          </button>

          {showDrop && (
            <div className={` mt-2 grid grid-cols-2 ${showModal ? "" : ""}  `}>
              <button
                className={`mt-3 block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                  matchedData.filter((data) => data.qualityLabel === "240p")
                    .length === 0
                    ? "hidden "
                    : ""
                }`}
                onClick={() => handleDropItemClick("240p")}
                disabled={
                  matchedData.filter((data) => data.qualityLabel === "240p")
                    .length === 0 || showModal
                }
              >
                240p
              </button>
              <button
                className={`ml-3 mt-3 block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                  matchedData.filter((data) => data.qualityLabel === "360p")
                    .length === 0
                    ? "hidden "
                    : ""
                }`}
                onClick={() => handleDropItemClick("360p")}
                disabled={
                  matchedData.filter((data) => data.qualityLabel === "360p")
                    .length === 0 || showModal
                }
              >
                360p
              </button>
              <button
                className={`mt-3 block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                  matchedData.filter((data) => data.qualityLabel === "480p")
                    .length === 0
                    ? "hidden "
                    : ""
                }`}
                onClick={() => handleDropItemClick("480p")}
                disabled={
                  matchedData.filter((data) => data.qualityLabel === "480p")
                    .length === 0 || showModal
                }
              >
                480p
              </button>
              <button
                className={`ml-3 mt-3 block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                  matchedData.filter((data) => data.qualityLabel === "720p")
                    .length === 0
                    ? " hidden "
                    : ""
                }`}
                onClick={() => handleDropItemClick("720p")}
                disabled={
                  matchedData.filter((data) => data.qualityLabel === "720p")
                    .length === 0 || showModal
                }
              >
                720p
              </button>
              <button
                className={`mt-3 block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                  matchedData.filter(
                    (data) => data.qualityLabel === "1080p60" || "1080p"
                  ).length === 0
                    ? "hidden "
                    : ""
                }`}
                onClick={() => handleDropItemClick("1080p60" || "1080p")}
                disabled={
                  matchedData.filter(
                    (data) => data.qualityLabel === "1080p60" || "1080p"
                  ).length === 0 || showModal
                }
              >
                1080p60
              </button>

              <button
                className={`ml-3 mt-3 block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                  matchedData.filter((data) => data.qualityLabel === "1440p60")
                    .length === 0
                    ? "hidden "
                    : ""
                }`}
                onClick={() => handleDropItemClick("1440p60")}
                disabled={
                  matchedData.filter((data) => data.qualityLabel === "1440p60")
                    .length === 0 || showModal
                }
              >
                1440p60
              </button>
              <button
                className={`mt-3  block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                  matchedData.filter((data) => data.qualityLabel === "2160p60")
                    .length === 0
                    ? " hidden"
                    : ""
                }`}
                onClick={() => handleDropItemClick("2160p60")}
                disabled={
                  matchedData.filter((data) => data.qualityLabel === "2160p60")
                    .length === 0 || showModal
                }
              >
                2160p60
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
