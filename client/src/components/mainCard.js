import React from "react";
import ytimg from "./assets/ytimg.jpg";

const MainCard = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <section className="m-7  flex min-h-[500px] max-w-[80%] items-center justify-center rounded-lg  max-med:flex-col ">
        <article className="flex h-[500px] w-1/2 items-center md:w-1/2 max-med:h-auto max-med:w-auto">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src={ytimg}
            alt="img here"
          />
        </article>
        <article className=" flex w-1/2 flex-col  p-4 max-med:h-auto   max-med:w-auto ">
          <header className=" mb-6  text-4xl font-extrabold tracking-tight  text-gray-800 md:text-4xl lg:text-6xl ">
            Download Youtube Videos and Save Videos As Mp3
          </header>
          
            <p className=" mt-3 text-base text-gray-700 sm:mx-auto sm:mt-5 sm:text-lg md:mt-5 md:text-xl ">
              SSaver Downloader is an easy-to-use, online web tool that allows
              you to download Youtube Vidoes, and convert videos to Mp3.
              With SSaver, you can download different types of content from
              Youtube and enjoy them later, even when you're offline. So next
              time you see something on Youtube that you want to keep, use
              SSaver Downloader and save it for later!
            </p>
         
        </article>
      </section>
      <section className="w-[80%] ">
        <h2 className="pb-4 text-center text-4xl ">
          HOW TO DOWNLOAD VIDEOS FROM{" "}
        </h2>
        <div className=" border-b-[6px] border-b-red-800  "></div>
        <p className="p-4 text-center text-lg ">
          You must follow these easy steps to download Audio and Videos from
          youtube. see their description below.
        </p>
        <div className=" grid flex-wrap justify-center gap-4 md:grid-cols-3">
          <div className="flex w-[auto] flex-col items-center rounded-2xl bg-gray-200">
            <article className="h-full w-full flex-1  ">
              <img
                className="  h-[280px] w-full  rounded-t-lg object-cover"
                src={ytimg}
                alt="imghere"
              />
            </article>
            <section className="w-[80%]  flex-1  ">
              <h2 className="p-3 text-center text-2xl">Copy the URL</h2>
              <hr className=" mt-3 border border-red-600" />
              <p className="p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                maiores cupiditate deleniti vel libero quis corrupti nemo
                ratione molestias minus. Tempora, voluptate necessitatibus.
                Consequuntur, error!
              </p>
            </section>
          </div>
          <div className="flex w-[auto] flex-col items-center rounded-2xl bg-gray-200">
            <article className="h-full w-full flex-1  ">
              <img
                className="  h-[280px] w-full  rounded-t-lg object-cover"
                src={ytimg}
                alt="imghere"
              />
            </article>
            <section className="w-[80%]  flex-1  ">
              <h2 className="p-3 text-center text-2xl">Copy the URL</h2>
              <hr className=" mt-3 border border-red-600" />
              <p className="p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                maiores cupiditate deleniti vel libero quis corrupti nemo
                ratione molestias minus. Tempora, voluptate necessitatibus.
                Consequuntur, error!
              </p>
            </section>
          </div>
          <div className="flex w-[auto] flex-col items-center rounded-2xl bg-gray-200">
            <article className="h-full w-full flex-1  ">
              <img
                className="  h-[280px] w-full  rounded-t-lg object-cover"
                src={ytimg}
                alt="imghere"
              />
            </article>
            <section className="w-[80%]  flex-1  ">
              <h2 className="p-3 text-center text-2xl">Copy the URL</h2>
              <hr className=" mt-3 border border-red-600" />
              <p className="p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                maiores cupiditate deleniti vel libero quis corrupti nemo
                ratione molestias minus. Tempora, voluptate necessitatibus.
                Consequuntur, error!
              </p>
            </section>
          </div>
        </div>
      </section>
      <section className="w-[80%]">
        <header className="text-6xl text-center p-8">SSsaver Features</header>
        <section className="flex max-med:flex-col mb-4 ">
          <articles className= " flex-1 md:w-1/2">
            <img src={ytimg} alt="imghere" className=" max-med:h-[250px] h-[300px] w-[900px] rounded-t-lg" />
          </articles>
          <article className="flex-1 flex flex-col ml-5 justify-center text-start">
            <h2 className="mb-6  text-4xl font-extrabold   text-gray-900 md:text-4xl lg:text-5xl max-med:mt-4 ">Audio Downloader</h2>
            <p className="mt-3 mb-4  text-gray-700 sm:mx-auto sm:mt-5  md:mt-5 md:text-xl ">
              If you're looking for a way to save images from Instagram posts,
              then iGram's Instagram photo downloader is an excellent tool to
              consider. With iGram, you can download both individual post images
              and multiple Instagram photos from carousels.
            </p>
          </article>
        </section>
        <section className="flex max-med:flex-col flex-row-reverse mb-4 ">
          <articles className= " flex-1 md:w-1/2">
            <img src={ytimg} alt="imghere" className=" max-med:h-[250px] h-[300px] w-[900px] rounded-t-lg" />
          </articles>
          
          <article className="flex-1 flex flex-col ml-5 justify-center text-start">
            <h2 className="mb-6  text-4xl font-extrabold   text-gray-900 md:text-4xl lg:text-5xl max-med:mt-4 ">Audio Downloader</h2>
            <p className="mt-3 mb-4 pr-4 text-gray-700 sm:mx-auto sm:mt-5  md:mt-5 md:text-xl ">
              If you're looking for a way to save images from Instagram posts,
              then iGram's Instagram photo downloader is an excellent tool to
              consider. With iGram, you can download both individual post images
              and multiple Instagram photos from carousels.
            </p>
          </article>
        </section>
        <section className="flex max-med:flex-col mb-4 ">
          <articles className= " flex-1 md:w-1/2">
            <img src={ytimg} alt="imghere" className=" max-med:h-[250px] h-[300px] w-[900px] rounded-t-lg" />
          </articles>
          <article className="flex-1 flex flex-col ml-5 justify-center text-start">
            <h2 className="mb-6  text-4xl font-extrabold   text-gray-900 md:text-4xl lg:text-5xl max-med:mt-4 ">Audio Downloader</h2>
            <p className="mt-3 mb-4  text-gray-700 sm:mx-auto sm:mt-5  md:mt-5 md:text-xl ">
              If you're looking for a way to save images from Instagram posts,
              then iGram's Instagram photo downloader is an excellent tool to
              consider. With iGram, you can download both individual post images
              and multiple Instagram photos from carousels.
            </p>
          </article>
        </section>
      </section>
    </div>
  );
};

export default MainCard;
