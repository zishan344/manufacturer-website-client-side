import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import ManageProductRow from "./ManageProductRow";

const ManageProducts = () => {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("order", () =>
    fetch(`https://desolate-citadel-69075.herokuapp.com/products`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>price</th>
            <th className="text-center">minimum order</th>
            <th>available Product</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ManageProductRow
              key={index}
              product={product}
              index={index}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
