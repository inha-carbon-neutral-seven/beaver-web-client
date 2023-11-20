import React, { useState, useEffect } from 'react';
import * as dfd from 'danfojs';
import BarChart from './BarChart';

function Dashboard({ jsonData }) {
  return (
    <div className="pb-6 border-solid max-h-[85vh] border-gray-300">
      <div className="flex flex-col overflow-auto">
        <BarChart data={jsonData} />
      </div>
    </div>
  );
}

export default Dashboard;
