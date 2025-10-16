import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import { 
  FiMenu, 
  FiX, 
  FiUser, 
  FiShoppingBag, 
  FiStar, 
  FiSettings, 
  FiPlus, 
  FiUsers, 
  FiPackage,
  FiHome,
  FiChevronRight
} from "react-icons/fi";
import auth from "../../firebase.init";
import useAdmin from "../hooks/useAdmin";
const DashBoard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userMenuItems = [
    {
      name: "My Profile",
      path: "/dashboard",
      icon: FiUser,
      description: "Manage your personal information"
    },
    {
      name: "My Orders",
      path: "/dashboard/myOrder",
      icon: FiShoppingBag,
      description: "Track your orders and purchases"
    },
    {
      name: "Add Review",
      path: "/dashboard/addReview",
      icon: FiStar,
      description: "Share your product experience"
    }
  ];

  const adminMenuItems = [
    {
      name: "My Profile",
      path: "/dashboard",
      icon: FiUser,
      description: "Manage your admin profile"
    },
    {
      name: "Manage Orders",
      path: "/dashboard/manageAllOrder",
      icon: FiSettings,
      description: "Oversee all customer orders"
    },
    {
      name: "Add Product",
      path: "/dashboard/addProduct",
      icon: FiPlus,
      description: "Add new products to catalog"
    },
    {
      name: "Make Admin",
      path: "/dashboard/makeAdmin",
      icon: FiUsers,
      description: "Grant admin privileges"
    },
    {
      name: "Manage Products",
      path: "/dashboard/manageProduct",
      icon: FiPackage,
      description: "Edit and manage inventory"
    }
  ];

  const menuItems = admin ? adminMenuItems : userMenuItems;

  const MenuItem = ({ item, isActive }) => (
    <NavLink
      to={item.path}
      onClick={() => setIsSidebarOpen(false)}
      className={({ isActive: navIsActive }) =>
        `group relative flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
          navIsActive
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
            : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
        }`
      }
    >
      <div className={`p-2 rounded-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-white/20' 
          : 'bg-emerald-100 group-hover:bg-emerald-200'
      }`}>
        <item.icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{item.name}</p>
        <p className={`text-sm truncate ${
          isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-emerald-500'
        }`}>
          {item.description}
        </p>
      </div>
      <FiChevronRight className={`transition-transform duration-200 ${
        isActive ? 'text-white/60' : 'text-gray-400 group-hover:translate-x-1'
      }`} size={16} />
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-16 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <FiHome className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">
                {admin ? 'Admin Panel' : 'User Panel'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-lg shadow-2xl border-r border-gray-200/50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 lg:z-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiHome className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Dashboard</h2>
                  <p className="text-emerald-100">
                    {admin ? 'Administrator' : 'User Panel'}
                  </p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <FiUser className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user?.displayName || user?.email || 'User'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                  {admin && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mt-1">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 p-6 space-y-2 overflow-y-auto">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {admin ? 'Admin Functions' : 'User Functions'}
              </h3>
              {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200/50">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Autovantis Dashboard v2.0
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  © 2024 All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-1/4 right-10 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  );
};

export default DashBoard;
