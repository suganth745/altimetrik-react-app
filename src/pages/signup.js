import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import Login_Image from "../images/building.jpg";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { registerApi } from "../api/methods";
import AppInputText from "../components/input-text/index";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { responseToastMsg } from "../utils/response-message";

import {
  crispStyle,
  validateName,
  validateNameReplace,
  validatePassword,
} from "../utils/common";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(true);
  const [cpassword, setCPassword] = useState(true);
  const stateRef = useRef();

  const [register, setRegister] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    address: "",
    preferred_payment_method: "",
  });

  const [alreadyExist, setAlreadyExist] = useState();

  stateRef.current = register;

  const [validation, setValidation] = useState({
    user_name: false,
    valid_user_name: false,
    first_name: false,
    valid_first_name: false,
    last_name: false,
    valid_last_name: false,
    address: false,
    valid_address: false,
    password: false,
    valid_password: false,
    confirm_password: false,
    valid_confirm_password: false,
  });

  useEffect(() => {
    localStorage.removeItem("register_success");
  }, []);

  const paymentMethods = [
    { label: "Card", value: "card" },
    { label: "Cash", value: "cash" },
  ];

  const handleChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "first_name" || e.target.name === "last_name") {
        if (validateName(e.target.value)) {
          setRegister({
            ...register,
            [e.target.name]: validateNameReplace(e.target.value),
          });
          setValidation({ ...validation, [e.target.name]: false });
        }
      } else if (e.target.name === "email") {
        setRegister({ ...register, [e.target.name]: e.target.value.trim() });
        setValidation({ ...validation, [e.target.name]: false });
      } else {
        setRegister({ ...register, [e.target.name]: e.target.value });
        setValidation({ ...validation, [e.target.name]: false });
      }
    } else {
      setRegister({ ...register, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };

    if (!register.user_name) {
      c_validation = { ...c_validation, user_name: true };
    } else {
      if (validateName(register.user_name)) {
        c_validation = { ...c_validation, valid_user_name: false };
      } else {
        c_validation = { ...c_validation, valid_user_name: true };
      }
    }

    if (!register.first_name) {
      c_validation = { ...c_validation, first_name: true };
    } else {
      if (validateName(register.first_name)) {
        c_validation = { ...c_validation, valid_first_name: false };
      } else {
        c_validation = { ...c_validation, valid_first_name: true };
      }
    }

    if (!register.last_name) {
      c_validation = { ...c_validation, last_name: true };
    } else {
      if (validateName(register.last_name)) {
        c_validation = { ...c_validation, valid_last_name: false };
      } else {
        c_validation = { ...c_validation, valid_last_name: true };
      }
    }
    if (!register.address) {
      c_validation = { ...c_validation, address: true };
    } else {
      if (register.address) {
        c_validation = { ...c_validation, valid_address: false };
      } else {
        c_validation = { ...c_validation, valid_address: true };
      }
    }
    if (!register.password) {
      c_validation = { ...c_validation, password: true };
    } else {
      if (validatePassword(register.password)) {
        c_validation = { ...c_validation, valid_password: false };
      } else {
        c_validation = { ...c_validation, valid_password: true };
      }
    }
    if (!register.confirm_password) {
      c_validation = { ...c_validation, confirm_password: true };
    } else {
      if (validatePassword(register.confirm_password)) {
        c_validation = { ...c_validation, valid_confirm_password: false };
      } else {
        c_validation = { ...c_validation, valid_confirm_password: true };
      }
    }

    setValidation(c_validation);

    if (
      !c_validation.user_name &&
      !c_validation.first_name &&
      !c_validation.valid_first_name &&
      !c_validation.last_name &&
      !c_validation.valid_last_name &&
      !c_validation.address &&
      !c_validation.password &&
      !c_validation.valid_password &&
      !c_validation.confirm_password &&
      !c_validation.valid_confirm_password
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    console.log("🚀 ~ handleSignUp ~ checkValidation():", checkValidation());
    if (checkValidation()) {
      const { password, confirm_password, preferred_payment_method } = register;

      if (preferred_payment_method) {
        if (password === confirm_password) {
          try {
            setLoading(true);
            let apiInput = { ...register };
            const result = await registerApi(apiInput);
            if (result.status === 201) {
              responseToastMsg(result?.data?.response_code);
              navigate(`/?username=${register.user_name}`);
            }
          } catch (err) {
            setLoading(false);
            responseToastMsg(err?.data?.error);
            setAlreadyExist(register.user_name);
          }
          setLoading(false);
        } else {
          responseToastMsg("ER0XX");
        }
      } else {
        responseToastMsg("ER0XX1");
      }
    }
  };

  return (
    <div className="page_wrapper login_section register_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row rounded-circle">
              <div className="col-md-6 p-5 pt-3 pb-1 bg-light login_form">
                <div className="Auth-form-container">
                  <div className="login_head text-center">
                    <h3 className="mt-4">Register</h3>
                  </div>

                  <div className="Auth-form-content">
                    <div className="form-group mt-3">
                      <AppInputText
                        title={"User Name"}
                        name="user_name"
                        placeholder="User Name"
                        value={register.user_name}
                        required={validation.user_name}
                        onKeyPress={handleKeyPressEvent}
                        onChange={handleChangeEvent}
                      />
                      {validation.valid_user_name && (
                        <p className="error_text">
                          Please enter a valid user name
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-3">
                      <AppInputText
                        title={"First Name"}
                        name="first_name"
                        placeholder="First Name"
                        value={register.first_name}
                        required={validation.first_name}
                        onKeyPress={handleKeyPressEvent}
                        onChange={handleChangeEvent}
                      />
                      {validation.valid_first_name && (
                        <p className="error_text">
                          Please enter a valid first name
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-3">
                      <AppInputText
                        title={"Last Name"}
                        name="last_name"
                        placeholder="Last Name"
                        value={register.last_name}
                        required={validation.last_name}
                        onKeyPress={handleKeyPressEvent}
                        onChange={handleChangeEvent}
                      />
                      {validation.valid_last_name && (
                        <p className="error_text">
                          Please enter a valid last name
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-3">
                      <label className="input-title">
                        Preferred Payment Method
                      </label>{" "}
                      <Select
                        styles={crispStyle}
                        title={"Preferred Payment Method"}
                        name="preferred_payment_method"
                        placeholder="Preferred Payment Method"
                        options={paymentMethods}
                        value={paymentMethods.find(
                          (o) => o.value === register.preferred_payment_method
                        )}
                        onKeyPress={handleKeyPressEvent}
                        onChange={(data) =>
                          setRegister({
                            ...register,
                            preferred_payment_method: data.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label className="input-title">Address</label>{" "}
                      <Autocomplete
                        className="form-control"
                        apiKey={"AIzaSyCQ2sAiZO-qxFwRU-EFVcgPMibpPB7zbHA"}
                        onPlaceSelected={(place) => {
                          setRegister({
                            ...stateRef.current,
                            address: place.formatted_address,
                          });
                        }}
                      />
                      {validation.address && (
                        <p className="error_text">
                          Please enter a address address
                        </p>
                      )}
                    </div>

                    <div className="form-group mt-3 float-icon">
                      <AppInputText
                        title={"Password"}
                        placeholder="Password"
                        type={password ? "password" : "text"}
                        name="password"
                        required={validation.password}
                        value={register.password}
                        onKeyPress={handleKeyPressEvent}
                        onChange={handleChangeEvent}
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

                      {validation.valid_password && (
                        <p className="error_text">
                          Please enter a valid password. Your password should
                          have a minimum of 6 characters, and should include an
                          uppercase letter and a number.
                        </p>
                      )}
                    </div>

                    <div className="form-group mt-3 float-icon">
                      <AppInputText
                        title={"Confirm Password"}
                        placeholder="Confirm Password"
                        type={cpassword ? "password" : "text"}
                        name="confirm_password"
                        required={validation.confirm_password}
                        value={register.confirm_password}
                        onKeyPress={handleKeyPressEvent}
                        onChange={handleChangeEvent}
                      />

                      {!cpassword ? (
                        <FaEye
                          role="button"
                          onClick={() => setCPassword(!cpassword)}
                          className="eye"
                        />
                      ) : (
                        <FaEyeSlash
                          className="eye"
                          role="button"
                          onClick={() => setCPassword(!cpassword)}
                        />
                      )}

                      {validation.valid_confirm_password && (
                        <p className="error_text">
                          Please enter a valid password. Your password should
                          have a minimum of 6 characters, and should include an
                          uppercase letter and a number.
                        </p>
                      )}
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleSignUp}
                        className="btn btn-primary"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                    <p className="forgot-password text-center mt-4">
                      Already have a account?{" "}
                      <Link
                        to={`/${
                          alreadyExist ? `?username=${alreadyExist}` : ""
                        }`}
                      >
                        {" "}
                        Sign In{" "}
                      </Link>
                    </p>
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

export default SignUp;
