import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AntIcons from "react-icons/ai";
import { SideBarOptions } from "./SidebarOptions";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <h1>GerryCast</h1>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
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
      </div>
    </>
  );
}

export default Sidebar;
