import React from "react";
import { Link } from "react-router-dom";

const MyOrderRow = ({ order, index, refetch }) => {
  const { _id } = order;

  const deleteItem = () => {
    const confirm = window.confirm("are you sure delete this item");
    if (!confirm) {
      return;
    }
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
  };

  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img src={order.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div class="font-bold">{order?.name || order?.product_name}</div>
          </div>
        </div>
      </td>
      <td>${order.price}</td>
      <td>{order.quantity}</td>
      <th>${order.totalPrice}</th>
      <th>
        {order.totalPrice && !order.paid && (
          <>
            <button onClick={deleteItem} class="btn btn-error btn-xs mr-4">
              delete
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
