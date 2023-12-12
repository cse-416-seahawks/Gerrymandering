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
import { CacheProvider } from "./Cache";

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
    <CacheProvider>
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/"
              element={
                <StateSelect
                  centerCoordinates={usMapCoordinates}
                  zoom={usMapZoom}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/cluster-analysis/state/:stateName/"
              element={<Home />}
            />
            <Route
              path="/cluster-analysis/state/:stateName/ensemble/:ensembleId/"
              element={<Home />}
            />
            <Route
              path="/cluster-analysis/state/:stateName/ensemble/:ensembleId/cluster/:clusterId"
              element={<Home />}
            />
            <Route
              path="/distances/state/:stateName/ensemble/:ensembleId/"
              element={<DistanceMeasures />}
            />
            <Route
              path="/plan-comparison/state/:stateName/district-plan/:planId"
              element={<PlanComparison />}
            />
          </Routes>
        </ThemeProvider>
      </GlobalProvider>
    </CacheProvider>
  );
}

export default App;
