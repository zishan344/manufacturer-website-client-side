import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "./Service";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h2 className="text-[#86B6F4] text-xl font-bold my-12 inline-block bg-[#E7F1FD] px-2 py-1 rounded-full">
          Car Parts
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.slice(0, 3).map((s, index) => (
          <Service service={s} key={index} />
        ))}
      </div>
      <div className="text-center my-10">
        <button
          onClick={() => navigate("/allProduct")}
          className="btn btn-outline btn-secondary"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Services;
