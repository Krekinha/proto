import ClientesCard from "./clientes/ClientesCard";
import SNToolsCard from "./sntools/SNToolsCard";

export default async function Page() {
  return (
    <div>
      <div className="flex justify-start ml-3 mt-3 max-sm:flex-col max-sm:items-center gap-2">
        <SNToolsCard />
        <ClientesCard />
      </div>
    </div>
  );
}
