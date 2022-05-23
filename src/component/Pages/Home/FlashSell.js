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
        <div class="grid grid-flow-col gap-5 text-center auto-cols-max justify-center mt-8">
          <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span class="countdown font-mono text-5xl">
              <span style={{ "--value": "15" }}></span>
            </span>
            days
          </div>
          <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span class="countdown font-mono text-5xl">
              <span style={{ "--value": "12" }}></span>
            </span>
            hours
          </div>
          <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span class="countdown font-mono text-5xl">
              <span style={{ "--value": "51" }}></span>
            </span>
            min
          </div>
          <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span class="countdown font-mono text-5xl">
              <span style={{ "--value": "5" }}></span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSell;
