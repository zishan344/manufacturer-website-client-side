import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import ContactAndEducation from "./ContactAndEducation";
import Skills from "./Skills";
import Projects from "./Projects";

const Portfolio = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="order-2 md:order-1">
              <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                M Marouful Islam Zishan
              </h2>
              <h3 className="text-2xl font-medium text-gray-700 mb-6">
                Full Stack Software Engineer
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Passionate Full Stack Developer with a proven track record of creating robust, user-centric web applications. I bridge the gap between cutting-edge frontend experiences and scalable backend solutions. My technical arsenal spans multiple languages and frameworks including <span className="font-medium">C/C++, Python, JavaScript, TypeScript, React, Node.js</span> and various database technologies. I excel at transforming complex requirements into elegant, efficient code while maintaining a keen focus on performance and accessibility. My collaborative approach and commitment to continuous learning enable me to deliver innovative solutions that drive business value.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://drive.google.com/uc?export=download&id=1ELRDq1l4iu9b2wKXVZzXDNm09NVsgbmb" 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center"
                  target="_blank" 
                  rel="noreferrer"
                >
                  <FaDownload className="mr-2" /> Download Resume
                </a>
                <div className="flex space-x-4 items-center">
                  <a href="https://github.com/zishan344" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors text-2xl">
                    <FaGithub />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors text-2xl">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors text-2xl">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    className="w-full h-full object-cover"
                    src="/mohammad-maroful-islam-zishan.jpg"
                    alt="Profile"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full py-2 px-4 shadow-lg">
                  <p className="font-bold">Chattogram, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact & Education Section */}
      <ContactAndEducation/>

      {/* Skills Section - Network Diagram Style */}
      <Skills/>

      {/* Projects Section */}
      <Projects/>
      
    </div>
  );
};

export default Portfolio;
