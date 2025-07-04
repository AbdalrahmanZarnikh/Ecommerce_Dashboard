import React from "react";
import ButtonSpinner from "../../buttonSpinner/ButtonSpinner";
import Lottie from "lottie-react";
import Error from "./error.json"

type TLoadingProps = {
  status: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
  children: React.ReactNode;
};
const Loading = ({ status, error, children }: TLoadingProps) => {
  // When isLoading is Pending Show ButtonSpinner Only
  if (status === "Pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <ButtonSpinner />
      </div>
    );
  }
  if (status ==="Fail") {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
      <Lottie animationData={Error} />
      <h1 className="text-5xl text-red-600">{error}</h1>
    </div>
    );
  }
  return <div>{children}</div>;
};

export default Loading;
