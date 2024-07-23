import React from "react";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <div className="main flex flex-col justify-center items-center gap-4 text-white text-4xl max-sm:text-3xl">
      <div className="w-fit">
        <img
          className="w-44 max-sm:w-32 mr-6"
          src="https://media.tenor.com/uX1jpz5E4lcAAAAi/bmo-bounce.gif"
          alt=""
        />
      </div>
      <h1>Page not found!</h1>
    </div>
  );
}
