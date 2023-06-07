import "./App.css";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { useEffect, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import { Register } from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/Profile";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
export const UserContext = createContext(null);

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!!token) dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/search/:keyword" Component={Home} />
          <Route exact path="/product/:id" Component={<ProductDetails />} />

          {isAuthenticated ? (
            <>
              <Route exact path="/me" Component={Profile} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route exact path="/login" Component={Login} />
              <Route exact path="/register" Component={Register} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
