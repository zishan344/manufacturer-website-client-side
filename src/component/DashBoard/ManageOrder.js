import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import UseLoading from "../hooks/UseLoading";
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
    fetch(`https://desolate-citadel-69075.herokuapp.com/booking`, {
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
  if (orders.length === 0) {
    return <UseLoading order={"All Order is completed, Wait for order"} />;
  }
  return (
    <div class="overflow-x-auto w-full ">
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Delivery Information</th>
            <th>Price</th>
            <th>quantity</th>
            <th>Total Price</th>
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
