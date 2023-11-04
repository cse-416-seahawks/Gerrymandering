
const geometriyCollection = require("./Nevada.json");

const fs = require("fs")

function convertGeometryCollectionToFeatureCollection(geometryCollection) {
    const features = geometryCollection.geometries.map((geometry, index) => {
      const dummyProperties = {
        name: `Feature ${index}`,
        // Add more dummy properties as needed
      };
  
      return {
        type: "Feature",
        properties: dummyProperties,
        geometry: geometry,
      };
    });
  
    return {
      type: "FeatureCollection",
      features: features,
    };
  }

const outputFileName = 'NevadaFeatures.json';
fs.writeFileSync(outputFileName, JSON.stringify(convertGeometryCollectionToFeatureCollection(geometriyCollection), null, 2));
