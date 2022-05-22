import React from "react";
import notFound from "../../images/download.png";
const NotFound = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <img src={notFound} alt="" />
    </div>
  );
};

export default NotFound;
