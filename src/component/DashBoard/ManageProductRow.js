import React from "react";

const ManageProductRow = ({ product, index, refetch }) => {
  const { _id } = product;
  const deleteItem = () => {
    const confirm = window.confirm("are you sure delete this item");
    if (!confirm) {
      return;
    }
    fetch(`http://localhost:5000/product/${_id}`, {
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
              <img src={product.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div class="font-bold">{product.name}</div>
          </div>
        </div>
      </td>
      <td>${product.price}</td>
      <td className="text-center">{product.minimum_order}</td>
      <th>{product.product_quantity}</th>
      <th>
        <button onClick={deleteItem} class="btn btn-error btn-xs mr-4">
          delete
        </button>
      </th>
    </tr>
  );
};

export default ManageProductRow;
