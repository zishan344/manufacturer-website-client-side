import React, { useEffect, useState } from "react";
import Service from "./Service";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("product.json")
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
        {services.map((s, index) => (
          <Service service={s} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Services;
