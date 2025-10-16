import React from "react";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import FlashSell from "./FlashSell";
import Reviews from "./Reviews";
import SecondBanner from "./Second_Banner";
import Services from "./Services";
import { useProducts } from "../../hooks/useProducts";
import Loading from "../../Shared/Loading";

const Home = () => {
  const [products, setProducts] = useProducts();
  return products.length !== 0 ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59,130,246,0.15) 1px, transparent 0)`,
               backgroundSize: '30px 30px'
             }}>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-rose-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      
      <div className="relative z-10">
        <Banner />
        <Services />
        <FlashSell />
        <BusinessSummary />
        <Reviews />
        <SecondBanner />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
