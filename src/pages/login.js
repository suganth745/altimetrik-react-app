import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Login_Image from "../images/building.jpg";
import AppInputText from "../components/input-text/index";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useQuery } from "../hooks/url-params";
import { getCookies } from "../utils/cookies";
import { passwordLength } from "../utils/common";

import {
  user_login_reset_thunk,
  user_login_thunk,
} from "../redux/thunk/user-thunk";

const Login = () => {
  const location = useLocation();
  const query = useQuery(location.search);
  const _user_name = query.get("username");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const history = useNavigate();

  const redirect = query.get("redirect");

  const [password, setPassword] = useState(true);

  const [login, setLogin] = useState({
    user_name: _user_name,
    password: "",
  });

  const [validation, setValidation] = useState({
    user_name: false,
    valid_user_name: false,
    password: false,
    valid_password: false,
    captcha: false,
  });

  useEffect(() => {
    if (!(user.login && getCookies())) {
      dispatch(user_login_reset_thunk());
    }
  }, []);

  useEffect(() => {
    if (user.login && getCookies()) {
      if (redirect) {
        window.open(redirect, "_self");
      } else {
        if (location.state?.from) {
          history(location.state?.from.pathname);
        } else {
          history(`/userDetails`, "_self");
        }
      }
    }
  }, [user, history, location.state?.from, redirect]);

  const handleLogin = () => {
    if (checkValidation()) {
      dispatch(user_login_thunk(login));
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };

    if (!login.user_name) {
      c_validation = { ...c_validation, user_name: true };
    } else {
      if (login.user_name) {
        c_validation = { ...c_validation, valid_user_name: false };
      } else {
        c_validation = { ...c_validation, valid_user_name: true };
      }
    }

    if (!login.password) {
      c_validation = { ...c_validation, password: true };
    } else {
      if (login.password.length >= passwordLength) {
        c_validation = { ...c_validation, valid_password: false };
      } else {
        c_validation = { ...c_validation, valid_password: true };
      }
    }

    setValidation(c_validation);
    if (
      !c_validation.user_name &&
      !c_validation.password &&
      !c_validation.valid_user_name &&
      !c_validation.valid_password
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeEvent = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value.trim() });
    if (e.target.value) {
      setValidation({ ...validation, [e.target.name]: false });
    } else {
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="page_wrapper login_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row rounded-circle">
              <div className="col-md-6 p-5 bg-light login_form">
                <div className="Auth-form-container">
                  <div className="login_head text-center">
                    <h3 className="mt-4">Sign In</h3>
                  </div>

                  <div className="Auth-form-content">
                    <>
                      <div className="form-group mt-3">
                        <AppInputText
                          title={"User Name"}
                          required={validation.user_name}
                          name="user_name"
                          onChange={handleChangeEvent}
                          onKeyPress={handleKeyPressEvent}
                          value={login.user_name}
                        />
                      </div>
                      {validation.valid_user_name && (
                        <p className="error_text">
                          Please enter a valid user name address
                        </p>
                      )}
                      <div className="form-group mt-3 float-icon">
                        <AppInputText
                          title={"Password"}
                          required={validation.password}
                          type={password ? "password" : "text"}
                          name="password"
                          onChange={handleChangeEvent}
                          value={login.password}
                          onKeyPress={handleKeyPressEvent}
                        />
                        {!password ? (
                          <FaEye
                            role="button"
                            onClick={() => setPassword(!password)}
                            className="eye"
                          />
                        ) : (
                          <FaEyeSlash
                            className="eye"
                            role="button"
                            onClick={() => setPassword(!password)}
                          />
                        )}
                      </div>
                      {validation.valid_password && (
                        <p className="error_text">Password not long enough</p>
                      )}

                      <div className="d-grid gap-2 mt-4">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleLogin}
                          disabled={user.loading}
                        >
                          {user.loading ? "Loading..." : "Sign In"}
                        </button>
                      </div>

                      <p className="forgot-password text-center mt-1">
                        Don't have an account?{" "}
                        <Link to="/signup"> Sign Up </Link>
                      </p>
                    </>
                  </div>
                </div>
              </div>
              <div className="col-md-6 p-0  login_image">
                <img src={Login_Image} alt="Building" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
