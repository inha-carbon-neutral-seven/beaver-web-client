import React from 'react';
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

const MyChart = ({ jsonData }) => {
  const labels = jsonData.map((item) => item.MENU_NM);
  const avgPrices = jsonData.map((item) => parseFloat(item.AVG_PRC));

  const data = {
    labels,
    datasets: [
      {
        label: 'Average Price',
        data: avgPrices,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default MyChart;
