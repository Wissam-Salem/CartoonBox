import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Trailer from "../../components/Trailer/Trailer";
import Watch from "../../components/Watch/Watch";
import { Helmet } from "react-helmet";

export default function CartoonPage() {
  let [cartoon, setCartoon] = useState({});
  let [plot, setPlot] = useState({});
  let [type, setType] = useState("المسلسل");
  let [section, setSection] = useState("trailer");
  let { cartoonName, cartoonID } = useParams();
  let [trailer, setTrailer] = useState("");

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
        if (res?.data?.results?.length === 0) {
          window.location.assign("/not_found");
        } else {
          setCartoon(
            res?.data?.results?.find((c) => c.id === Number(cartoonID))
          );
          if (cartoon?.media_type === "movie") {
            setType("الفيلم");
          }
        }
        axios
          .get(
            `https://api.themoviedb.org/3/${
              res?.data?.results?.find((c) => c.id === Number(cartoonID))
                ?.media_type
            }/${cartoonID}/translations`,
            {
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
              },
            }
          )
          .then((resp) => {
            setPlot(resp.data.translations.find((t) => t.name === "العربية"));
            axios
              .get(
                `https://api.themoviedb.org/3/${
                  res?.data?.results?.find((c) => c.id === Number(cartoonID))
                    ?.media_type
                }/${cartoonID}/videos?language=en-US`,
                {
                  headers: {
                    accept: "application/json",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
                  },
                }
              )
              .then((response) => {
                setTrailer(
                  response?.data?.results?.find((c2) => c2.name === cartoonName)
                    ?.key || response?.data?.results[0]?.key
                );
              })
              .catch(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [cartoonName, cartoon?.media_type, cartoonID]);

  return (
    <div>
      <Helmet>
        <title>{cartoonName}</title>
      </Helmet>
      <Header />
      <div className="flex flex-col gap-5 max-sm:gap-3 p-5 h-fit text-white">
        <div
          className="flex justify-start items-end max-sm:flex-col max-sm:items-center gap-3"
          dir="rtl"
        >
          <div className="w-60 max-sm:w-52">
            <img
              src={
                "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                cartoon?.poster_path
              }
              alt={cartoon?.name || cartoon?.title}
            />
          </div>
          <div className="flex flex-col gap-4 mb-2 text-2xl max-sm:text-xl">
            <p>
              {type}: {cartoon?.name || cartoon?.title}
            </p>
            <p className="capitalize">اللغة: {cartoon?.original_language}</p>
            <p>التقييم: 10/ {cartoon?.vote_average?.toFixed(1)}</p>
            <p>
              تاريخ البث:{" "}
              {cartoon?.first_air_date || cartoon?.release_date || "لا يوجد"}
            </p>
          </div>
        </div>
        {plot?.data?.overview !== undefined && plot?.data?.overview !== "" ? (
          <h1 className="leading-relaxed font-semibold" dir="rtl">
            {plot?.data?.overview}
          </h1>
        ) : (
          <h1 className="leading-relaxed font-semibold">{cartoon?.overview}</h1>
        )}
        <div className="flex justify-center items-center gap-10 border-b">
          <ul className="flex gap-5 pb-3">
            <li>
              <button
                className={`${section === "trailer" && "border-b"}  px-2 py-1`}
                onClick={() => setSection("trailer")}
              >
                التريلر
              </button>
            </li>
            <li>
              <button
                className={`${section === "watch" && "border-b"}  px-2 py-1`}
                onClick={() => setSection("watch")}
              >
                الحلقات
              </button>
            </li>
          </ul>
        </div>
        {section === "trailer" ? <Trailer trailer={trailer} /> : <Watch />}
      </div>
    </div>
  );
}
