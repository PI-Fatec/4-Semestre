import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext'; 

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const AreaCard = () => {
  const [chartData, setChartData] = useState(null);
  const { isDarkMode } = useTheme(); // Obter o estado do modo escuro

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sensor/stats");
        const latestData = response.data.latest_data;

        // Ordenar os dados pelo timestamp em ordem crescente
        const sortedData = latestData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        // Processar os dados para o gráfico
        const labels = sortedData.map((entry) => {
          const date = new Date(entry.timestamp);
          return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }); // Formato: "DD/MM"
        });

        const data = sortedData.map((entry) => entry.humidity);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Umidade (%)',
              data,
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de preenchimento
              borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
              pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Cor dos pontos
              tension: 0.4, // Suavizar a curva
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchAreaData();
  }, []);

  return (
    <div
      className={`w-full h-screen rounded-xl shadow-lg overflow-hidden ${
        isDarkMode ? 'dark-bg dark-text' : 'bg-white text-gray-800'
      }`}
    >
      <div className="h-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Gráfico de Área - Umidade</h2>
        <div className="h-full">
          {chartData ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false, // Permitir que o gráfico ocupe toda a altura
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Data',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Umidade (%)',
                    },
                    beginAtZero: true,
                  },
                },
              }}
              height={null} // Permitir que o gráfico ocupe toda a altura
              width={null} // Permitir que o gráfico ocupe toda a largura
            />
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaCard;