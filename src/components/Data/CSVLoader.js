import React from 'react';
import csvtojson from 'csvtojson';
function CSVLoader({ onCSVDataChange }) {
  const convertCSVToJson = async (csvText) => {
    try {
      const jsonArray = await csvtojson().fromString(csvText);
      if (typeof onCSVDataChange === 'function') {
        onCSVDataChange(jsonArray);
      }
    } catch (error) {
      console.error('Error converting CSV to JSON', error);
    }
  };

  return { convertCSVToJson };
}

export default CSVLoader;
