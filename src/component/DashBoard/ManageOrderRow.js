import React from "react";
import { 
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

const ManageOrderRow = ({ order, index, refetch }) => {
  const delivered = () => {
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
  };

  const deleteItem = () => {
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
  };

  const getStatusBadge = () => {
    if (!order.paid) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <FiAlertCircle className="mr-1" size={12} />
          Unpaid
        </span>
      );
    }
    
    if (order.status === "delivered") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <FiCheck className="mr-1" size={12} />
          Delivered
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <FiClock className="mr-1" size={12} />
        Pending
      </span>
    );
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors duration-200">
      {/* Index and Delete */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-900">
            #{(index + 1).toString().padStart(3, '0')}
          </span>
          <button
            onClick={deleteItem}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete Order"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>

      {/* Product Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-12 h-12">
            <img
              src={order.image}
              alt={order?.product_name || order?.name}
              className="w-12 h-12 rounded-xl object-cover border border-gray-200"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
              {order?.product_name || order?.name}
            </div>
            <div className="text-sm text-gray-500">
              ID: {order._id?.slice(-8)}
            </div>
          </div>
        </div>
      </td>

      {/* Customer Info */}
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-900">
            <FiMail size={14} className="text-gray-400" />
            <span className="truncate max-w-xs">{order.email}</span>
          </div>
          
          {order?.number && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiPhone size={14} className="text-gray-400" />
              <span>{order.number}</span>
            </div>
          )}
          
          {order?.shipignAddress && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiMapPin size={14} className="text-gray-400" />
              <span className="truncate max-w-xs">{order.shipignAddress}</span>
            </div>
          )}
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          ${typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.price || 0).toFixed(2)}
        </div>
      </td>

      {/* Quantity */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {order.quantity || 0}
        </div>
      </td>

      {/* Total Price */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          ${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : parseFloat(order.totalPrice || 0).toFixed(2)}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex flex-col items-center space-y-2">
          {getStatusBadge()}
          
          {order.paid && order?.status === "pending" && (
            <button
              onClick={delivered}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              <FiTruck size={12} />
              <span>Ship</span>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ManageOrderRow;
