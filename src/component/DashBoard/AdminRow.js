import React from "react";
import { FiShield, FiUserCheck, FiUserMinus, FiUserPlus } from "react-icons/fi";
import Swal from "sweetalert2";

const AdminRow = ({ index, user, refetch, mobile = false }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    Swal.fire({
      title: "Make Administrator?",
      text: `Grant admin privileges to ${email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, make admin",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://autovantis.onrender.com/users/admin/${email}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "User has been made an administrator.",
              icon: "success",
              confirmButtonColor: "#10b981"
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to make user an administrator.",
              icon: "error",
              confirmButtonColor: "#ef4444"
            });
          });
      }
    });
  };

  const removeAdmin = () => {
    Swal.fire({
      title: "Remove Administrator?",
      text: `Remove admin privileges from ${email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove admin",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://autovantis.onrender.com/users/removeAdmin/${email}`, {
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
              text: "Administrator privileges have been removed.",
              icon: "success",
              confirmButtonColor: "#10b981"
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove administrator privileges.",
              icon: "error",
              confirmButtonColor: "#ef4444"
            });
          });
      }
    });
  };
  // Mobile layout
  if (mobile) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {role === "admin" ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <FiShield className="w-3 h-3 mr-1" />
              Administrator
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <FiUserCheck className="w-3 h-3 mr-1" />
              User
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {role !== "admin" ? (
            <button
              onClick={makeAdmin}
              className="inline-flex items-center px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-md hover:bg-emerald-700 transition-colors"
            >
              <FiUserPlus className="w-3 h-3 mr-1" />
              Make Admin
            </button>
          ) : (
            <button
              onClick={removeAdmin}
              className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              <FiUserMinus className="w-3 h-3 mr-1" />
              Remove Admin
            </button>
          )}
        </div>
      </div>
    );
  }

  // Desktop table row
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {role === "admin" ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <FiShield className="w-3 h-3 mr-1" />
            Administrator
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FiUserCheck className="w-3 h-3 mr-1" />
            User
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {role !== "admin" ? (
          <button
            onClick={makeAdmin}
            className="inline-flex items-center px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <FiUserPlus className="w-4 h-4 mr-2" />
            Make Admin
          </button>
        ) : (
          <button
            onClick={removeAdmin}
            className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <FiUserMinus className="w-4 h-4 mr-2" />
            Remove Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default AdminRow;
