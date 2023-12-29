import React, { useState, useEffect } from 'react';
import { ChartComponent, ChartData, ChartOptions } from './ChartComponent';

function DashScreen({ jsonData }) {
  const [colorIndex, setColorIndex] = useState(0); // 색상 인덱스 상태 추가
  const [sampleData1, setSampleData1] = useState(null);
  const [sampleData2, setSampleData2] = useState(null);
  const [sampleData3, setSampleData3] = useState(null);
  const [sampleData4, setSampleData4] = useState(null);

  useEffect(() => {
    if (jsonData) {
      setSampleData1(
        ChartData('AGE Distribution', jsonData, 'AGE', 'Target', 0)
      );
      setColorIndex((prev) => prev + 1);
      setSampleData2(ChartData('CRIM Rates', jsonData, 'CRIM', 'Target', 1));
      setColorIndex((prev) => prev + 1);
      setSampleData3(ChartData('RM vs Target', jsonData, 'RM', 'Target', 2));
      setColorIndex((prev) => prev + 1);
      setSampleData4(
        ChartData('CHAS Distribution', jsonData, 'CHAS', 'Target', 3)
      );
      setColorIndex((prev) => prev + 1);
    }
  }, [jsonData]);

  const commonOptions = (title) => ChartOptions(title);
  const chartDataArray = [
    {
      type: 'Bar',
      data: sampleData1,
      options: commonOptions('AGE Distribution'),
      title: 'AGE Distribution',
    },
    {
      type: 'Line',
      data: sampleData2,
      options: commonOptions('CRIM Rates'),
      title: 'CRIM Rates',
    },
    {
      type: 'Scatter',
      data: sampleData3,
      options: commonOptions('RM vs Target'),
      title: 'RM vs Target',
    },
    {
      type: 'Pie',
      data: sampleData4,
      options: commonOptions('CHAS Distribution'),
      title: 'CHAS Distribution',
    },
  ];

  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-6">
      {chartDataArray.map((chart, index) =>
        chart.data ? (
          <div key={index}>
            <div className="flex-1">
              <ChartComponent
                type={chart.type}
                data={chart.data}
                options={chart.options}
                index={index}
              />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default DashScreen;
