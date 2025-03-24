import CardGraficoBarras from "../components/Cardbarra";
import CardGraficoPizza from "../components/Cardpizza";
import FiltroComTabela from "../components/FIltro";

export default function CardDash() {
    return (
      <div className="flex flex-col space-y-4">
        <FiltroComTabela />
  
        <div className="flex flex-wrap justify-center gap-4">
          <CardGraficoPizza />
          <CardGraficoBarras />
        </div>
      </div>
    );
  }
  