"use client";
import { Button } from "@/components/ui/button";
import { useIsFetching } from "@tanstack/react-query";
import { Gamepad, Gamepad2Icon, Timer, Trophy } from "lucide-react";
import { motion as m } from "motion/react";
import { QUERY_KEYS_MAP } from "../lib/constant";

const buttonConfigs = [
  {
    label: "Game Lists",
    href: "/game-lists",
    icon: <Gamepad />,
    id: 1,
  },
  {
    label: "Recently Played",
    href: "/recently-played",
    icon: <Gamepad2Icon />,
    id: 2,
  },
  // {
  //   label: "Set Gaming Schedule",
  //   href: "/schedule",
  //   icon: <Timer />,
  //   id: 4,
  // },
];

const ButtonSections = () => {
  const isFetching = useIsFetching({ queryKey: [QUERY_KEYS_MAP.USER_INFO] });

  const handleRedirect = (href: string) => {
    window.location.href = href;
  };

  return (
    <m.div
      className="flex flex-wrap justify-center gap-4 mt-10 p-4 max-w-xl" // Added flex-wrap for responsiveness
      transition={{
        staggerChildren: 0.1,
      }}
    >
      {isFetching === 0 &&
        buttonConfigs.map((config) => (
          <m.div
            key={config.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: config.id * 0.15,
            }}
          >
            <Button
              className="flex items-center justify-center min-w-[160px] px-8 py-4 text-lg  transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-2xl"
              onClick={() => handleRedirect(config.href)}
            >
              {config.label}
              {config.icon}
            </Button>
          </m.div>
        ))}
    </m.div>
  );
};
export default ButtonSections;
