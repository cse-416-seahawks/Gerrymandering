import React, { useState, useContext } from "react";
import { NevadaDistrictContext } from "../NevadaContext";
import "../App.css";
import StateMap from "../components/StateMap";
import Navbar from "../components/Navbar";
import {BrowserRouter as Router} from 'react-router-dom'
import TableData from "../components/TableData";
import DistrictInfoCard from "../components/DistrictInfoCard";
import { NevadaDistrictProvider } from "../NevadaContext";


function Distance() {
    return (
        <div className="Distance">
            <Navbar/>
        </div>
    )
}

export default Distance;