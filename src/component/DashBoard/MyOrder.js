import { signOut } from "firebase/auth";
import React, { useState, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { 
  FiShoppingBag, 
  FiPackage, 
  FiDollarSign, 
  FiTruck,
  FiSearch,
  FiFilter
} from "react-icons/fi";
import auth from "../../firebase.init";
import UseLoading from "../hooks/UseLoading";
import Loading from "../Shared/Loading";
import MyOrderRow from "./MyOrderRow";
import { formatNumber } from "../Shared/monyFormatter";

const MyOrder = () => {
  const [user, loading, Uerror] = useAuthState(auth);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("order", () =>
    fetch(`https://autovantis.onrender.com/booking/${user?.email}`, {
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

  // Filter orders
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    
    return orders.filter(order => {
      const matchesSearch = order.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.userName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || 
                           (filterStatus === "pending" && !order.paid) ||
                           (filterStatus === "paid" && order.paid);
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  // Format number with K/M suffixes
  

  // Statistics
  const stats = useMemo(() => {
    if (!orders) return { total: 0, totalValue: 0, pending: 0, paid: 0 };
    
    const total = orders.length;
    const totalValue = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
    const pending = orders.filter(order => !order.paid).length;
    const paid = orders.filter(order => order.paid).length;

    return { total, totalValue, pending, paid };
  }, [orders]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <FiShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
        <p className="text-gray-600">Your order history will appear here once you place an order.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-6">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600 text-sm sm:text-lg">Track and manage your order history</p>
        </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl">
              <FiShoppingBag className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-2 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-lg sm:text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-emerald-100 rounded-lg sm:rounded-xl">
              <FiDollarSign className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-600" />
            </div>
            <div className="ml-2 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-lg sm:text-3xl font-bold text-gray-900">${formatNumber(stats.totalValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-orange-100 rounded-lg sm:rounded-xl">
              <FiPackage className="w-5 h-5 sm:w-8 sm:h-8 text-orange-600" />
            </div>
            <div className="ml-2 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
              <p className="text-lg sm:text-3xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl">
              <FiTruck className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-2 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
              <p className="text-lg sm:text-3xl font-bold text-gray-900">{stats.paid}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-full lg:max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/70 backdrop-blur-sm text-sm"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-3">
            <FiFilter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/70 backdrop-blur-sm text-sm"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending Payment</option>
              <option value="paid">Paid Orders</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>
      </div>

      {/* Orders Table - Desktop */}
      <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">#</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Product</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Price</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Qty</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Total</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Status & Action</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-200/50">
              {filteredOrders.map((order, index) => (
                <MyOrderRow
                  key={index}
                  order={order}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order, index) => (
          <MyOrderRow
            key={index}
            order={order}
            index={index}
            refetch={refetch}
            viewMode="mobile"
          />
        ))}
      </div>

        {/* No Results */}
        {filteredOrders.length === 0 && orders.length > 0 && (
          <div className="text-center py-16">
            <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
