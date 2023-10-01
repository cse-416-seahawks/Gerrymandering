import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai'
import { SideBarOptions } from "./SidebarOptions";
import './css/Navbar.css'

function Navbar() {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => (setSidebar(!sidebar));

  return (
    <>
        <div className="navbar">
          <Link to='#' className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar}/>
          </Link>
         <h1>GerryCast</h1> 
        </div>
        <nav className={sidebar? "nav-menu active" : "nav-menu"}>
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
        </nav>
    </>
  );
}

export default Navbar;
