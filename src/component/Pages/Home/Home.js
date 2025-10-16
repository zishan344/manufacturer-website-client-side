import React, { Suspense, lazy } from "react";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import { useProducts } from "../../hooks/useProducts";
import Loading from "../../Shared/Loading";

// Lazy load heavy components
const FlashSell = lazy(() => import("./FlashSell"));
const Reviews = lazy(() => import("./Reviews"));
const SecondBanner = lazy(() => import("./Second_Banner"));
const Services = lazy(() => import("./Services"));

// Lightweight loading component for sections
const SectionLoader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  const [products, setProducts, loading, error] = useProducts();

  if (loading) {
    return <Loading />;
  }

  if (error && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Error</h2>
          <p className="text-gray-600 mb-4">Unable to load products. Please check your connection.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Optimized Background Pattern - Reduced complexity */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 4px 4px, rgba(59,130,246,0.1) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>
      
      {/* Reduced floating elements for better performance */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-purple-500/15 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-20 h-20 bg-gradient-to-br from-emerald-400/15 to-teal-500/15 rounded-full blur-xl animate-pulse delay-2000"></div>
      
      <div className="relative z-10">
        {/* Critical above-the-fold content loads immediately */}
        <Banner />
        <BusinessSummary />
        
        {/* Non-critical content lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FlashSell />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Reviews />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SecondBanner />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
