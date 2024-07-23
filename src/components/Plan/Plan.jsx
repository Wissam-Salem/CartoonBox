import "./Plan.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Plan({
  planName,
  planPrice,
  one,
  two,
  three,
  four,
  logo,
  buy,
}) {
  return (
    <div className="plan flex flex-col items-center relative w-72 h-96 max-md:w-56 max-md:h-80 text-center hover:scale-105 transition-all text-white bg-gradient-to-b from-emerald-700 to-gray-700 rounded-2xl">
      <div
        className="plan-body h-[inherit] flex flex-col justify-center items-center rounded-2xl"
      >
        <div className="plan-head flex flex-col gap-1">
          <div className="flex text-4xl max-md:text-3xl justify-center items-center gap-2">
            <FontAwesomeIcon icon={logo} />
            <p>{planName}</p>
          </div>
          <p className="text-2xl my-2">{planPrice}$</p>
        </div>
        <hr className="w-[200px] my-2 mb-3" />
        <div className="plan-footer flex flex-col gap-2">
          <div className="flex text-xl max-md:text-lg justify-center items-center gap-3">
            <p>1080p</p>
            <FontAwesomeIcon icon={one} />
          </div>

          <div className="flex text-xl max-md:text-lg justify-center items-center gap-3">
            <p>720p</p>
            <FontAwesomeIcon icon={two} />
          </div>

          <div className="flex text-xl max-md:text-lg justify-center items-center gap-3">
            <p>360p</p>
            <FontAwesomeIcon icon={three} />
          </div>

          <div className="flex text-xl max-md:text-lg justify-center items-center gap-3">
            <p>امكانية النشر</p>
            <FontAwesomeIcon icon={four} />
          </div>
        </div>
      </div>
      <footer className="buy hidden absolute bottom-[-24px]">
        <a href="#" className="w-32 btn btn-success">{buy}</a>
      </footer>
    </div>
  );
}
