// src/components/Barchart.jsx

import React from "react";
import { Bar } from "react-chartjs-2";

export const Barchart = ({
  data,
  labelKey,
  dataKey,
  groupByKey,
  isGrouped,
}) => {
  let chartData;

  if (isGrouped) {
    // Agrupación para el gráfico comparativo (por EPS y dependencia)
    const groupedData = data.reduce((acc, item) => {
      const group = item[groupByKey];
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const uniqueLabels = Array.from(
      new Set(data.map((item) => item[labelKey]))
    );
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#8BC34A",
      "#F44336",
      "#E91E63",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
    ];

    const datasets = uniqueLabels.map((label, index) => ({
      label: label,
      data: labels.map(
        (dep) =>
          groupedData[dep].find((item) => item[labelKey] === label)?.[
            dataKey
          ] || 0
      ),
      backgroundColor: colors[index % colors.length],
    }));

    chartData = { labels, datasets };
  } else {
    // Modo estándar
    chartData = {
      labels: data.map((item) => item[labelKey]),
      datasets: [
        {
          label: "Número de Empleados",
          data: data.map((item) => item[dataKey]),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#8BC34A",
            "#F44336",
            "#E91E63",
            "#3F51B5",
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
