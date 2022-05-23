import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center h-[80vh] items-center">
      <button type="button" disabled>
        Processing...
      </button>
    </div>
  );
};

export default Loading;
