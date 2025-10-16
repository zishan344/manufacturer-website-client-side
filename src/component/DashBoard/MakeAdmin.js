import { signOut } from "firebase/auth";
import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { 
  FiUsers, 
  FiShield, 
  FiSearch, 
  FiFilter,
  FiUserCheck,
  FiUserX
} from "react-icons/fi";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import AdminRow from "./AdminRow";
const MakeAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const {
    data: allUser,
    isLoading,
    error,
    refetch,
  } = useQuery("order", () =>
    fetch(`https://autovantis.onrender.com/allUser`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      return res.json();
    })
  );

  // Filter and search users
  const filteredUsers = useMemo(() => {
    if (!allUser) return [];
    
    return allUser.filter(user => {
      const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterRole === "all" || 
        (filterRole === "admin" && user.role === "admin") ||
        (filterRole === "user" && user.role !== "admin");
      
      return matchesSearch && matchesFilter;
    });
  }, [allUser, searchTerm, filterRole]);

  // Statistics
  const stats = useMemo(() => {
    if (!allUser) return { total: 0, admins: 0, users: 0 };
    
    const admins = allUser.filter(user => user.role === "admin").length;
    const users = allUser.length - admins;
    
    return {
      total: allUser.length,
      admins,
      users
    };
  }, [allUser]);

  if (isLoading) {
    return <Loading />;
  }

  if (!allUser || allUser.length === 0) {
    return (
      <div className="text-center py-12">
        <FiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
        <p className="text-gray-600">There are no users in the system yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage user roles and permissions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUsers className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiShield className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Administrators</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.admins}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUserCheck className="w-8 h-8 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Regular Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.users}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400 w-5 h-5" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="user">Regular Users</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table/List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <AdminRow key={index} user={user} index={index} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredUsers.map((user, index) => (
            <div key={index} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      {user.role === "admin" ? "Administrator" : "Regular User"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user.role === "admin" ? (
                    <FiShield className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <FiUserCheck className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
              <AdminRow user={user} index={index} refetch={refetch} mobile={true} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FiUserX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-600">
              {searchTerm || filterRole !== "all" 
                ? "Try adjusting your search or filter criteria." 
                : "There are no users in the system."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;
