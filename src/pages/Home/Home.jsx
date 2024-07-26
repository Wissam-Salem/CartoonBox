import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import Cartoon from "../../components/Cartoon/Cartoon";
import { Carousel } from "antd";

export default function Home() {
  let [popular, setPopular] = useState([]);
  let [movies, setMovies] = useState([]);
  let [tv, setTv] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
        },
      })
      .then((res) => {
        setPopular(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
          },
        }
      )
      .then((res) => {
        setTv(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16",
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
  }, []);

  return (
    <div>
      <Header />
      <div className="container-fluid pt-5 h-fit">
        <div>
          <div className="flex justify-between items-center px-2" dir="rtl">
            <h1 className="text-white text-lg">الاكثر رواجاً</h1>
          </div>
          <div className="tv scroll h-fit flex my-5 gap-3 overflow-x-auto snap-x pr-3">
            {popular.map((p) => {
              return (
                <Cartoon
                  poster={
                    "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                    p?.poster_path
                  }
                  key={p?.id}
                  rate={p?.vote_average}
                  id={p?.id}
                  cartoonName={p?.name}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center px-2" dir="rtl">
            <h1 className="text-white text-lg">المسلسلات</h1>
            <a className="text-[#60f295] hover:text-[#47b46f]" href="/tv">
              المزيد
            </a>
          </div>
          <div className="tv scroll h-fit flex my-5 gap-3 overflow-x-auto snap-x pr-3">
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
        </div>
        <div>
          <div className="flex justify-between items-center px-2" dir="rtl">
            <h1 className="text-white text-lg">الافلام</h1>
            <a className="text-[#60f295] hover:text-[#47b46f]" href="/movies">
              المزيد
            </a>
          </div>
          <div className="tv scroll h-fit flex my-5 gap-3 overflow-x-auto snap-x pr-3">
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
        </div>
      </div>
    </div>
  );
}
