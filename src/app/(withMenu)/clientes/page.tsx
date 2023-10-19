import { Suspense } from "react";
import ClientesTab from "./ClientesTab";

export default async function ClientesPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientesTab />
      </Suspense>
    </>
  );
}
