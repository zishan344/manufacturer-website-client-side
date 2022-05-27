import React from "react";
import Swal from "sweetalert2";
const AdminRow = ({ index, user, refetch }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    Swal.fire({
      title: "Are you sure make this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://desolate-citadel-69075.herokuapp.com/users/admin/${email}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            refetch();
          });
      }
    });
  };
  const removeAdmin = () => {
    Swal.fire({
      title: "Are you sure Remove This Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://desolate-citadel-69075.herokuapp.com/users/removeAdmin/${email}`,
          {
            method: "PATCH",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            refetch();
          });
      }
    });
  };
  return (
    <tr>
      <td>
        <label>{index + 1}</label>
      </td>
      <td>{user.email}</td>
      <td>
        {role !== "admin" && (
          <button onClick={makeAdmin} className="btn btn-primary btn-xs mr-4">
            Make Admin
          </button>
        )}
      </td>
      <td>
        {role === "admin" ? (
          <button onClick={removeAdmin} className="btn btn-primary btn-xs mr-4">
            Remove Admin
          </button>
        ) : (
          <button disabled className="btn btn-disabled  btn-xs mr-4">
            User
          </button>
        )}
      </td>
    </tr>
  );
};

export default AdminRow;
