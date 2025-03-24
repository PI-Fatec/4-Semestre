import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CardGraficoBarras = () => {
  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'Valores',
        data: [300, 50, 100, 200],
        backgroundColor: ['#0C4F48', '#318A84', '#4D8B00', '#6C5C04'],
        hoverBackgroundColor: ['#0A3B37', '#276F69', '#3A6900', '#5A4D03'],
      },
    ],
  };

  return (
    <div className="max-w-full sm:max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Distribuição de Valores</h2>
        <div className="h-64 sm:h-80 md:h-96">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default CardGraficoBarras;
