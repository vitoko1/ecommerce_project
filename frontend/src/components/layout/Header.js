import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import Search from "./Search";
import "../../App.css";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart)
  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully!");
  };

  return (
    <Fragment>
      <nav className="navbar row">
      <div className="row align-items-center">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="/images/logo2.png"
                alt="logo"
                className="img-fluid col-md-4 px-0"
              />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>


        <div className="nav-item col-12 col-md-3 mt-4 mt-md-0 my-1 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="col ml-4 mx-2 my-1">Cart</span>
                        <span className="col ml-4 mx-2 my-1" id="cart_count">{cartItems.length}</span>
                    </Link>

          {user ? (
            <div className="navbar-nav ml-4 drpdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle img-fluid col-md-4 px-0"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu btn-sm"
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
          ) : (
            !loading && (
              <Link to="/login" className="col btn ml-4 btn-sm mx-2 my-1" id="login_btn">
                {" "}
                Login{" "}
              </Link>
            )
          )}
        </div>
      </div>
      </nav>
    </Fragment>
  );
};

export default Header;
