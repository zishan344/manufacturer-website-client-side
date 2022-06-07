import React from "react";

const useLoading = ({ order }) => {
  return (
    <div className="h-screen">
      <div className="card max-w-lg bg-base-100 shadow-xl mx-auto items-center">
        <div className="card-body">
          <h2 className="text-xl font-bold text-secondary text-center">{order}</h2>
        </div>
      </div>
    </div>
  );
};

export default useLoading;
