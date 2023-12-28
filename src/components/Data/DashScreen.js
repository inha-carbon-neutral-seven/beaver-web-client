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

  return (
    <div className="housing-data-charts">
      {ageData && (
        <ChartComponent
          type="Bar"
          data={ageData}
          options={commonOptions('AGE Distribution')}
          style={{ width: '400px', height: '300px' }}
        />
      )}
      {crimData && (
        <ChartComponent
          type="Line"
          data={crimData}
          options={commonOptions('CRIM Rates')}
          style={{ width: '400px', height: '300px' }}
        />
      )}
      {rmTargetData && (
        <ChartComponent
          type="Scatter"
          data={rmTargetData}
          options={commonOptions('RM vs Target')}
          style={{ width: '400px', height: '300px' }}
        />
      )}
      {chasData && (
        <ChartComponent
          type="Pie"
          data={chasData}
          options={commonOptions('CHAS Distribution')}
          style={{ width: '400px', height: '300px' }}
        />
      )}
    </div>
  );
}

export default HousingDataCharts;
