import React from "react";

const ManageOrderRow = ({ order, index }) => {
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
      <th className="text-center">{order.productId}</th>

      <th className="text-center">
        <button class="btn btn-error btn-xs mr-4">pending</button>
        <button class="btn btn-xs btn-primary">shift</button>
      </th>
    </tr>
  );
};

export default ManageOrderRow;
