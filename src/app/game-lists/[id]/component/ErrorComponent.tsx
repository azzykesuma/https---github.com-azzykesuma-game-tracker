import BackButton from "@/components/layout/BackButton";
import React from "react";

const ErrorComponent = ({message} : {message: string}) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">{message}</h1>
      <div className="my-5">
        <BackButton />
      </div>
    </div>
  );
};

export default ErrorComponent;
