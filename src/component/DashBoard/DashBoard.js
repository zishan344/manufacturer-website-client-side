import React from "react";
import { NavLink, Outlet } from "react-router-dom";

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
        <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content gap-4">
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink to="/dashboard">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myOrder">My Order</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addReview">Add Review</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageAllOrder">Manage All Order</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addProduct">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/makeAdmin">Make Admin</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageProduct">Manage Product</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
