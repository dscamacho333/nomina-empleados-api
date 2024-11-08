// src/components/Piechart.jsx

import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { LinearScale, CategoryScale, BarElement } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const Piechart = ({ data, labelKey, dataKey }) => {
  const chartData = {
    labels: data.map((item) => item[labelKey]),
    datasets: [
      {
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
          "#2196F3",
          "#03A9F4",
          "#00BCD4",
          "#009688",
          "#4CAF50",
          "#8BC34A",
          "#CDDC39",
          "#FFEB3B",
          "#FFC107",
          "#FF9800",
          "#FF5722",
          "#795548",
          "#9E9E9E",
          "#607D8B",
          "#D50000",
          "#C51162",
          "#AA00FF",
          "#6200EA",
          "#304FFE",
          "#2962FF",
          "#0091EA",
          "#00B0FF",
          "#00E5FF",
          "#1DE9B6",
          "#00E676",
          "#76FF03",
          "#AEEA00",
          "#FFD600",
          "#FFAB40",
          "#FF9100",
          "#FF6D00",
          "#FF3D00",
          "#DD2C00",
          "#BF360C",
          "#7B1FA2",
          "#8E24AA",
          "#9C27B0",
          "#AB47BC",
          "#E91E63",
          "#F50057",
          "#FF4081",
          "#F06292",
          "#EF5350",
          "#FF5252",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc, val) => acc + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "#000000",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};
