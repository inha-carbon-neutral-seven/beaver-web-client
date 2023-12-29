import React, { useState, useEffect } from 'react';
import { ChartComponent, ChartData, ChartOptions } from './ChartComponent';

function HousingDataCharts({ jsonData }) {
  const [ageData, setAgeData] = useState(null);
  const [crimData, setCrimData] = useState(null);
  const [rmTargetData, setRmTargetData] = useState(null);
  const [chasData, setChasData] = useState(null);

  useEffect(() => {
    if (jsonData) {
      // Process data for AGE distribution (Bar Chart)
      setAgeData(ChartData('AGE Distribution', jsonData, 'AGE', 'Target'));
      // Process data for CRIM rates (Line Chart)
      setCrimData(ChartData('CRIM Rates', jsonData, 'CRIM', 'Target'));
      // Process data for RM vs Target (Scatter Chart)
      setRmTargetData(ChartData('RM vs Target', jsonData, 'RM', 'Target'));
      // Process data for CHAS distribution (Pie Chart)
      setChasData(ChartData('CHAS Distribution', jsonData, 'CHAS', 'Target'));
    }
  }, [jsonData]);

  const commonOptions = (title) => ChartOptions(title);
  const chartDataArray = [
    {
      type: 'Bar',
      data: ageData,
      options: commonOptions('AGE Distribution'),
      title: 'AGE Distribution',
    },
    {
      type: 'Line',
      data: crimData,
      options: commonOptions('CRIM Rates'),
      title: 'CRIM Rates',
    },
    {
      type: 'Scatter',
      data: rmTargetData,
      options: commonOptions('RM vs Target'),
      title: 'RM vs Target',
    },
    {
      type: 'Pie',
      data: chasData,
      options: commonOptions('CHAS Distribution'),
      title: 'CHAS Distribution',
    },
    // ... any additional charts
  ];
  return (
    <div className="flex flex-wrap -m-4">
      {chartDataArray.map(
        (chart, index) =>
          chart.data && (
            <div
              key={index}
              className="p-4 m-4 border-gray-400 min-w-[600px] min-h-[400px]"
            >
              <ChartComponent
                type={chart.type}
                data={chart.data}
                options={chart.options}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )
      )}
    </div>
  );
}

export default HousingDataCharts;
