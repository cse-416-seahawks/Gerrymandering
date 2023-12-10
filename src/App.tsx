import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/base/Home";
import DistanceMeasures from "./components/base/DistanceMeasures";
import StateSelect from "./components/base/StateSelect";
import { GlobalProvider } from "./globalContext";
import About from "./components/base/About";
import { ThemeProvider, createTheme } from "@mui/material";
import { purple, green } from "@mui/material/colors";
import PlanComparison from "./components/base/PlanComparision";

function App() {
  const usMapCoordinates: Array<number> = [34.5, -95.5];
  const usMapZoom: number = 5;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#00388c",
      },
    },
  });
  
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="/cluster-analysis" element={<Home />} />
          <Route
            path="/"
            element={
              <StateSelect
                centerCoordinates={usMapCoordinates}
                zoom={usMapZoom}
              />
            }
          />
          <Route path="/distances" element={<DistanceMeasures />} />
          <Route path="/plan-comparison" element={<PlanComparison/>}/>
        </Routes>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
