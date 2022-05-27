import React from "react";

const AdminRow = ({ index, user, refetch }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    const confirm = window.confirm("Are you sure");
    if (!confirm) {
      return;
    }
    fetch(`https://desolate-citadel-69075.herokuapp.com/users/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };
  const removeAdmin = () => {
    const confirm = window.confirm("Are you sure");
    if (!confirm) {
      return;
    }
    fetch(
      `https://desolate-citadel-69075.herokuapp.com/users/removeAdmin/${email}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };
  return (
    <tr>
      <td>
        <label>{index + 1}</label>
      </td>
      <td>{user.email}</td>
      <td>
        {role !== "admin" && (
          <button onClick={makeAdmin} class="btn btn-primary btn-xs mr-4">
            Make Admin
          </button>
        )}
      </td>
      <td>
        {role === "admin" ? (
          <button onClick={removeAdmin} class="btn btn-primary btn-xs mr-4">
            Remove Admin
          </button>
        ) : (
          <button disabled class="btn btn-disabled  btn-xs mr-4">
            User
          </button>
        )}
      </td>
    </tr>
  );
};

export default AdminRow;
