import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useLocation } from "react-router-dom";
import auth from "../../firebase.init";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const location = useLocation();
  const menuItem = (
    <>
      {user && (
        <>
          <li className="mr-2">
            <NavLink to="/dashboard">DashBoard</NavLink>
          </li>
          <li className="mr-2">
            <NavLink to="/portfolio">Portfolio</NavLink>
          </li>
        </>
      )}
      <li className="mr-2">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      {!user && (
        <li className="mr-2">
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      {user && (
        <li className="mr-2">
          <button
            onClick={() => {
              signOut(auth);
              localStorage.removeItem("accessToken");
            }}
            className="btn btn-ghost"
          >
            Log out
          </button>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 container mx-auto justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabindex="0" className="btn btn-ghost lg:hidden">
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
          <ul
            tabindex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItem}
          </ul>
        </div>
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          Autovantis
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex navbar-end">
        <ul className="menu menu-horizontal p-0">{menuItem}</ul>
      </div>
    </div>
  );
};

export default Navbar;
