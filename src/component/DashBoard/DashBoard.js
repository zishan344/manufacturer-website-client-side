import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../hooks/useAdmin";
const DashBoard = () => {
  const [user, loading, error] = useAuthState(auth);

  const [admin] = useAdmin(user);
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* <!-- Page content here --> */}
        <div className="flex justify-end">
          <label for="my-drawer-2" className="z-10 btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>

        <Outlet />
      </div>
      <div className="drawer-side">
        <label for="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content gap-4">
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink to="/dashboard">My Profile</NavLink>
          </li>
          {!admin && (
            <>
              <li>
                <NavLink to="/dashboard/myOrder">My Order</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addReview">Add Review</NavLink>
              </li>
            </>
          )}

          {admin && (
            <>
              <li>
                <NavLink to="/dashboard/manageAllOrder">
                  Manage All Order
                </NavLink>
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
