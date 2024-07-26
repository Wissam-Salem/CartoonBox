import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import Cartoon from "../../components/Cartoon/Cartoon";
import { Pagination } from "antd";

export default function Movies() {
  let [movies, setMovies] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_genres=16`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
          },
        }
      )
      .then((res) => {
        setMovies(res.data?.results);
      })
      .catch((error) => {});
  }, [pageNumber]);

  return (
    <div>
      <Header />
      <div className="container-fluid py-5 h-fit flex flex-col justify-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          {movies.map((movie) => {
            return (
              <Cartoon
                poster={
                  "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                  movie.poster_path
                }
                rate={movie.vote_average}
                cartoonName={movie.title}
                id={movie.id}
                key={movie.id}
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
    </div>
  );
}