import React from "react";

const FlashSell = () => {
  return (
    <div className="container mx-auto my-24 grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
      <div className="justify-self-center">
        <img
          className="lg:w-[90%] md:w-2/3 mx-auto"
          src="https://htmldemo.net/lukas/lukas/assets/img/extra/wheels.png"
          alt="flashSellImage"
        />
      </div>
      <div>
        <div className="text-center">
          <h2 className=" text-4xl font-extrabold my-4">FLASH DEALS</h2>
          <h2 className="text-4xl font-bold">HURRY UP AND GET 25% DISCOUNT</h2>
          <button className="btn btn-primary rounded-full mt-3">
            Add To Card
          </button>
        </div>
        <div className="flex  gap-5 justify-center my-8 text-[#303030] font-bold text-3xl">
          <div className="">
            <h4 className="text-center ">00</h4>
            <h4 className="text-center ">Days</h4>
          </div>
          <div className="">
            <h4 className="text-center text-bold text">00</h4>
            <h4 className="text-center ">Hours</h4>
          </div>
          <div className="">
            <h4 className="text-center text-bold text">00</h4>
            <h4 className="text-center ">Minutes</h4>
          </div>
          <div className="">
            <h4 className="text-center text-bold text">00</h4>
            <h4 className="text-center ">Seconds</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSell;
