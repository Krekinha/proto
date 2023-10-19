import Backbar from "../layout/Backbar";
import AntecipacaoCard from "./antecipacao/AntecipacaoCard";
import ISSRetencaoCard from "./issretencao/ISSRetencaoCard";
import SegregFaturamentoCard from "./segregfatcom/SegregFaturamentoCard";

export default function Page() {
  return (
    <div>
      <div className="flex justify-end mr-4">
        <Backbar />
      </div>

      <div className="flex justify-start ml-3 mt-3 max-sm:flex-col max-sm:items-center gap-2">
        <ISSRetencaoCard />
        <AntecipacaoCard />
        <SegregFaturamentoCard/>
      </div>
    </div>
  );
}
