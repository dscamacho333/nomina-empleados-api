import React from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

export const Histogram = ({ data, labelKey, dataKey }) => {
  const chartData = {
    labels: data.map((item) => item[labelKey]),
    datasets: [
      {
        label: "Cantidad",
        data: data.map((item) => item[dataKey]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
      {
        label: "Frecuencia Relativa",
        data: data.map((item) => item[dataKey]),
        type: "line",
        borderColor: "rgba(0, 0, 139, 1)",
        fill: false,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Cantidad",
        },
      },
      x: {
        title: {
          display: true,
          text: labelKey.charAt(0).toUpperCase() + labelKey.slice(1),
        },
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => {
          return value;
        },
        color: "black",
      },
    },
  };

  return <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />;
};
