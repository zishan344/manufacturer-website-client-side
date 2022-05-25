import React from "react";

const MyOrderRow = ({ order, index, refetch }) => {
  const { _id } = order;
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

  return (
    <tr key={index}>
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
        <button onClick={deleteItem} class="btn btn-ghost btn-xs">
          delete
        </button>
        <button class="btn btn-ghost btn-xs">pay</button>
      </th>
    </tr>
  );
};

export default MyOrderRow;
