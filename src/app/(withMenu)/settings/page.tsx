import { SettingsContextProvider } from "@/context/SettingsContext";
import { baseUrl } from "@/utils/constants";
import Settings from "./Settings";

async function getNBMS() {
  const res = await fetch(`${baseUrl()}/api/nbm-st/list`, {
    cache: "no-store",
  });
  const nbms = await res.json();

  return nbms;
}

async function getNcmsMonofasicos() {
  const res = await fetch(`${baseUrl()}/api/monofasicos/list`, {
    cache: "no-store",
  });
  const ncms = await res.json();

  return ncms;
}

export default async function SettingsPage() {
  const nbms = await getNBMS();
  const ncms = await getNcmsMonofasicos();

  return (
    <SettingsContextProvider>
      <Settings nbmsst={nbms.nbms} ncmsmonofasicos={ncms.ncm} />
    </SettingsContextProvider>
  );
}
