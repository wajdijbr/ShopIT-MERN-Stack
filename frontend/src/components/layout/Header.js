import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../../App.css";
import Search from "./Search";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // console.log(user, Object.keys(user).length);
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged Out Successfully");
  };
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="./images/shopit_logo.png" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Routes>
            <Route
              path="/*"
              Component={({ history }) => <Search history={history} />}
            />
          </Routes>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" stle={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Link>

          {user === undefined ||
          user === null ||
          Object.keys(user).length === 0 ? (
            <Link to="/login" className="btn ml-4" id="login_btn">
              {" "}
              Login{" "}
            </Link>
          ) : (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{user && user.name}</span>

                <figure className="avatar avatar-nav">
                  <img
                    // src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
