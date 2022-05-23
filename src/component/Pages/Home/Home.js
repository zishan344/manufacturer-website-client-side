import React from "react";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import FlashSell from "./FlashSell";
import Reviews from "./Reviews";
import Second_Banner from "./Second_Banner";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services />
      <FlashSell />
      <BusinessSummary />
      <Reviews />
      <Second_Banner />
    </div>
  );
};

export default Home;
