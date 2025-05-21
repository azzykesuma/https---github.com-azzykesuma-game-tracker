"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const FilterButtons = ({ onFilter }: { onFilter: (view: 'all' | 'achieved') => void }) => {
  const [currView, setCurrView] = useState("all");

  const handleClick = (view: 'all' | 'achieved') => {
    setCurrView(view);
    onFilter(view);
  };

  return (
    <div className="my-4 flex gap-2">
      <Button
        className={currView === "all" ? "bg-destructive" : ""}
        onClick={() => handleClick("all")}
      >
        All
      </Button>
      <Button
        className={currView === "achieved" ? "bg-destructive" : ""}
        onClick={() => handleClick("achieved")}
      >
        Achieved
      </Button>
    </div>
  );
};

export default FilterButtons;
