import React, { useState } from 'react';
import BarChart from './Dash/BarChart';
import PieChart from './Dash/PieChart';
import LineChart from './Dash/LineChart';
import CumulativeBarChart from './Dash/CumulativeBarChart';

function DashScreen({ jsonData }) {
  const [error, setError] = useState('');
  const [charts, setCharts] = useState([]);
  const [showChartSelection, setShowChartSelection] = useState(false);

  const handleChartSelection = (type) => {
    setCharts((charts) => [...charts, type]);
    setShowChartSelection(false);
  };

  return (
    <div className="pb-6 border-solid max-h-[85vh] border-gray-300">
      <div className="flex flex-col overflow-auto">
        {error && <p className="error-message">{error}</p>}

        <div className="chart-container flex flex-wrap justify-start">
          {charts.map((chartType, index) => (
            <div key={index} className="chart-item">
              {chartType === 'bar' && <BarChart jsonData={jsonData} />}
              {chartType === 'pie' && <PieChart jsonData={jsonData} />}
              {chartType === 'line' && <LineChart jsonData={jsonData} />}
              {chartType === 'cumulativeBar' && <CumulativeBarChart jsonData={jsonData} />}
            </div>
          ))}

          <button onClick={() => setShowChartSelection(true)} className="add-chart-btn">
            + Add Chart
          </button>

          {showChartSelection && (
            <div className="chart-selection-modal">
              <button onClick={() => handleChartSelection('bar')}>Bar Chart</button>
              <button onClick={() => handleChartSelection('pie')}>Pie Chart</button>
              <button onClick={() => handleChartSelection('line')}>Line Chart</button>
              <button onClick={() => handleChartSelection('cumulativeBar')}>Cumulative Bar Chart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashScreen;
