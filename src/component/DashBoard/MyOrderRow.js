import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MyOrderRow = ({ order, index, refetch }) => {
  const { _id } = order;
  const navigate = useNavigate();
  const deleteItem = () => {
    const confirm = window.confirm("are you sure delete this item");
    if (!confirm) {
      return;
    }
    fetch(`http://localhost:5000/booking/${_id}`, {
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
  //   const payment = (id) => {
  //     navigate(`/dashboard/payment/${id}`);
  //   };
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
            <div class="font-bold">{order.name}</div>
          </div>
        </div>
      </td>
      <td>${order.price}</td>
      <td>{order.quantity}</td>
      <th>${order.totalPrice}</th>
      <th>
        <button onClick={deleteItem} class="btn btn-error btn-xs mr-4">
          delete
        </button>
        <Link to={`/dashboard/payment/${order._id}`}>
          <button className="btn btn-xs btn-primary">pay</button>
        </Link>
      </th>
    </tr>
  );
};

export default MyOrderRow;
