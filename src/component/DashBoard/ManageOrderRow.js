
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
        <span className="inline-flex items-center px-1.5 xl:px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">
          <FiAlertCircle className="mr-0.5" size={8} />
          Unpaid
        </span>
      );
    }
    
    if (order.status === "delivered") {
      return (
        <span className="inline-flex items-center px-1.5 xl:px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
          <FiCheck className="mr-0.5" size={8} />
          Delivered
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-1.5 xl:px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
        <FiClock className="mr-0.5" size={8} />
        Pending
      </span>
    );
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors duration-200">
      {/* Index and Delete */}
      <td className="px-2 xl:px-4 py-2 xl:py-3 whitespace-nowrap">
        <div className="flex items-center space-x-1 xl:space-x-2">
          <span className="text-xs font-medium text-gray-900">
            #{(index + 1).toString().padStart(3, '0')}
          </span>
          <button
            onClick={deleteItem}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete Order"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      </td>

      {/* Product Info */}
      <td className="px-2 xl:px-4 py-2 xl:py-3">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-8 h-8 xl:w-10 xl:h-10">
            <img
              src={order.image}
              alt={order?.product_name || order?.name}
              className="w-full h-full rounded-lg object-cover border border-gray-200"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-gray-900 truncate max-w-[100px] xl:max-w-[150px]">
              {order?.product_name || order?.name}
            </div>
            <div className="text-[10px] xl:text-xs text-gray-500 truncate">
              {order._id?.slice(-6)}
            </div>
          </div>
        </div>
      </td>

      {/* Customer Info */}
      <td className="px-2 xl:px-4 py-2 xl:py-3">
        <div className="space-y-0.5 xl:space-y-1">
          <div className="flex items-center space-x-1 text-xs text-gray-900">
            <FiMail size={10} className="text-gray-400 flex-shrink-0" />
            <span className="truncate max-w-[120px] xl:max-w-[180px]">{order.email}</span>
          </div>
          
          {order?.number && (
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <FiPhone size={10} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{order.number}</span>
            </div>
          )}
          
          {order?.shipignAddress && (
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <FiMapPin size={10} className="text-gray-400 flex-shrink-0" />
              <span className="truncate max-w-[120px] xl:max-w-[180px]">{order.shipignAddress}</span>
            </div>
          )}
        </div>
      </td>

      {/* Price */}
      <td className="px-2 xl:px-4 py-2 xl:py-3 whitespace-nowrap">
        <div className="text-xs font-medium text-gray-900">
          ${typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.price || 0).toFixed(2)}
        </div>
      </td>

      {/* Quantity */}
      <td className="px-2 xl:px-4 py-2 xl:py-3 whitespace-nowrap">
        <div className="text-xs text-gray-900 text-center">
          {order.quantity || 0}
        </div>
      </td>

      {/* Total Price */}
      <td className="px-2 xl:px-4 py-2 xl:py-3 whitespace-nowrap">
        <div className="text-xs font-semibold text-gray-900">
          ${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : parseFloat(order.totalPrice || 0).toFixed(2)}
        </div>
      </td>

      {/* Actions */}
      <td className="px-2 xl:px-4 py-2 xl:py-3 whitespace-nowrap">
        <div className="flex flex-col items-center space-y-1">
          {getStatusBadge()}
          
          {order.paid && order?.status === "pending" && (
            <button
              onClick={delivered}
              className="inline-flex items-center space-x-1 px-2 py-0.5 xl:py-1 bg-emerald-500 text-white text-[10px] xl:text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              <FiTruck size={10} />
              <span>Ship</span>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ManageOrderRow;
