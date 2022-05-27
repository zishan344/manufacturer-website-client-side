import React from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
const ManageOrderRow = ({ order, index, refetch }) => {
  // https://desolate-citadel-69075.herokuapp.com/order/628e4ac656dfeabd3a95bab8
  const delivered = () => {
    Swal.fire({
      title: "Are you sure want to delivered this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delivered it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://desolate-citadel-69075.herokuapp.com/order/${order._id}`,
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
  const deleteItem = () => {
    Swal.fire({
      title: "Are you sure delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://desolate-citadel-69075.herokuapp.com/booking/${order._id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            refetch();
          });
      }
    });
  };
  return (
    <tr>
      <th>
        <div className="flex justify-between gap-2 items-center">
          <label>{index + 1}</label>
          <span>
            <button onClick={deleteItem} className="btn btn-ghost">
              <AiFillDelete className="text-red-400 font-bold text-2xl cursor-pointer" />
            </button>
          </span>
        </div>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={order.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">
              {order?.product_name || order?.name}
            </div>
          </div>
        </div>
      </td>
      <td>
        {order.email}
        <br />
        {order?.number && (
          <span className="badge badge-ghost badge-sm">
            Phone: {order?.number}
          </span>
        )}
        <br />
        {order?.shipignAddress && (
          <span className="badge badge-ghost badge-sm">
            location: {order?.shipignAddress}
          </span>
        )}
      </td>
      <td>${order.price}</td>
      <td>{order.quantity}</td>
      <th>${order.totalPrice}</th>

      <th className="text-center">
        {order.totalPrice && !order.paid && (
          <button className="btn btn-error btn-xs mr-4">Unpaid</button>
        )}
        {order.paid && order?.status == "pending" && (
          <>
            <button className="btn btn-primary btn-xs mr-4">pending..</button>
            <button onClick={delivered} className="btn btn-primary btn-xs mr-4">
              stiffed
            </button>
          </>
        )}
        {order.paid && order?.status == "delivered" && (
          <button className="btn btn-primary btn-xs mr-4">delivered</button>
        )}
        {/* <button className="btn btn-error btn-xs mr-4">pending</button>
        <button className="btn btn-xs btn-primary">shift</button> */}
      </th>
    </tr>
  );
};

export default ManageOrderRow;
