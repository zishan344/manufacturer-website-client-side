import React from "react";
const Portfolio = () => {
  return (
    <div>
      <div className="container my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <img
              className="w-100"
              src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
              alt=""
            />
          </div>
          <div>
            <div>
              <div className="text-box">
                <h1
                  style={{
                    fontSize: "44px",
                    lineHeight: "56px",
                    fontFamily: "'Kaushan Script', cursive",
                    color: "#292929",
                  }}
                >
                  I'm Marouful Islam , <br />
                  Web Designer &amp; Web Developer <br />
                  from Bangladesh, Chittagong.
                </h1>
                <p className="my-5">
                  I have rich experience in web site design &amp; building and
                  customization. Also I am good at html, css, javascript, React
                  js, tailwind, firebase, bootstrap. I love learning something
                  new. I am a hard worker. I am dedicated on my work finish on
                  the the deadline. I love to talk with you about our unique
                  approach. Feel free to contact me writing an email with your
                  project idea.
                </p>
              </div>
              <div className="bts">
                <button className="btn text-secondary link btn-link">
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className=" font-bold text-3xl">Skills</h2>
            <h2 className="text-secondary font-bold text-lg">
              DEVELOPMENT ARSENAL
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-center gap-10 ">
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              Html
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              css
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              bootstrap
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              tailwind
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              sass
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              javascript
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              react
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              firebase
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              node js
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              express js
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              mongodb
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              jwt
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              git
            </button>
            <button className="btn bg-black text-white font-bold mr-2 border-none ">
              github
            </button>
          </div>
        </div>
        <div>
          <div className="text-center mb-10">
            <h2 className=" font-bold text-3xl">Recent Project</h2>
            <h2 className="text-secondary font-bold text-lg">
              New project of 2022
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:justify-center">
              <div class="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="https://i.ibb.co/hBXptvh/Screenshot-18.png"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">furniture whorehouse</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              <div class="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="https://i.ibb.co/HYs4S3j/Screenshot-17.png"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Shoes!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              <div class="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="
                    https://i.ibb.co/nCmWCHL/Screenshot-16.png"
                    alt="Shoes"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">Shoes!</h2>
                  <p>
                    If you want to be collect the more information this project
                    please visite the link
                  </p>
                  <div class="card-actions justify-center">
                    <a href="https://furniture-warehouse.web.app/">
                      <button class="btn btn-primary">
                        see the full project
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
