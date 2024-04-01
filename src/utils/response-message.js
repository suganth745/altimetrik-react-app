import cogoToast from "cogo-toast";

const responseMsg = [
  {
    code: "OK003",
    message: "Logged in successfully",
    type: "success",
  },
  {
    code: "OK004",
    message: "Registration successful",
    type: "success",
  },

  {
    code: "ER003",
    message: "Incorrect credentials",
    type: "error",
  },

  {
    code: "ERR350",
    message: "Username already exist, please signin to continue",
    type: "warn",
  },
  {
    code: "ER500",
    message: "Something went wrong",
    type: "error",
  },
  {
    code: "ER0XX",
    message: "Both Password and Confirm Password should be same",
    type: "error",
  },
  {
    code: "ER0XX1",
    message: "Preferred Payment Method is required",
    type: "error",
  },
];

export const responseToastMsg = (err_code) => {
  console.log("🚀 ~ responseToastMsg ~ err_code:", err_code);
  const info = responseMsg.find((o) => o.code === err_code);
  console.log("🚀 ~ responseToastMsg ~ info:", info);
  cogoToast[info.type](info.message);
};
