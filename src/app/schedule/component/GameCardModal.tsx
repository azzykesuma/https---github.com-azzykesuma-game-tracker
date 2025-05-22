import { GameItem } from "@/types";
import Image from "next/image";
import React from "react";

const GameCardModal = ({data} : {data: GameItem}) => {
  return (
    <div className="col-span-3 flex items-center gap-3 p-2 bg-gray-100 rounded-md border border-gray-200">
      {data.img_icon_url && (
        <Image
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${data.appid}/${data.img_icon_url}.jpg`}
          alt={data.name}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      )}
      <span className="font-semibold text-gray-800">
        {data?.name || ""}
      </span>
    </div>
  );
};

export default GameCardModal;
