export function commonOptions(titleText) {
  return {
    responsive: true,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: titleText,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      autocolors: {
        mode: 'label',
      },
      colors: {
        enabled: true,
      },
    },
  };
}
export function BarChartOptions(titleText) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  };
  return options;
}

export function HorizontalBarChartOptions(titleText) {
  const options = commonOptions(titleText);
  options.indexAxis = 'y';
  return options;
}

export function StackedBarChartOptions(titleText) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  };
  return options;
}

export function VerticalBarChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}
export function ComboBarChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}
export function LineChartOptions(titleText) {
  const options = commonOptions(titleText);
  options.elements = {
    line: {
      tension: 0.4, // Smoothening line
    },
    point: {
      radius: 5, // Point size
    },
  };
  return options;
}
export function MultiAxisLineChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}
export function PointStyleLineChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}
export function StackedBarLineChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}
export function BubbleChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}

export function DoughnutChartOptions(titleText) {
  const options = commonOptions(titleText);
  options.cutout = '50%';
  return options;
}

export function PieChartOptions(titleText) {
  const options = commonOptions(titleText);
  options.emptyDoughnut = {
    color: 'rgba(255, 128, 0, 0.5)',
    width: 2,
    radiusDecrease: 20,
  };
  return options;
}
export function PolarAreaChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}
export function PolarAreaCenteredChartOptions(titleText) {
  const options = commonOptions(titleText);
  return options;
}

export function ScatterChartOptions(titleText) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      type: 'linear',
      position: 'bottom',
    },
    y: {
      type: 'linear',
    },
  };
  return options;
}
