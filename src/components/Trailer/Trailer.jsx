import React from "react";

export default function Trailer({ trailer }) {
  return (
    <div className="flex justify-center">
      <iframe
        title={"https://www.youtube.com/embed/" + trailer}
        src={"https://www.youtube.com/embed/" + trailer}
        scrolling="no"
        frameBorder={0}
        className="w-[50rem] h-[30rem] max-md:w-[40rem] max-md:h-[22rem] max-sm:w-[30rem] max-sm:h-[14rem]"
        allowFullScreen={true}
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
      />
    </div>
  );
}
