import React from "react";

const Home = () => {
  return (
    <div
      style={{
        background: `url(https://htmldemo.net/lukas/lukas/assets/img/slider/slider-2-bg.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="carousel w-full"
    >
      <div id="slide1" class="carousel-item relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly items-center container mx-auto">
          <div className="order-1 md:order-2 justify-self-center lg:pl-8 md:pl-0 my-5">
            <h3 className="font-bold text-2xl text-white">
              NEW TECHNOLOGY &amp; BUILD
            </h3>
            <h2
              style={{ color: "#d8d8d8" }}
              className="my-8 font-bold lg:text-7xl md:text-5xl sm:text-5xl"
            >
              LATEST &amp; POWERFUL ENGINE FOR YOU
            </h2>
            <button className="btn btn-white bg-white border-0 text-black hover:text-white font-bold">
              Shop Now
            </button>
          </div>
          <div className="order-2 justify-self-center	my-5 ">
            <img
              src="https://htmldemo.net/lukas/lukas/assets/img/slider/slider-2-2.png"
              class="lg:w-full md:w-2/4"
            />
          </div>
        </div>
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" class="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" class="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" class="carousel-item relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly items-center container mx-auto">
          <div className="order-1 md:order-2 justify-self-center lg:pl-8 md:pl-0 my-5">
            <h3 className="font-bold text-2xl text-white">
              NEW TECHNOLOGY &amp; BUILD
            </h3>
            <h2
              style={{ color: "#d8d8d8" }}
              className="my-8 font-bold lg:text-7xl md:text-5xl sm:text-5xl"
            >
              WHEELS &amp; TIRES COLLECTIONS
            </h2>
            <button className="btn btn-white bg-white border-0 text-black hover:text-white font-bold">
              Shop Now
            </button>
          </div>
          <div className="order-2 justify-self-center	my-5 ">
            <img
              src="https://htmldemo.net/lukas/lukas/assets/img/slider/slider-2-1.png"
              class="lg:w-full md:w-2/4"
            />
          </div>
        </div>
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" class="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" class="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
