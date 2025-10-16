import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiCreditCard, FiCheck, FiCopy } from "react-icons/fi";
import Swal from "sweetalert2";
const MyOrderRow = ({ order, index, refetch, viewMode }) => {
  const { _id } = order;

  const deleteItem = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://autovantis.onrender.com/booking/${_id}`, {
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
              text: "Your order has been cancelled.",
              icon: "success",
              confirmButtonColor: "#10b981"
            });
          });
      }
    });
  };

  const copyTransactionId = () => {
    navigator.clipboard.writeText(order.transactionId);
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      icon: 'success',
      title: 'Transaction ID copied!'
    });
  };

  // Mobile Card View
  if (viewMode === "mobile") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-semibold">
              {index + 1}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {order?.name || order?.product_name}
              </h3>
              <p className="text-xs text-gray-500">
                Order #{_id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>
          <img 
            src={order.image} 
            alt={order?.name || order?.product_name}
            className="w-12 h-12 rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Unit Price</p>
            <p className="font-semibold">${order.price}</p>
          </div>
          <div>
            <p className="text-gray-600">Quantity</p>
            <p className="font-semibold">{order.quantity}</p>
          </div>
        </div>

        {/* Total */}
        <div className="bg-emerald-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Amount:</span>
            <span className="text-lg font-bold text-emerald-600">${order.totalPrice}</span>
          </div>
        </div>

        {/* Status & Actions */}
        <div>
          {order.totalPrice && !order.paid && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <button 
                    onClick={deleteItem} 
                    className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 transition-colors duration-200"
                  >
                    <FiTrash2 className="w-4 h-4 mr-2" />
                    Cancel Order
                  </button>
                </div>
                <div className="flex-1">
                  <Link to={`/dashboard/payment/${order._id}`} className="block">
                    <button className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg">
                      <FiCreditCard className="w-4 h-4 mr-2" />
                      Pay Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {order.totalPrice && order.paid && (
            <div className="space-y-3">
              <div className="inline-flex items-center px-3 py-2 text-sm font-semibold text-green-800 bg-green-100 border border-green-200 rounded-lg w-full justify-center">
                <FiCheck className="w-4 h-4 mr-2" />
                Payment Completed
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Transaction ID:</div>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-xs font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded border">
                    {order.transactionId}
                  </code>
                  <button
                    onClick={copyTransactionId}
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Copy Transaction ID"
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop Table View
  return (
    <tr className="hover:bg-white/70 transition-all duration-200">
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs sm:text-sm font-semibold">
          {index + 1}
        </div>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
            <img 
              src={order.image} 
              alt={order?.name || order?.product_name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover shadow-md"
            />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-gray-900">
              {order?.name || order?.product_name}
            </div>
            <div className="text-xs text-gray-500">
              Order #{_id.slice(-6).toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <div className="text-xs sm:text-sm font-semibold text-gray-900">${order.price}</div>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <div className="text-xs sm:text-sm font-semibold text-gray-900">{order.quantity}</div>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <div className="text-sm sm:text-lg font-bold text-emerald-600">${order.totalPrice}</div>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        {order.totalPrice && !order.paid && (
          <div className="flex flex-col xl:flex-row items-center space-y-1 xl:space-y-0 xl:space-x-2">
            <button 
              onClick={deleteItem} 
              className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 transition-colors duration-200"
            >
              <FiTrash2 className="w-3 h-3 mr-1" />
              Cancel
            </button>
            <Link to={`/dashboard/payment/${order._id}`}>
              <button className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <FiCreditCard className="w-3 h-3 mr-1" />
                Pay
              </button>
            </Link>
          </div>
        )}
        {order.totalPrice && order.paid && (
          <div className="space-y-2">
            <div className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-green-800 bg-green-100 border border-green-200 rounded-lg">
              <FiCheck className="w-3 h-3 mr-1" />
              Paid
            </div>
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">Transaction ID:</div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <code className="text-xs font-mono text-gray-800 bg-gray-100 px-1 sm:px-2 py-1 rounded border flex-1 truncate">
                  {order.transactionId}
                </code>
                <button
                  onClick={copyTransactionId}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy Transaction ID"
                >
                  <FiCopy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default MyOrderRow;
