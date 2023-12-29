import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import {
  Bar,
  Pie,
  Line,
  Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
} from 'react-chartjs-2';

// Register all components needed for all chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Export ChartData function
export function ChartData(chartLabel, jsonData, categoryColumn, dataColumn) {
  const aggregatedData = jsonData.reduce((acc, item) => {
    const category = item[categoryColumn];
    const value = parseFloat(item[dataColumn]) || 0;
    acc[category] = (acc[category] || 0) + value;
    return acc;
  }, {});

  const sortedCategories = Object.keys(aggregatedData).sort();

  return {
    labels: sortedCategories,
    datasets: [
      {
        label: chartLabel,
        data: sortedCategories.map((category) => aggregatedData[category]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
}

// Export ChartOptions function
export function ChartOptions(titleText) {
  return {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: titleText,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 30,
        suggestedMax: 50,
      },
    },
  };
}

export const ChartComponent = ({
  type,
  data,
  options,
  style = { width: '600px', height: '400px' },
}) => {
  if (!data) {
    return <p>No chart data</p>;
  }
  if (!data.labels) {
    return <p>No chart labels</p>;
  }
  if (!data.datasets) {
    return <p>No chart datasets</p>;
  }
  const chartTypes = {
    Bar,
    Line,
    Pie,
    Doughnut,
    Radar,
    PolarArea,
    Bubble,
    Scatter,
  };

  const Chart = chartTypes[type] || (() => <p>Invalid chart type</p>);

  return (
    <div className="border-2 border-gray-400 bg-white min-w-[600px] min-h-[400px] pb-2 mb-2">
      <Chart data={data} options={options} />
    </div>
  );
};
