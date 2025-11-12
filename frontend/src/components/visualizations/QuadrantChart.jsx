import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, BubbleController, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(BubbleController, PointElement, LinearScale, Title, Tooltip, Legend);

/**
 * QuadrantChart - Assurance Priorities
 * Gap severity vs. risk impact bubble chart
 */
const QuadrantChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const statusColors = {
      'Draft': 'rgba(190, 195, 200, 0.45)',
      'In Progress': 'rgba(220, 180, 150, 0.45)',
      'Completed': 'rgba(160, 190, 170, 0.45)'
    };

    const statusBorders = {
      'Draft': 'rgb(190, 195, 200)',
      'In Progress': 'rgb(220, 180, 150)',
      'Completed': 'rgb(160, 190, 170)'
    };

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Controls',
          data: data.map(c => ({
            x: c.gap,
            y: c.impact,
            r: c.size * 4 + 6,
            name: c.name,
            status: c.status
          })),
          backgroundColor: data.map(c => statusColors[c.status]),
          borderColor: data.map(c => statusBorders[c.status]),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                const d = context.raw;
                return [
                  `Control: ${d.name}`,
                  `Gap Score: ${d.x}`,
                  `Risk Impact: ${d.y}/100`,
                  `Status: ${d.status}`
                ];
              }
            },
            backgroundColor: 'rgb(26, 32, 44)',
            titleColor: 'white',
            bodyColor: 'white',
            padding: 12,
            displayColors: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Gap Score',
              font: { size: 11, weight: '600' },
              color: 'rgb(74, 85, 104)'
            },
            min: 0,
            max: 3,
            ticks: {
              stepSize: 0.5,
              color: 'rgb(113, 118, 126)',
              font: { size: 10 }
            },
            grid: {
              color: 'rgba(220, 229, 242, 0.3)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Risk Impact',
              font: { size: 11, weight: '600' },
              color: 'rgb(74, 85, 104)'
            },
            min: 0,
            max: 100,
            ticks: {
              color: 'rgb(113, 118, 126)',
              font: { size: 10 }
            },
            grid: {
              color: 'rgba(220, 229, 242, 0.3)'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default QuadrantChart;
