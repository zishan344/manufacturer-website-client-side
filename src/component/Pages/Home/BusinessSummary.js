import React from "react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { GiCheckeredFlag } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
const BusinessSummary = () => {
  const business = [
    {
      icon: { GiCheckeredFlag },
      number: "72",
      name: "Country",
    },
    {
      icon: { AiOutlineFundProjectionScreen },
      number: "535+",
      name: "compleat projects",
    },
    {
      icon: "",
      number: "273+",
      name: "Happy Clients",
    },
    {
      icon: { BiLike },
      number: "432+",
      name: "Feedback",
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="text-center my-12 px-2 py-1">
        <h2 className="text-[#86B6F4] text-xl font-bold px-2 inline-block bg-[#E7F1FD] rounded-full">
          MILLIONS OF BUSINESS TRUST US
        </h2>
        <p className="font-bold mt-4">Try to Understand User Expectation</p>
      </div>
      <div className=" grid  justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="flex justify-center  gap-5">
            {" "}
            <GiCheckeredFlag className="text-7xl font-bold" />
          </h2>
          <h2 className="font-bold text-5xl text-black text-center">72</h2>
          <h2 className="font-bold text-2xl text-[#86B6F4] text-center">
            country
          </h2>
        </div>
        <div>
          <h2 className="flex justify-center">
            {" "}
            <AiOutlineFundProjectionScreen className="text-7xl font-bold" />
          </h2>
          <h2 className="font-bold text-5xl text-black text-center">535+</h2>
          <h2 className="font-bold text-2xl text-[#86B6F4] text-center">
            compleat projects
          </h2>
        </div>
        <div>
          <h2 className="flex justify-center">
            {" "}
            <IoIosPeople className="text-7xl font-bold" />
          </h2>
          <h2 className="font-bold text-5xl text-black text-center">273+</h2>
          <h2 className="font-bold text-2xl text-[#86B6F4] text-center">
            Happy Clients
          </h2>
        </div>
        <div>
          <h2 className="flex justify-center">
            {" "}
            <BiLike className="text-7xl font-bold" />
          </h2>
          <h2 className="font-bold text-5xl text-black text-center">432+</h2>
          <h2 className="font-bold text-2xl text-[#86B6F4] text-center">
            Feedback
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
