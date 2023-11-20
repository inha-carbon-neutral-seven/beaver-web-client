import React from 'react';
import csvtojson from 'csvtojson';
function CSVLoader({ onCSVDataChange, onFileChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (typeof onFileChange === 'function') {
      onFileChange(file);
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const csvText = e.target.result;

      try {
        const jsonArray = await csvtojson().fromString(csvText);
        if (typeof onCSVDataChange === 'function') {
          onCSVDataChange(file, jsonArray);
        }
      } catch (error) {
        console.error('Error converting CSV to JSON', error);
      }
    };

    reader.readAsText(file, 'cp949');
  };

  return (
    <div className="flex flex-col justify-center">
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
      <label htmlFor="fileInput">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => document.getElementById('fileInput').click()}
        >
          업로드
        </button>
      </label>
    </div>
  );
}

export default CSVLoader;
