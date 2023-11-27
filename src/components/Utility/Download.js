import React from 'react';
import { Downloadicon } from '../../icons';

function Download({ jsonData }) {
  const handleDownload = async () => {
    const fileName = 'data.json';
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <button className="cursor-pointer text-2xl select-none" title="다운로드" onClick={handleDownload}>
      <Downloadicon />
    </button>
  );
}

export default Download;
