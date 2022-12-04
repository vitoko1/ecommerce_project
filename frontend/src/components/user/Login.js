import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate , useLocation} from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

const Login = ({ history }) => {
  console.log("Longin Frontend....");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const location= useLocation();

  const redirect = location.search ? location.search.split('=')[1] : ''

  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
console.log("Redirect "+redirect)
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    console.log("submitHandler....", email, password);
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <div className="container row wrapper align-items-center">
            <div className="col-7 col-lg-5">
              <form className="shadow-lg justify-content-md-center" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="row align-items-center justify-content-md-center">
                <Link to="/password/forgot" className="col-sm-3 my-1 px-1 mx-2 float-right">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="col-sm-3 my-1 btn btn-primary px-1 mx-2"
                >
                  LOGIN
                </button>

                <Link to="/register" className="col-sm-3 my-1 px-1 mx-2 float-right">
                  New User?
                </Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
