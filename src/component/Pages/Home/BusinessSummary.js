import React from "react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { GiCheckeredFlag } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

const BusinessSummary = () => {
  const stats = [
    {
      icon: GiCheckeredFlag,
      number: "72",
      label: "Countries",
      color: "from-blue-500 to-purple-500",
      bgColor: "from-blue-500/10 to-purple-500/10"
    },
    {
      icon: AiOutlineFundProjectionScreen,
      number: "535+",
      label: "Complete Projects",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-500/10 to-teal-500/10"
    },
    {
      icon: IoIosPeople,
      number: "273+",
      label: "Happy Clients",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: BiLike,
      number: "432+",
      label: "Positive Feedback",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10"
    },
  ];

  return (
    <div className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 3px 3px, rgba(59,130,246,0.15) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-4">
            📊 Trusted Worldwide
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-800">Millions of</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600"> Businesses</span>
            <br />
            <span className="text-gray-800">Trust Us</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers worldwide who trust our premium auto parts and exceptional service.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group relative">
                {/* Card Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                {/* Stat Card */}
                <div className="relative bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <IconComponent className="text-3xl text-white" />
                  </div>
                  
                  {/* Number */}
                  <div className={`text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-600 font-semibold text-lg">
                    {stat.label}
                  </div>
                  
                  {/* Decorative Line */}
                  <div className={`w-12 h-1 bg-gradient-to-r ${stat.color} rounded-full mx-auto mt-4 opacity-60`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6">
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className={`w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white shadow-sm`}></div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold text-gray-800">Join 50,000+ Satisfied Customers</div>
              <div className="text-sm text-gray-600">Experience premium quality and exceptional service</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
