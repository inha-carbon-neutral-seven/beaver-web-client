import React, { useState, useEffect } from 'react';
import { ChartComponent, ChartData } from './Chart/ChartComponent';
import ChartExample from './Chart/ChartExample';

function DashScreen({ jsonData }) {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    if (jsonData.length > 0) {
    }
  }, [jsonData]);

  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-6 overflow-auto max-w-full max-h-[90vh]">
      {jsonData.length === 0 ? <ChartExample /> : <div>Data is available</div>}
    </div>
  );
}

export default DashScreen;
