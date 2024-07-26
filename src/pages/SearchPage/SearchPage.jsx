import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cartoon from "../../components/Cartoon/Cartoon";

export default function SearchPage() {
  const { cartoonName } = useParams();
  const [cartoons, setCartoons] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?query=${cartoonName}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
          },
        }
      )
      .then((res) => {
        setCartoons(res.data.results);
      })
      .catch((err) => {});
  }, [cartoonName]);

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 h-fit p-3 pb-5">
        <div
          className="text-white text-3xl p-3 rounded-md max-sm:text-2xl max-sm:p-2"
          dir="rtl"
        >
          <h1>نتائج البحث عن: {cartoonName}</h1>
          <hr className="mt-3" />
        </div>

        <div className="flex justify-center items-center gap-4 flex-wrap">
          {cartoons.map((element) => {
            return (
              <Cartoon
                poster={
                  "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                  element?.poster_path
                }
                key={element?.id}
                rate={element?.vote_average}
                id={element?.id}
                cartoonName={element?.name || element.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
