import React from "react";

export default function SearchSuggestion({ poster, id, cartoonName }) {
  return (
    <a className=" h-fit w-full flex" href={`/cartoons/${id}/${cartoonName}`}>
      <div>
        <img className="w-12 rounded-l-md" src={poster} alt={cartoonName} />
      </div>
      <div className=" w-full bg-zinc-900 hover:bg-[#0f0f10] rounded-r-md flex items-center justify-center">
        <h4 className="w-[8rem] px-1 whitespace-nowrap overflow-hidden text-ellipsis text-center text-white">
          {cartoonName}
        </h4>
      </div>
    </a>
  );
}
