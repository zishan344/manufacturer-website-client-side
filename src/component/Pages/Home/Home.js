import React from "react";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import FlashSell from "./FlashSell";
import Reviews from "./Reviews";
import Second_Banner from "./Second_Banner";
import Services from "./Services";
import { useProducts } from "../../hooks/useProducts";
import Loading from "../../Shared/Loading";

const Home = () => {
  const [products, setProducts] = useProducts();
  return products.length !== 0 ? (
    <div>
      <Banner></Banner>
      <Services />
      <FlashSell />
      <BusinessSummary />
      <Reviews />
      <Second_Banner />
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
