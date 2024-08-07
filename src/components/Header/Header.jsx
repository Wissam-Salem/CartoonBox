import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTv,
  faFilm,
  faBars,
  faAngleDown,
  faFaceLaughBeam,
  faBomb,
  faSkull,
  faTree,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import SearchSuggestion from "../SearchSuggestion/SearchSuggestion";

export default function Header() {
  let [cartoonName, setCartoonName] = useState("");
  let search = useRef(null);
  let searchMobile = useRef(null);
  let genre = useRef(null);
  let [searchResults, setSearchResults] = useState([]);

  const showGenre = () => {
    if (genre.current.hidden === true) {
      genre.current.hidden = false;
    } else {
      genre.current.hidden = true;
    }
  };

  const searchCartoon = () => {
    if (search.current.value === "") {
      window.location.assign("/");
    } else {
      window.location.assign(`/search/${cartoonName}`);
    }
  };

  const searchCartoonMobile = () => {
    if (searchMobile.current.value === "") {
      window.location.assign("/");
    } else {
      window.location.assign(`/search/${cartoonName}`);
    }
  };

  useEffect(() => {
    if (search.current.value !== "" || search.current.value !== null) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?query=${search?.current?.value}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDY5MzQ1YmQ0YWQxMWE3M2Y1ZWM3ZTBmY2I2ZTc1NCIsInN1YiI6IjY2MTY3ZTQ1NjZhMGQzMDE3ZDMwODk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4JrlSazDyXEsnrYA2Xn0FbiBKgixbKGUkRiw_s8Osg",
            },
          }
        )
        .then((res) => {
          setSearchResults(
            res?.data?.results?.filter(
              (s) => s.media_type !== "person" && s.poster_path !== null
            )
          );
          console.log(searchResults);
        })
        .catch((error) => {});
    }
  }, [search?.current?.value]);

  return (
    <div className="px-3">
      <div className="h-fit py-3 flex items-center relative z-50">
        <div className="w-fit flex items-center gap-2 text-white text-3xl ml-3">
          <div>
            <img className="w-16 max-sm:w-14" src="/assets/logo.png" alt="" />
          </div>
          <a className="text-2xl " href="/">
            CartoonBox
          </a>
        </div>

        <div className="w-fit flex items-center gap-4 absolute right-0 mr-3 max-lg:hidden">
          <div className="search absolute right-0 flex flex-col">
            <div>
              <input
                ref={search}
                className="w-[300px]"
                placeholder="Search..."
                type="text"
                onChange={(e) => {
                  setCartoonName(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  searchCartoon();
                }}
              >
                بحث
              </button>
            </div>
            {searchResults.length !== 0 && (
              <ul className="w-[16rem] h-fit absolute top-14 rounded-md flex flex-col gap-1 p-1 bg-zinc-800">
                {searchResults?.slice(0, 5)?.map((s) => {
                  return (
                    <li>
                      <SearchSuggestion
                        poster={
                          "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                          s.poster_path
                        }
                        key={s?.id}
                        id={s?.id}
                        cartoonName={s?.name || s.title}
                      />
                    </li>
                  );
                })}
                <li className="w-full text-white text-center my-2">
                  <a
                    href={`/search/${search.current.value}`}
                    className="w-full hover:text-[#6b6b6b]"
                  >
                    رؤية الكل
                  </a>
                </li>
              </ul>
            )}
          </div>

          <ul className="text-white flex gap-4 items-center">
            <li>
              <div className="dropdown z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 m-1"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                  <div className="flex items-center gap-2">
                    <img
                      width="21"
                      height="21"
                      src="https://img.icons8.com/?size=100&id=GhW7E6TRTWHw&format=png&color=63E6BE"
                      alt=""
                    />
                    التصنيفات
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="/genre/action">
                      <FontAwesomeIcon
                        icon={faBomb}
                        style={{ color: "#63E6BE" }}
                      />
                      اكشن
                    </a>
                  </li>
                  <li>
                    <a href="/genre/horror">
                      <FontAwesomeIcon
                        icon={faSkull}
                        style={{ color: "#63E6BE" }}
                      />
                      رعب
                    </a>
                  </li>
                  <li>
                    <a href="/genre/adventure">
                      <FontAwesomeIcon
                        icon={faTree}
                        style={{ color: "#63E6BE" }}
                      />
                      مغامرات
                    </a>
                  </li>
                  <li>
                    <a href="/genre/sci-fi">
                      <FontAwesomeIcon
                        icon={faFlask}
                        style={{ color: "#63E6BE" }}
                      />
                      خيال علمي
                    </a>
                  </li>
                  <li>
                    <a href="/genre/comedia">
                      <FontAwesomeIcon
                        icon={faFaceLaughBeam}
                        style={{ color: "#63E6BE" }}
                      />
                      كوميديا
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a className="flex items-center gap-2" href="/tv">
                <FontAwesomeIcon icon={faTv} style={{ color: "#63E6BE" }} />
                المسلسلات
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2" href="/movies">
                <FontAwesomeIcon
                  size="lg"
                  icon={faFilm}
                  style={{ color: "#63E6BE" }}
                />
                الافلام
              </a>
            </li>
          </ul>
        </div>

        <div className="drawer drawer-end w-fit absolute right-0 m-3 max-lg:block hidden">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn bg-[#60f295]"
            >
              <FontAwesomeIcon
                icon={faBars}
                style={{ color: "black" }}
                size="xl"
              />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu relative p-4 w-64 min-h-full bg-base-200 text-white">
              {/* Sidebar content here */}
              <li className="search absolute right-0 mb-2">
                <input
                  ref={searchMobile}
                  className="w-[300px] max-lg:w-[200px] cursor-none"
                  placeholder="Search..."
                  type="text"
                  onChange={(e) => {
                    setCartoonName(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    searchCartoonMobile();
                  }}
                >
                  بحث
                </button>
              </li>
              <li className="my-1">
                <a href="/tv">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faTv}
                    style={{ color: "#63E6BE" }}
                  />
                  المسلسلات
                </a>
              </li>
              <li className="my-1">
                <a href="/movies">
                  <FontAwesomeIcon
                    size="xl"
                    icon={faFilm}
                    style={{ color: "#63E6BE" }}
                  />
                  الافلام
                </a>
              </li>
              <li className="my-1" dir="rtl">
                <div
                  className="flex items-center justify-start gap-2"
                  onClick={() => {
                    showGenre();
                  }}
                >
                  <img
                    width="23"
                    height="23"
                    src="https://img.icons8.com/?size=100&id=GhW7E6TRTWHw&format=png&color=63E6BE"
                    alt=""
                  />
                  التصنيفات
                  <FontAwesomeIcon icon={faAngleDown} />
                </div>
                <div
                  className="hover:bg-transparent :bg-transparent mt-2"
                  ref={genre}
                  hidden={true}
                  dir="rtl"
                >
                  <ul dir="rtl">
                    <li>
                      <a href="/genre/action">
                        <FontAwesomeIcon
                          icon={faBomb}
                          style={{ color: "#63E6BE" }}
                        />
                        اكشن
                      </a>
                    </li>
                    <li>
                      <a href="/genre/horror">
                        <FontAwesomeIcon
                          icon={faSkull}
                          style={{ color: "#63E6BE" }}
                        />
                        رعب
                      </a>
                    </li>
                    <li>
                      <a href="/genre/adventure">
                        <FontAwesomeIcon
                          icon={faTree}
                          style={{ color: "#63E6BE" }}
                        />
                        مغامرات
                      </a>
                    </li>
                    <li>
                      <a href="/genre/sci-fi">
                        <FontAwesomeIcon
                          icon={faFlask}
                          style={{ color: "#63E6BE" }}
                        />
                        خيال علمي
                      </a>
                    </li>
                    <li>
                      <a href="/genre/comedia">
                        <FontAwesomeIcon
                          icon={faFaceLaughBeam}
                          style={{ color: "#63E6BE" }}
                        />
                        كوميديا
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul className="menu px-4 py-3 w-64 text-base-content absolute bottom-0"></ul>
          </div>
        </div>
      </div>
    </div>
  );
}
