import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useColorMode } from "@chakra-ui/react";

const Graph = ({ goal }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const { colorMode } = useColorMode();
  const calculateDailyPace = (createdAt, deadline) => {
    const createdDate = new Date(createdAt);
    const deadlineDate = new Date(deadline);
    const totalDays = Math.floor(
      (deadlineDate - createdDate) / (1000 * 60 * 60 * 24)
    );
    // console.log(totalDays);
    const dailyPace = 100 / totalDays;
    return { dailyPace, totalDays };
  };
  const generatePlannedData = () => {
    const { createdAt, deadline } = goal;
    const { dailyPace, totalDays } = calculateDailyPace(createdAt, deadline);

    // Generate dummy data based on the calculated daily pace
    const plannedData = Array.from({ length: totalDays }, (_, index) => {
      const daysFromCreation = index + 1;
      const actualProgress = dailyPace * daysFromCreation;
      return { daysFromCreation, actualProgress };
    });

    return plannedData;
  };
  const plannedData = generatePlannedData();

  const calculateActualPace = (createdAt, currentProgress) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    // console.log(currentDate);
    const totalDays =
      Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24)) + 1;
    const dailyPace = currentProgress / totalDays;
    return { dailyPace, totalDays };
  };

  const generateActualData = () => {
    const { createdAt, deadline, progress } = goal;
    const { dailyPace } = calculateActualPace(createdAt, progress);

    const daysRequired = 100 / dailyPace;
    // console.log(dailyPace, daysRequired);
    if (dailyPace) {
      const ActualData = Array.from({ length: daysRequired }, (_, index) => {
        const daysFromCreation = index + 1;
        const actualProgress = dailyPace * daysFromCreation;
        return { daysFromCreation, actualProgress };
      });
      return ActualData;
    }
    return [];
  };

  const actualData = generateActualData();

  const chartData = {
    labels: plannedData.map((entry) => entry.daysFromCreation),
    datasets: [
      {
        label: "Planned Progress Pace",
        data: plannedData.map((entry) => entry.actualProgress),
        fill: false,
        borderColor:
          colorMode === "light" ? "rgb(0, 128, 0)" : "rgb(0, 255, 0)", // Green
        borderWidth: 2,
        pointBackgroundColor: colorMode === "light" ? "#fff" : "black",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: "Actual Progress Pace",
        data: actualData.map((entry) => entry.actualProgress),
        fill: false,
        borderColor:
          colorMode === "light" ? "rgb(255, 165, 0)" : "rgb(255, 69, 0)", // Orange
        borderWidth: 2,
        pointBackgroundColor: colorMode === "light" ? "#fff" : "black",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM D",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
        title: {
          display: true,
          text: "Days from Creation",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color:
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Progress (%)",
          font: {
            size: 14,
            weight: "bold",
          },
          color: colorMode === "light" ? "#333" : "#fff",
        },
        grid: {
          color:
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 20,
          font: {
            size: 12,
            weight: "bold",
          },
          color: colorMode === "light" ? "#333" : "#fff",
        },
      },
    },
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          const datasetLabel =
            data.datasets[tooltipItem.datasetIndex].label || "";
          return `${datasetLabel}: ${tooltipItem.yLabel.toFixed(2)}%`;
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
    backgroundColor: colorMode === "light" ? "#fff" : "#222",
  };

  return <Line data={chartData} options={options} />;
};

export default Graph;
