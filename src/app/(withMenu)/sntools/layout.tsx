import { SNToolsContextProvider } from "@/context/SNToolsContext";
import { RouteMap } from "@/utils/types";
import Adress from "../layout/Adress";

const itemsMap: RouteMap[] = [
  { route: "sntools", name: "SN Tools", bgColor: "bg-blue-900" },
  { route: "issretencao", name: "ISS Retenção", bgColor: "bg-red-800" },
  {
    route: "antecipacao",
    name: "Antecipação Alíquota/ICMS",
    bgColor: "bg-red-800",
  },
  {
    route: "segregfatcom",
    name: "Segregar Faturamento Comercio",
    bgColor: "bg-red-800",
  },
];

export default function ISSToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SNToolsContextProvider>
        <Adress items={itemsMap} />
        <div>{children}</div>
      </SNToolsContextProvider>
    </div>
  );
}
