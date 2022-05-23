import React from "react";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import Reviews from "./Reviews";
import Second_Banner from "./Second_Banner";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services />
      <Second_Banner />
      <BusinessSummary />
      <Reviews />
    </div>
  );
};

export default Home;
