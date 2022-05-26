import React from "react";

const ManageOrderRow = ({ order, index, refetch }) => {
  // https://desolate-citadel-69075.herokuapp.com/order/628e4ac656dfeabd3a95bab8
  const delivered = () => {
    const confirm = window.confirm(
      "Are you sure you want to delivered this product"
    );
    if (!confirm) {
      return;
    }
    fetch(`https://desolate-citadel-69075.herokuapp.com/order/${order._id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        console.log(data);
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
            <div class="font-bold">{order?.product_name || order?.name}</div>
          </div>
        </div>
      </td>
      <td>${order.price}</td>
      <td>{order.quantity}</td>
      <th>${order.totalPrice}</th>
      <th className="text-center">{order.email}</th>

      <th className="text-center">
        {order.totalPrice && !order.paid && (
          <button class="btn btn-error btn-xs mr-4">Unpaid</button>
        )}
        {order.paid && order?.status == "pending" && (
          <>
            <button class="btn btn-primary btn-xs mr-4">pending..</button>
            <button onClick={delivered} class="btn btn-primary btn-xs mr-4">
              stiffed
            </button>
          </>
        )}
        {order.paid && order?.status == "delivered" && (
          <button class="btn btn-primary btn-xs mr-4">delivered</button>
        )}
        {/* <button class="btn btn-error btn-xs mr-4">pending</button>
        <button class="btn btn-xs btn-primary">shift</button> */}
      </th>
    </tr>
  );
};

export default ManageOrderRow;
