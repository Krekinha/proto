export const getTagInfo = {
  CST,
};

function CST(codigo: string) {
  /*Código de Situação Tributária do PIS
  04=Operação Tributável (tributação monofásica (alíquota zero));
  05=Operação Tributável (Substituição Tributária);
  06=Operação Tributável (alíquota zero);
  07=Operação Isenta da Contribuição;
  08=Operação Sem Incidência da Contribuição;
  09=Operação com Suspensão da Contribuição;*/

  if (codigo === "04")
    return "Operação Tributável (tributação monofásica (alíquota zero))";
  if (codigo === "05") return "Operação Tributável (Substituição Tributária)";
  if (codigo === "06") return "Operação Tributável (alíquota zero)";
  if (codigo === "07") return "Operação Isenta da Contribuição";
  if (codigo === "08") return "Operação Sem Incidéncia da Contribuição";
  if (codigo === "09") return "Operação com Suspensão da Contribuição";
}
