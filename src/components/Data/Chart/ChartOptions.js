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
      zoom: {
        limits: {
          y: { min: 0, max: 100 },
          y2: { min: -5, max: 5 },
        },
      },
    },
  };
}
export function BarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

export function HorizontalBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.indexAxis = 'y';
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

export function StackedBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      stacked: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      stacked: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

export function VerticalBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}
export function ComboBarChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}
export function LineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
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
export function MultiAxisLineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}
export function PointStyleLineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}
export function StackedBarLineChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  return options;
}

export function DoughnutChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.cutout = '50%';
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  options.plugins.legend.position = 'right';
  return options;
}

export function PieChartOptions(titleText, xColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
  };
  options.plugins.legend.position = 'right';
  return options;
}
export function PolarAreaChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  options.plugins.legend.position = 'right';
  return options;
}
export function PolarAreaCenteredChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };
  options.plugins.legend.position = 'right';
  return options;
}

export function ScatterChartOptions(titleText, xColumn, yColumn) {
  const options = commonOptions(titleText);
  options.scales = {
    x: {
      display: true,
      title: {
        display: true,
        text: xColumn,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: yColumn,
      },
    },
  };

  return options;
}
