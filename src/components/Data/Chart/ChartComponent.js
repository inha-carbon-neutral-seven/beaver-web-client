import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import {
  Pie,
  Line,
  Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
  Bar,
} from 'react-chartjs-2';
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
import autocolors from 'chartjs-plugin-autocolors';
import * as ChartOptions from './ChartOptions';

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
  LineElement,
  autocolors
);
const colorArray = [
  'rgba(240, 165, 216, 0.5)',
  'rgba(150, 213, 114, 0.5)',
  'rgba(229, 126, 135, 0.5)',
  'rgba(187, 119, 131, 0.5)',
  'rgba(234, 240, 145, 0.5)',
  'rgba(179, 178, 244, 0.5)',
  'rgba(104, 154, 124, 0.5)',
  'rgba(109, 161, 177, 0.5)',
  'rgba(193, 119, 153, 0.5)',
  'rgba(208, 137, 233, 0.5)',
  'rgba(136, 106, 151, 0.5)',
  'rgba(234, 142, 226, 0.5)',
  'rgba(248, 142, 129, 0.5)',
  'rgba(204, 140, 196, 0.5)',
  'rgba(182, 248, 168, 0.5)',
  'rgba(194, 119, 112, 0.5)',
  'rgba(165, 171, 131, 0.5)',
  'rgba(227, 254, 113, 0.5)',
  'rgba(233, 156, 247, 0.5)',
  'rgba(201, 227, 163, 0.5)',
];

// Export ChartData function
export function ChartData(
  chartLabel,
  jsonData,
  categoryColumn,
  dataColumn,
  index
) {
  const aggregatedData = jsonData.reduce((acc, item) => {
    const category = item[categoryColumn];
    const value = parseFloat(item[dataColumn]) || 0;
    acc[category] = (acc[category] || 0) + value;
    return acc;
  }, {});

  const sortedCategories = Object.keys(aggregatedData).sort();
  const colorIndex = index % colorArray.length;
  const selectedColor = colorArray[colorIndex];
  const borderColor = selectedColor.replace('0.5', '1'); // 테두리 색상 (반투명도 제거)

  return {
    labels: sortedCategories,
    datasets: [
      {
        label: chartLabel,
        data: sortedCategories.map((category) => aggregatedData[category]),
        backgroundColor: selectedColor, // 무작위로 선택된 단일 색상
        borderColor: borderColor, // 테두리에도 동일한 색상 적용
        borderWidth: 1,
      },
    ],
  };
}

const chartComponents = {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
};
export const ChartComponent = ({ type, data, options }) => {
  if (!data) {
    return <p>No chart data</p>;
  }
  if (!data.labels) {
    return <p>No chart labels</p>;
  }
  if (!data.datasets) {
    return <p>No chart datasets</p>;
  }
  const Chart = chartComponents[type];
  if (!Chart) return <p>Invalid chart type</p>;

  const chartOptions = ChartOptions[`${type}ChartOptions`];
  if (!chartOptions) return <p>Invalid chart options</p>;

  return (
    <ResizableBox
      width={450}
      height={300}
      minConstraints={[300, 200]}
      maxConstraints={[800, 600]}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col m-2"
    >
      <Chart data={data} options={chartOptions(options.title)} />
    </ResizableBox>
  );
};
