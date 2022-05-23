import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        {/* <!-- Page content here --> */}
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/dashboard">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/myOrder">My Order</Link>
          </li>
          <li>
            <Link to="/dashboard/addReview">Add Review</Link>
          </li>
          <li>
            <Link to="/dashboard/manageAllOrder">Manage All Order</Link>
          </li>
          <li>
            <Link to="/dashboard/addProduct">Add Product</Link>
          </li>
          <li>
            <Link to="/dashboard/makeAdmin">Make Admin</Link>
          </li>
          <li>
            <Link to="/dashboard/manageProduct">Manage Product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
