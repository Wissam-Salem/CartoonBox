import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import Cartoon from "../../components/Cartoon/Cartoon";
import { Pagination } from "antd";

export default function Tv() {
  let [tv, setTv] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_genres=16`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
          },
        }
      )
      .then((res) => setTv(res.data.results))
      .catch((err) => {});
  }, [pageNumber]);

  return (
    <div>
      <Header />
      <div className="container-fluid pt-5 pb-4 h-[calc(100dhv-96px)] flex flex-col justify-center items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          {tv.map((series) => {
            return (
              <Cartoon
                poster={
                  "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                  series?.poster_path
                }
                key={series?.id}
                rate={series?.vote_average}
                id={series?.id}
                cartoonName={series?.name}
              />
            );
          })}
        </div>
        <Pagination
          align="center"
          onChange={(p) => setPageNumber(p)}
          defaultCurrent={1}
          total={50}
        />
      </div>
      <div className="flex justify-center items-center gap-4 max-sm:gap-3">
        <button
          className={`w-10 h-10 flex justify-center items-center border-2 text-center rounded-md hover:border-[#60f295] ${
            pageNumber === 1 && "border-[#60f295]"
          }`}
          onClick={() => setPageNumber(1)}
        >
          <span className="text-lg text-white">1</span>
        </button>
        <button
          className={`w-10 h-10 flex justify-center items-center border-2 text-center rounded-md hover:border-[#60f295] ${
            pageNumber === 2 && "border-[#60f295]"
          }`}
          onClick={() => setPageNumber(2)}
        >
          <span className="text-lg text-white">2</span>
        </button>
        <button
          className={`w-10 h-10 flex justify-center items-center border-2 text-center rounded-md hover:border-[#60f295] ${
            pageNumber === 3 && "border-[#60f295]"
          }`}
          onClick={() => setPageNumber(3)}
        >
          <span className="text-lg text-white">3</span>
        </button>
        <button
          className={`w-10 h-10 flex justify-center items-center border-2 text-center rounded-md hover:border-[#60f295] ${
            pageNumber === 4 && "border-[#60f295]"
          }`}
          onClick={() => setPageNumber(4)}
        >
          <span className="text-lg text-white">4</span>
        </button>
        <button
          className={`w-10 h-10 flex justify-center items-center border-2 text-center rounded-md hover:border-[#60f295] ${
            pageNumber === 5 && "border-[#60f295]"
          }`}
          onClick={() => setPageNumber(5)}
        >
          <span className="text-lg text-white">5</span>
        </button>
      </div>
    </div>
  );
}
