import {
  ArcElement,
  Chart,
  Legend,
  Tooltip,
  PieController,
  ChartConfiguration,
} from "chart.js";
import { useEffect, useRef } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin

// Register the required components and plugin
Chart.register(ArcElement, Tooltip, Legend, PieController, ChartDataLabels);

type Props = {
  data: { category: string; amount: number }[];
  className?: string;
};

export function PieChart({ data, className }: Props) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"pie"> | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const aggregatedData: { [key: string]: number } = {};

    data.forEach((data) => {
      if (aggregatedData[data.category]) {
        aggregatedData[data.category] += data.amount;
      } else {
        aggregatedData[data.category] = data.amount;
      }
    });

    const chartConfig: ChartConfiguration<"pie", number[], string> = {
      type: "pie",
      data: {
        labels: Object.keys(aggregatedData),
        datasets: [
          {
            data: Object.values(aggregatedData),
            backgroundColor: [
              "#4E79A7", // Soft Blue
              "#F28E2B", // Soft Orange
              "#E15759", // Soft Red
              "#76B7B2", // Soft Teal
              "#59A14F", // Soft Green
              "#EDC949", // Soft Yellow
              "#AF7AA1", // Soft Purple
              "#FF9DA7", // Soft Pink
              "#9C755F", // Soft Brown
              "#BAB0AC"  // Soft Gray
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows you to set width and height directly
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const dataset = context.dataset as { data: number[] };
                const total = (dataset.data as number[]).reduce((acc, val) => acc + val, 0);
                const value = context.raw as number;
                const percentage = ((value / total) * 100).toFixed(0) + ' %';
                // Customize the amount with a currency symbol
                const formattedAmount = `$${value.toFixed(2)}`;
                return `${context.label}: ${formattedAmount} (${percentage})`;
              },
            },
          },
          datalabels: {
            display: false, // Disable data labels if needed
          },
        },
      },
    };

    const newChartInstance = new Chart(chartRef.current, chartConfig);
    // Store the chart instance
    chartInstanceRef.current = newChartInstance;

    return () => {
      // Destroy the chart instance when the component unmounts or when data changes
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <canvas className={` ${className}`} ref={chartRef} id="ExpensesChart" style={{ width: '300px', height: '300px' }} />
  );
}
