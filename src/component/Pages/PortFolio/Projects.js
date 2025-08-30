import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    return (
       <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Recent Projects</h2>
            <p className="text-blue-600 font-medium mt-2">NEW PROJECTS OF 2022</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://i.ibb.co/hBXptvh/Screenshot-18.png" 
                  alt="Furniture Warehouse" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 w-full">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full mb-2">Web App</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Furniture Warehouse</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  A comprehensive warehouse management system for furniture items. Includes inventory tracking, order management, and reporting features.
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href="https://furniture-warehouse.web.app/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://i.ibb.co/HYs4S3j/Screenshot-17.png" 
                  alt="Recipe Maker" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 w-full">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full mb-2">Web App</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Recipe Maker</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  An interactive recipe application that allows users to create, save, and share their favorite recipes with detailed instructions and ingredients.
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href="https://recipi-maker-org.netlify.app/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://i.ibb.co/nCmWCHL/Screenshot-16.png" 
                  alt="Bike Lover" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 w-full">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full mb-2">Web App</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Bike Lover.com</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  A platform for motorcycle enthusiasts to browse, review, and purchase bikes. Features include user reviews, detailed specifications, and comparison tools.
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href="https://poetic-salmiakki-771f0a.netlify.app/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Projects;