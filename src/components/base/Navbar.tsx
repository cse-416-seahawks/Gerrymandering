import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as VscIcons from "react-icons/vsc";
import "../css/Navbar.css";
import { GlobalContext } from "../../globalContext";
import seahawks from "../images/Seattle-Seahawks-Logo.png";

function Navbar() {
  const { state, dispatch } = useContext(GlobalContext);
  let clusterAnalysis = state[state.length - 1].clusterAnalysis;
  const NavbarOptions = [
    {
      title: "Cluster Analysis",
      path: "/",
      icon: <VscIcons.VscGraphScatter />,
      cName: "nav-text",
      selected: clusterAnalysis,
      onClick: () =>
        dispatch({ type: "PAGE_CHANGE", payload: !clusterAnalysis }),
    },
    {
      title: "Distance Measures",
      path: "/distances",
      icon: <VscIcons.VscMap />,
      cName: "nav-text",
      selected: !clusterAnalysis,
      onClick: () =>
        dispatch({ type: "PAGE_CHANGE", payload: !clusterAnalysis }),
    },
  ];

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
              <li key={index} onClick={item.onClick} className={item.cName}>
                <Link to={item.path} className="icon">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <hr />
    </>
  );
}

export default Navbar;
