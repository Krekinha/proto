import { baseUrl } from "@/utils/constants";
import { aplicacaoST, capituloST, nbmST } from "../utils/types";

export const nbmSTService = {
  addAll,
  addCapitulos,
  addAplicacoes,
  checkST,
};

async function addAll(values: nbmST[]) {
  const res = await fetch(`${baseUrl()}/api/nbm-st/addall`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((response) => {
      response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function addCapitulos(values: capituloST[]) {
  const res = await fetch(`${baseUrl()}/api/nbm-st/addCapitulosST`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((response) => {
      response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function addAplicacoes(values: aplicacaoST[]) {
  const res = await fetch(`${baseUrl()}/api/nbm-st/addAplicacaoST`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((response) => {
      response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function checkST(_ncm: string, nbms: nbmST[]) {
  {/*

    Explicação do código:

    Criamos uma nova variável nbmsSTLength que é uma lista de nbmsST filtrada por nbm 
    com um número de caracteres menor ou igual ao número de caracteres pesquisados (ncm.length). 
    Em seguida, ordenamos a lista em ordem decrescente de caracteres com a função sort.
    Fazemos uma pesquisa na lista nbmsSTLength usando o método find para encontrar o 
    primeiro elemento que corresponda ao número pesquisado (ncm) ou que seja um prefixo do número 
    pesquisado (ncm.substring(0, e.nbm.length)).
    Retornamos o resultado da pesquisa.

*/}

  if (_ncm.length <= 0) return false;
  const ncm = _ncm.toString();

  const nbmsLength = nbms
    .filter((e) => e.nbm.length <= ncm.length)
    .sort((a, b) => b.nbm.length - a.nbm.length);

  const res = nbmsLength.filter(
    (e) => e.nbm === ncm || ncm.substring(0, e.nbm.length) === e.nbm
  );
  return res || false;
}
