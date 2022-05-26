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
        <button class="btn btn-primary btn-xs mr-4">Remove user</button>
      </td>
    </tr>
  );
};

export default AdminRow;
