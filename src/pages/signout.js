import React, { useEffect } from "react";
import { user_login_reset_thunk } from "../redux/thunk/user-thunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(user_login_reset_thunk());
    navigate("/");
  }, []);
  return <>Signing Out</>;
};

export default SignOut;
