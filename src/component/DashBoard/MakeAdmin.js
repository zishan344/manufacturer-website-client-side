import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import AdminRow from "./AdminRow";
const MakeAdmin = () => {
  const navigate = useNavigate();
  const {
    data: allUser,
    isLoading,
    error,
    refetch,
  } = useQuery("order", () =>
    fetch(`https://desolate-citadel-69075.herokuapp.com/allUser`, {
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
  if (allUser.length === 0) {
    return <Loading />;
  }
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>User</th>
            <th>Add Admin</th>
            <th>Remove admin</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user, index) => (
            <AdminRow key={index} user={user} index={index} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
