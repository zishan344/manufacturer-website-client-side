import { signOut } from "firebase/auth";
import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiRefreshCw,
  FiPackage,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiTrash2,
  FiTruck,
  FiCheck,
  FiClock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAlertCircle
} from "react-icons/fi";
import Swal from "sweetalert2";
import auth from "../../firebase.init";
import UseLoading from "../hooks/UseLoading";
import Loading from "../Shared/Loading";
import ManageOrderRow from "./ManageOrderRow";

const ManageOrder = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("order", () =>
    fetch(`https://autovantis.onrender.com/booking`, {
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

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    
    let filtered = orders.filter(order => {
      const matchesSearch = 
        order?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || 
        (statusFilter === "paid" && order.paid) ||
        (statusFilter === "unpaid" && !order.paid) ||
        (statusFilter === "pending" && order.status === "pending") ||
        (statusFilter === "delivered" && order.status === "delivered");
      
      return matchesSearch && matchesStatus;
    });

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "price-high":
          return (b.totalPrice || 0) - (a.totalPrice || 0);
        case "price-low":
          return (a.totalPrice || 0) - (b.totalPrice || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!orders) return { total: 0, paid: 0, unpaid: 0, revenue: 0 };
    
    return {
      total: orders.length,
      paid: orders.filter(order => order.paid).length,
      unpaid: orders.filter(order => !order.paid).length,
      revenue: orders.filter(order => order.paid).reduce((sum, order) => {
        const price = typeof order.totalPrice === 'number' ? order.totalPrice : parseFloat(order.totalPrice || 0);
        return sum + price;
      }, 0)
    };
  }, [orders]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length === 0) {
    return <UseLoading order={"All orders are completed, waiting for new orders"} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Manage Orders
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage all customer orders
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <FiRefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg">
            <FiDownload size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiPackage className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs lg:text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.paid}</p>
              <p className="text-xs lg:text-sm text-gray-600">Paid Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FiUsers className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.unpaid}</p>
              <p className="text-xs lg:text-sm text-gray-600">Unpaid Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FiDollarSign className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">${stats.revenue.toFixed(2)}</p>
              <p className="text-xs lg:text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-full lg:max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm lg:text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <FiFilter className="text-gray-500" size={16} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || statusFilter !== "all") && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-2 text-emerald-500 hover:text-emerald-700"
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter("all")}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
        {/* Desktop Table - Only for xl screens and up */}
        <div className="hidden xl:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <ManageOrderRow
                    key={order._id || index}
                    order={order}
                    index={index}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile and Tablet Card Layout - For xl screens and below */}
        <div className="xl:hidden">
          <div className="space-y-4 p-4">
            {filteredOrders.map((order, index) => (
              <div key={order._id || index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-semibold text-gray-900">
                      #{(index + 1).toString().padStart(3, '0')}
                    </span>
                    {/* Status Badge */}
                    {!order.paid ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <FiAlertCircle className="mr-1" size={10} />
                        Unpaid
                      </span>
                    ) : order.status === "delivered" ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FiCheck className="mr-1" size={10} />
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FiClock className="mr-1" size={10} />
                        Pending
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Delete Order?",
                        text: "This action cannot be undone!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#ef4444",
                        cancelButtonColor: "#6b7280",
                        confirmButtonText: "Yes, Delete",
                        cancelButtonText: "Cancel"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          fetch(`https://autovantis.onrender.com/booking/${order._id}`, {
                            method: "DELETE",
                            headers: {
                              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              refetch();
                              Swal.fire({
                                title: "Deleted!",
                                text: "Order has been deleted",
                                icon: "success",
                                confirmButtonColor: "#10b981"
                              });
                            })
                            .catch((error) => {
                              Swal.fire({
                                title: "Error!",
                                text: "Failed to delete order",
                                icon: "error",
                                confirmButtonColor: "#ef4444"
                              });
                            });
                        }
                      });
                    }}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={order.image}
                    alt={order?.product_name || order?.name}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {order?.product_name || order?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      ID: {order._id?.slice(-8)}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <FiMail size={12} className="text-gray-400" />
                    <span className="text-gray-900 truncate">{order.email}</span>
                  </div>
                  {order?.number && (
                    <div className="flex items-center space-x-2 text-sm">
                      <FiPhone size={12} className="text-gray-400" />
                      <span className="text-gray-600">{order.number}</span>
                    </div>
                  )}
                  {order?.shipignAddress && (
                    <div className="flex items-center space-x-2 text-sm">
                      <FiMapPin size={12} className="text-gray-400" />
                      <span className="text-gray-600 truncate">{order.shipignAddress}</span>
                    </div>
                  )}
                </div>

                {/* Price Info */}
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-medium text-gray-900">
                      ${typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.price || 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Qty</p>
                    <p className="font-medium text-gray-900">{order.quantity || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-semibold text-gray-900">
                      ${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : parseFloat(order.totalPrice || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                {order.paid && order?.status === "pending" && (
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Mark as Delivered?",
                        text: "This action will mark the order as delivered.",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#10b981",
                        cancelButtonColor: "#6b7280",
                        confirmButtonText: "Yes, Mark Delivered",
                        cancelButtonText: "Cancel"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          fetch(`https://autovantis.onrender.com/order/${order._id}`, {
                            method: "PATCH",
                            headers: {
                              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              refetch();
                              Swal.fire({
                                title: "Success!",
                                text: "Order marked as delivered",
                                icon: "success",
                                confirmButtonColor: "#10b981"
                              });
                            })
                            .catch((error) => {
                              Swal.fire({
                                title: "Error!",
                                text: "Failed to update order status",
                                icon: "error",
                                confirmButtonColor: "#ef4444"
                              });
                            });
                        }
                      });
                    }}
                    className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                  >
                    <FiTruck size={16} />
                    <span>Mark as Shipped</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
