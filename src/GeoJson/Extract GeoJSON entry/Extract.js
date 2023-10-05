const fs = require('fs');

const geoJsonData = require('./Virginia.json');

if (geoJsonData && geoJsonData.features) {
  const consolidatedFeatures = geoJsonData.features.map((feature) => feature/*.properties*/);

  const outputFileName = 'VirginiaFeatures.json';
  fs.writeFileSync(outputFileName, JSON.stringify(consolidatedFeatures, null, 2));

  console.log(`Consolidated features extracted to ${outputFileName}`);
} else {
  console.error('Invalid GeoJSON format');
}