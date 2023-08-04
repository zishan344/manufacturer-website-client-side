import React from "react";
import Swal from "sweetalert2";
const ManageProductRow = ({ product, index, refetch }) => {
  const { _id } = product;
  const deleteItem = () => {
    Swal.fire({
      title: "Are you sure delete this item?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://autovantis.onrender.com/product/${_id}`, {
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
              <img src={product.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{product.name}</div>
          </div>
        </div>
      </td>
      <td>${product.price}</td>
      <td className="text-center">{product.minimum_order}</td>
      <th>{product.product_quantity}</th>
      <th>
        <button onClick={deleteItem} className="btn btn-error btn-xs mr-4">
          delete
        </button>
      </th>
    </tr>
  );
};

export default ManageProductRow;
