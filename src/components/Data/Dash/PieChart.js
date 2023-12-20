import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ jsonData }) => {
  // Example: Process jsonData to fit Chart.js format
  // This will vary depending on your jsonData structure
  const data = {
    labels: jsonData.map((item) => item.label),
    datasets: [
      {
        data: jsonData.map((item) => item.value),
        backgroundColor: [
          /* array of colors */
        ],
        hoverBackgroundColor: [
          /* array of hover colors */
        ],
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
