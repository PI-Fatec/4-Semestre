/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi"; 
import Select from "./SelectFilto";

const FiltroComTabela = () => {
  const [activeTab, setActiveTab] = useState("media");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["Categoria 1", "Categoria 2", "Categoria 3"];

  const tableData = [
    { id: 1, name: "Produto A", category: "Categoria 1", value: 20 },
    { id: 2, name: "Produto B", category: "Categoria 2", value: 30 },
    { id: 3, name: "Produto C", category: "Categoria 1", value: 15 },
    { id: 4, name: "Produto D", category: "Categoria 3", value: 25 },
    { id: 5, name: "Produto E", category: "Categoria 2", value: 50 },
  ];

  const filteredTableData = tableData.filter(
    (item) => selectedCategory === "Todas" || item.category === selectedCategory
  );

  const calculateAverage = () => {
    const total = filteredTableData.reduce((sum, item) => sum + item.value, 0);
    return (total / filteredTableData.length).toFixed(2);
  };

  return (
    <div className="relative max-w-4xl mx-auto p-4">
      <div className="flex space-x-4 border-b pb-2">
        {["media", "filtro1", "filtro2"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsOpen(true); 
            }}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "media" ? "Ver Média" : `Outro Filtro ${tab.slice(-1)}`}
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {isOpen && activeTab === "media" && (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-2 left-0 w-full bg-white p-6 rounded-lg shadow-lg z-50"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-all"
              >
                <FiX size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4">Tabela de Produtos</h2>

              <Select
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={setSelectedCategory}
              />

              <table className="min-w-full table-auto border-collapse mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Nome</th>
                    <th className="px-4 py-2 border-b">Categoria</th>
                    <th className="px-4 py-2 border-b">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 border-b">{item.name}</td>
                      <td className="px-4 py-2 border-b">{item.category}</td>
                      <td className="px-4 py-2 border-b">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4">
                <h3 className="font-semibold">
                  Média: {filteredTableData.length > 0 ? calculateAverage() : "N/A"}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FiltroComTabela;
