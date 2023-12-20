import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Menu Average Prices',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const BarChart = ({ jsonData, labelColumn, valueColumn }) => {
  if (!jsonData || jsonData.length === 0) {
    return <p>No data available</p>;
  }

  const labels = jsonData.map((item) => item[labelColumn]);
  const values = jsonData.map((item) => parseFloat(item[valueColumn]));

  const data = {
    labels,
    datasets: [
      {
        label: valueColumn,
        data: values,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
