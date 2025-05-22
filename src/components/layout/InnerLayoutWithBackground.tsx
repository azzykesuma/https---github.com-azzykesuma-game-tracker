import { fetchUserBackground } from "@/app/action";
import React, { PropsWithChildren } from "react";

const InnerLayoutWithBackground = async ({ children }: PropsWithChildren) => {
  const backgroundImage = await fetchUserBackground();
  const imageSource = `http://media.steampowered.com/steamcommunity/public/images/${backgroundImage}`;
  return (
    <div
      className="min-h-screen bg-gray-950 text-gray-100 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center flex-col justify-center"
      style={{
        backgroundImage: `url(${imageSource})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default InnerLayoutWithBackground;
