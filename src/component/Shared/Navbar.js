import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import auth from "../../firebase.init";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/home", icon: "", external: false },
    ...(user ? [
      { name: "Shop", path: "/allProduct", icon: "", external: false },
      { name: "Dashboard", path: "/dashboard", icon: "", external: false },
      { name: "Portfolio", path: "https://marouful-islam-zishan-portfolio.vercel.app/", icon: "", external: true }
    ] : []),
    { name: "Blog", path: "/blog", icon: "📖", external: false },
    ...(!user ? [{ name: "Login", path: "/login", icon: "🔑", external: false }] : [])
  ];

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-200"></div>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Autovantis
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              )
            ))}
            
            {user && (
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <FiUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden xl:block">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-lg rounded-2xl mt-4 shadow-xl border border-gray-200/20 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {menuItems.map((item) => (
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white mx-4 rounded-xl shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              )
            ))}
            
            {user && (
              <div className="border-t border-gray-200/50 pt-4 mt-4">
                <div className="flex items-center space-x-3 px-6 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <FiUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all duration-200"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
