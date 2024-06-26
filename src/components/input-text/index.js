import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import "./style.scss";

const AppInputText = ({
  tooltip,
  title,
  name = "",
  type = "text",
  className = "",
  required = false,
  requiredBottom = false,
  placeholder = " ",
  onChange = () => {},
  value,
  isPop = false,
  popText,
  ...props
}) => {
  const x = Math.floor(Math.random() * 100 + 1);

  const popover = (
    <Popover>
      <Popover.Body>
        <p className="password-terms">{popText}</p>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <label htmlFor={`floatingInput${x}`} className="input-title">
        {title} {tooltip && tooltip}
      </label>{" "}
      {!requiredBottom && required && (
        <small className="text-danger font-10">(Required)</small>
      )}
      {isPop ? (
        <OverlayTrigger trigger="focus" placement="top" overlay={popover}>
          <input
            {...props}
            id={`floatingInput${x}`}
            type={type}
            name={name}
            className={`form-control ${
              required && "border-danger"
            }  ${className}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            autoComplete="off"
          />
        </OverlayTrigger>
      ) : (
        <input
          {...props}
          id={`floatingInput${x}`}
          type={type}
          name={name}
          className={`form-control ${
            required && "border-danger"
          }  ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          autoComplete="off"
        />
      )}
      {requiredBottom && (
        <small className="text-danger font-10">(Required)</small>
      )}
    </>
  );
};

export default AppInputText;
