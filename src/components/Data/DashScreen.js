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
        ChartData(
          'Sales Trends Over Time',
          jsonData,
          'Date',
          'Sale (Dollars)',
          0
        )
      );
      setColorIndex((prev) => prev + 1);
      setSampleData2(
        ChartData(
          'Category Popularity',
          jsonData,
          'Category Name',
          'Sale (Dollars)',
          1
        )
      );
      setColorIndex((prev) => prev + 1);
      setSampleData3(
        ChartData(
          'Top Performing Products',
          jsonData,
          'Item Description',
          'Sale (Dollars)',
          2
        )
      );
      setColorIndex((prev) => prev + 1);
      setSampleData4(
        ChartData(
          'Geographical Sales Analysis',
          jsonData,
          'City',
          'Sale (Dollars)',
          3
        )
      );
      setColorIndex((prev) => prev + 1);
    }
  }, [jsonData]);

  const commonOptions = (title) => ChartOptions(title);
  const chartDataArray = [
    {
      type: 'Bar',
      data: sampleData1,
      options: commonOptions('Sales Trends Over Time'),
    },
    {
      type: 'Line',
      data: sampleData2,
      options: commonOptions('Category Popularity'),
    },
    {
      type: 'Scatter',
      data: sampleData3,
      options: commonOptions('Top Performing Products'),
    },
    {
      type: 'Pie',
      data: sampleData4,
      options: commonOptions('Geographical Sales Analysis'),
    },
  ];

  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-6 overflow-auto max-w-full max-h-[90vh]">
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
