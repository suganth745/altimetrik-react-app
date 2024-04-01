// import { CardElement } from "@stripe/react-stripe-js";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";

export const validateName = (name) => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  return re.test(name);
};

export const validateNameReplace = (input) =>
  input
    .replace("  ", " ")
    .replace("--", "-")
    .replace(",,", ",")
    .replace("..", ".")
    .replace("''", "'")
    .replace("-,", "-")
    .replace("-.", "-")
    .replace("-'", "-")
    .replace(",-", ",")
    .replace(",.", ",")
    .replace(",'", ",")
    .replace(".-", ".")
    .replace(".,", ".")
    .replace(".'", ".")
    .replace("'-", "'")
    .replace("',", "'")
    .replace("'.", "'");

export const validatePassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  const sp_re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return re.test(password) || sp_re.test(password);
};

export const passwordLength = 6;

export const crispStyle = {
  container: (prop) => ({
    ...prop,
  }),
  control: (prop, { isFocused, isDisabled }) => ({
    ...prop,
    alignItems: "flex-start",
    borderRadius: ".375rem",
    minHeight: "40px",
    borderColor: isFocused ? "rgba(255, 193, 7, 0.4)" : "#ced4da",
    boxShadow: isFocused
      ? "0 0 0 0.25rem rgb(246 151 10 / 9%)"
      : "0 !important",
    fontColor: "#212529",
    backgroundColor: isDisabled ? "#e9ecef" : "#fff",
    "&:hover": {
      // borderColor: "#ddd",
    },
    "&:focus": {
      // borderColor: "#222",
    },
  }),
  input: (prop) => ({
    ...prop,
    margin: 0,
    padding: "0.2rem 0.2rem 0.08rem 0.2rem",
    fontSize: "1rem",
  }),
  singleValue: (prop) => ({
    ...prop,
    margin: 0,
    padding: "0.2rem 0.2rem 0.08rem 0.2rem",
    fontSize: "1rem",
    color: "#212529",
  }),
  indicatorsContainer: (prop) => ({
    ...prop,
    margin: 0,
    padding: 0,
  }),

  dropdownIndicator: (prop) => ({
    ...prop,
  }),
  indicatorSeparator: (prop) => ({
    ...prop,
    backgroundColor: "#dee2e6",
  }),
  clearIndicator: (prop) => ({
    ...prop,
  }),
  valueContainer: (prop, { isMulti }) => ({
    ...prop,
    minHeight: "40px",
    padding: isMulti ? "8px" : "8px",
  }),
  option: (prop, { isSelected, isFocused }) => ({
    ...prop,
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: isSelected
      ? "rgb(255 159 0)"
      : isFocused && "rgba(255, 193, 7, 0.4)",
    "&:hover": {
      backgroundColor: isSelected ? "rgb(255 159 0)" : "rgba(255, 193, 7, 0.4)",
    },
  }),
  noOptionsMessage: (prop) => ({
    ...prop,
    fontSize: "1rem",
  }),
  placeholder: (prop) => ({
    ...prop,
    fontSize: "1rem",
    paddingTop: "0.3rem",
  }),
  menu: (prop) => ({
    ...prop,
    borderRadius: "3px",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999, top: base.top - 5 }),
};

export const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});
