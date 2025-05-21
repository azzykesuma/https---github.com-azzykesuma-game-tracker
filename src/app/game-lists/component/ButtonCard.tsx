"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonCard = ({ id }: { id: number }) => {
  const route = useRouter();
  const handleRedirection = (id: number) => {
    route.push(`/game-lists/${id}`);
  };
  return <Button className="mt-2 text-sm" onClick={() => handleRedirection(id)}>Game Stat</Button>;
};

export default ButtonCard;
