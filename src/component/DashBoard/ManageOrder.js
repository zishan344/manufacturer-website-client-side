import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import ManageOrderRow from "./ManageOrderRow";

const ManageOrder = () => {
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("order", () =>
    fetch(`http://localhost:5000/booking`, {
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
            <th>quantity</th>
            <th>Total</th>
            <th className="text-center">Product Id</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <ManageOrderRow
              key={index}
              order={order}
              index={index}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
