import React, { useEffect, useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";

const Homepage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoToMp3, setVideoToMp3] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  // remove string after underscore
  const removeString = () => {
    const modifiedUrl = videoUrl.split("_channel")[0];
    setVideoUrl(modifiedUrl);
  };

  // submit function and get info of url
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(isloading);

    removeString();

    await axios.post("http://localhost:4000/geturldetail", {
      url: videoUrl,
    });
    if (videoUrl === "") {
      alert("Video Url is empty!");
      setIsLoading(false);
      return;
    }
    await fetchVideoInfo();
    setIsLoading(false);
    // setVideoUrl("");
  };
  // get video info
  const fetchVideoInfo = async () => {
    const res = await axios.get("http://localhost:4000/geturldetail");
    try {
      setVideoInfo([res.data]);
      console.log("videoinfo", videoInfo);
      setVideoTitle(res.data.title);
      // setVideoInfo([])
    } catch (err) {
      console.log("err", err);
    }
  };
  // clear search input and saved input
  const clearSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:4000/clearUrl", {
      params: {
        url: "",
      },
    });
    console.log("cleardata", res.data);
    setVideoInfo([]);
    setVideoUrl("");
  };

  // donwload video to mp3 funtions
  const convertToMp3 = async (e) => {
    e.preventDefault();
    if (!videoUrl || videoUrl.trim() === "") {
      alert("video URL is empty!");
      return;
    }
    console.log(videoToMp3);
    setVideoToMp3(true);
    alert("Download Getting Ready Please wait.....");

    axios
      .post(
        "http://localhost:4000/convertToMp3",
        {
          url: videoUrl,
          title: videoTitle,
        },
        {
          responseType: "blob",
        }
      )

      .then((res) => {
        console.log(res);
        FileDownload(res.data, `${videoTitle}.mp3`);
        setVideoToMp3(false);
      })
      .catch((err) => {
        console.error("Error occurred during POST", err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      // await fetchVideoInfo();
      // await getMp3Data();
    };
    fetchData();
  }, []);

  console.log(videoTitle);
  return (
    <div className="flex flex-col items-center">
      <div className="h-[80px] w-full bg-black"></div>
      <form
        onSubmit={handleSubmit}
        className=" mx-auto mb-6 mt-6 sm:min-w-full lg:min-w-[600px]"
      >
        <div className="flex items-center  border-b-2 border-teal-500 py-2">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
            placeholder="Enter Video URL"
          />
          <button
            onClick={clearSearch}
            className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
          >
            Clear
          </button>
          <button
            type="submit"
            className="focus:shadow-outline ml-4 rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-700 focus:outline-none"
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
                className="flex min-h-[500px] min-w-[800px] flex-col items-center justify-center border bg-white"
              >
                <img
                  className="w-[80%] object-contain  "
                  src={video.thumbnails[3].url}
                  alt="thumbnail"
                />
                <h2 className="mt-4 text-2xl font-semibold">{video.title}</h2>
              </div>
            ))
          ) : (
            <div className="flex min-h-[500px] min-w-[800px] items-center justify-center border bg-white">
              <span>No image available</span>
            </div>
          )}
        </>
      )}
      <div className=" mt-6 flex w-[450px] justify-between border">
        <button
          disabled={videoToMp3}
          onClick={convertToMp3}
          className={`focus:shadow-outline rounded bg-teal-500 px-4 py-2 font-bold text-white ${
            videoToMp3 ? "cursor-not-allowed opacity-50" : "hover:bg-teal-700"
          }`}
        >
          convert To Mp3
        </button>
        {/* <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            MP4 DOWNLOAD
        </button> */}
      </div>
    </div>
  );
};

export default Homepage;
