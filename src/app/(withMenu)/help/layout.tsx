import Sidebar from "./Sidebar";

export default function NFCalcSaidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-zinc-900 mx-4 my-3 rounded-lg">{children}</div>
    </div>
  );
}
