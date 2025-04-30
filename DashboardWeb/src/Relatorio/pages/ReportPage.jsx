import React, { useState } from "react";

import Filtro from "../components/Filtro";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTheme } from "../../contexts/ThemeContext";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/MenuMoblie";

const ReportPage = () => {
  const [dados, setDados] = useState([]);
  const { isDarkMode } = useTheme();
  const [filtroAtivo, setFiltroAtivo] = useState(false);

  const handleFiltrar = async (filtros) => {
    const params = {};
    if (filtros.start) params.start = filtros.start;
    if (filtros.end) params.end = filtros.end;
    if (filtros.minHumidity) params.minHumidity = filtros.minHumidity;
    if (filtros.maxHumidity) params.maxHumidity = filtros.maxHumidity;

    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`http://localhost:5000/api/report?${query}`);
    setDados(response.data);
    setFiltroAtivo(true);
  };

  const exportExcel = () => {
    if (dados.length === 0) {
      toast.info("Nenhum dado para exportar.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(
      dados.map(item => ({
        Umidade: item.humidity,
        "Data/Hora": new Date(item.timestamp).toLocaleString()
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
    XLSX.writeFile(wb, "relatorio.xlsx");
  };

  const exportPDF = () => {
    if (dados.length === 0) {
      toast.info("Nenhum dado para exportar.");
      return;
    }
    const doc = new jsPDF();
    doc.text("Relatório de Umidade", 14, 15);
    doc.autoTable({
      head: [["Umidade", "Data/Hora"]],
      body: dados.map(item => [
        item.humidity,
        new Date(item.timestamp).toLocaleString()
      ]),
      startY: 25,
      styles: {
        fillColor: isDarkMode ? [55, 65, 81] : [255, 255, 255],
        textColor: isDarkMode ? 255 : 20,
      },
      headStyles: {
        fillColor: isDarkMode ? [31, 41, 55] : [240, 240, 240],
        textColor: isDarkMode ? 255 : 20,
      },
    });
    doc.save("relatorio.pdf");
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Sidebar />
      <Navbar />
      <main className="flex-1 flex flex-col items-center p-4 md:mt-0 mt-33 ml-0 md:ml-64 transition-all duration-300">
        <Filtro onFiltrar={handleFiltrar} />
        <div className="mt-6 w-full max-w-2xl">
          {filtroAtivo && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={exportExcel}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Baixar Excel
              </button>
              <button
                onClick={exportPDF}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Baixar PDF
              </button>
            </div>
          )}
          {dados.length > 0 ? (
            <table className={`w-full border-collapse mt-4 rounded shadow ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <thead>
                <tr>
                  <th className={`p-2 border-b ${isDarkMode ? "text-white" : "text-gray-900"}`}>Umidade</th>
                  <th className={`p-2 border-b ${isDarkMode ? "text-white" : "text-gray-900"}`}>Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item, idx) => (
                  <tr key={idx}>
                    <td className={`p-2 border-b text-center ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{item.humidity}</td>
                    <td className={`p-2 border-b text-center ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            filtroAtivo && (
              <p className={`mt-6 text-center ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Nenhum dado encontrado.</p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportPage;