import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavbarOptions } from "./NavbarOptions";
import "../css/Navbar.css";
import { padding } from "@mui/system";
import seahawks from "../images/Seattle-Seahawks-Logo.png";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <div className="navbar-title">
          <h1>GerryCast</h1>
          <img id="seahawks-logo" src={seahawks} alt="Logo" />
        </div>
        {/* <Link to='#' className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar}/>
          </Link> */}
        <div id="space-between" />
        <ul className="navbar-options">
          {NavbarOptions.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} className="icon">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* <nav className={sidebar? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle nav-text" onClick={showSidebar}>
              <Link to="#">
                <AiIcons.AiOutlineClose/>
              </Link>

            </li>
            {SideBarOptions.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className="icon">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav> */}
      <hr />
    </>
  );
}

export default Navbar;
