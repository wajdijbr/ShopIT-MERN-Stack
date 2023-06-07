import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../MetaData";

import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { loadUser } from "../../actions/userActions";
import { UserContext } from "../../App";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Fragment>
      {user === null || user === undefined || Object.keys(user).length === 0 ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />

          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  // href={me.avatar.url && me.avatar}
                  alt={user.user.name}
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.user.name}</p>

              <h4>Email Address</h4>
              <p>{user.user.email}</p>
              <h4>Joined On</h4>
              <p>{String(user.user.createdAt).substring(0, 10)}</p>
              {user.user.role === "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
