import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyOrderRow = ({ order, index, refetch }) => {
  const { _id } = order;

  const deleteItem = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://desolate-citadel-69075.herokuapp.com/booking/${_id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            refetch();
            console.log(result);
          });
      }
    });
  };

  return (
    <tr>
      <th>
        <label>{index + 1}</label>
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
              {order?.name || order?.product_name}
            </div>
          </div>
        </div>
      </td>
      <td>${order.price}</td>
      <td>{order.quantity}</td>
      <th>${order.totalPrice}</th>
      <th>
        {order.totalPrice && !order.paid && (
          <>
            <button onClick={deleteItem} className="btn btn-error btn-xs mr-4">
              cancel
            </button>
            <Link to={`/dashboard/payment/${order._id}`}>
              <button className="btn btn-xs btn-success">pay</button>
            </Link>
          </>
        )}
        {order.totalPrice && order.paid && (
          <div>
            <p>
              <span className="text-success">Paid</span>
            </p>
            <p>
              Transaction id:{" "}
              <span className="text-success">{order.transactionId}</span>
            </p>
          </div>
        )}
      </th>
    </tr>
  );
};

export default MyOrderRow;
