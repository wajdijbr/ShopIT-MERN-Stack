import React, { Fragment, useContext } from "react";
import { Route, redirect, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../user/Profile";
import { UserContext } from "../../App";

const ProtectedRoute = ({ Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      Component={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
