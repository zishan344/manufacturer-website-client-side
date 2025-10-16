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
  FiPlus,
  FiTrendingUp,
  FiDollarSign,
  FiTrash2,
  FiEdit,
  FiEye
} from "react-icons/fi";
import Swal from "sweetalert2";
import auth from "../../firebase.init";
import UseLoading from "../hooks/UseLoading";
import Loading from "../Shared/Loading";
import ManageProductRow from "./ManageProductRow";
import { formatNumber } from "../Shared/monyFormatter";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("products", () =>
    fetch(`https://autovantis.onrender.com/products`, {
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = products.filter(product => 
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        case "stock-low":
          return (a.product_quantity || 0) - (b.product_quantity || 0);
        case "stock-high":
          return (b.product_quantity || 0) - (a.product_quantity || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!products) return { total: 0, lowStock: 0, totalValue: 0, averagePrice: 0 };
    
    const totalValue = products.reduce((sum, product) => {
      const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || 0);
      const quantity = typeof product.product_quantity === 'number' ? product.product_quantity : parseInt(product.product_quantity || 0);
      return sum + (price * quantity);
    }, 0);

    const averagePrice = products.length > 0 ? products.reduce((sum, product) => {
      const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || 0);
      return sum + price;
    }, 0) / products.length : 0;

    return {
      total: products.length,
      lowStock: products.filter(product => (product.product_quantity || 0) < 10).length,
      totalValue,
      averagePrice
    };
  }, [products]);

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://autovantis.onrender.com/product/${productId}`, {
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
              text: "Product has been deleted",
              icon: "success",
              confirmButtonColor: "#10b981"
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete product",
              icon: "error",
              confirmButtonColor: "#ef4444"
            });
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    return <UseLoading order={"No products available. Please add some products."} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Manage Products
          </h1>
          <p className="text-gray-600 mt-1">
            Oversee your product inventory and manage listings
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
          <button 
            onClick={() => navigate('/dashboard/addProduct')}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
          >
            <FiPlus size={16} />
            <span>Add Product</span>
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
              <p className="text-xs lg:text-sm text-gray-600">Total Products</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.lowStock}</p>
              <p className="text-xs lg:text-sm text-gray-600">Low Stock</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FiDollarSign className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">${formatNumber(stats.totalValue)}</p>
              <p className="text-xs lg:text-sm text-gray-600">Total Value</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-lg col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">${stats.averagePrice.toFixed(2)}</p>
              <p className="text-xs lg:text-sm text-gray-600">Avg Price</p>
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm lg:text-base"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-500" size={16} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="stock-high">Stock: High to Low</option>
              <option value="stock-low">Stock: Low to High</option>
            </select>
          </div>
        </div>

        {/* Active Search */}
        {searchTerm && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Search results for:</span>
            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
              "{searchTerm}"
              <button
                onClick={() => setSearchTerm("")}
                className="ml-2 text-emerald-500 hover:text-emerald-700"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Products Table */}
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
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product, index) => (
                  <ManageProductRow
                    key={product._id || index}
                    product={product}
                    index={index}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile and Tablet Card Layout */}
        <div className="xl:hidden">
          <div className="space-y-4 p-4">
            {filteredProducts.map((product, index) => (
              <div key={product._id || index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                {/* Product Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">
                    #{(index + 1).toString().padStart(3, '0')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <FiEye size={16} />
                    </button>
                    <button className="p-2 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200">
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-semibold text-gray-900">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price || 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min Order</p>
                    <p className="font-semibold text-gray-900">{product.minimum_order || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Stock</p>
                    <p className={`font-semibold ${
                      (product.product_quantity || 0) < 10 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {product.product_quantity || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
