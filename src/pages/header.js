import React from "react";
import "./style.scss";
import Dropdown from "react-bootstrap/Dropdown";
import Author from "../images/profile_2.png";
import { FaBell, FaCog, FaSignOutAlt, FaUser, FaWallet } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="header_wrapper d-flex align-items-center justify-content-end">
        <div className="notification mr-2"></div>
        <Dropdown className="acc_dropdown">
          <Dropdown.Toggle
            variant="success"
            id="profile_menu"
            className="act_head"
          >
            <span className="act_img">
              <img
                src={
                  user?.data?.customer_image?.url
                    ? user?.data?.customer_image?.url
                    : Author
                }
                alt="Author"
                width={80}
              />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/signout">
              <FaSignOutAlt /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}
export default Header;
