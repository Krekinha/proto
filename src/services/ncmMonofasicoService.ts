import { baseUrl } from "@/utils/constants";
import { nbmST, ncmMonofasico } from "../utils/types";

export const ncmMonofasicoService = {
  addAll,
  getAll,
  getById,
  getByCPF,
  update,
  delete: _delete,
};

async function addAll(values: ncmMonofasico[]) {
  const res = await fetch(`${baseUrl()}/api/monofasicos/add`, {
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

function getAll() {
  //return fetchWrapper.get(baseUrl);
}

function getById(id: string) {
  //return fetchWrapper.get(`${baseUrl}/${id}`);
}

async function getByCPF(cpf: string) {
  //return fetchWrapper.
}

async function update(id: string, values: nbmST) {
  //return fetchWrapper
}

// prefixado com underline porque delete é uma palavra reservada em javascript
async function _delete(id: string) {
  //return fetchWrapper.delete(`${baseUrl}/${id}`);
}
