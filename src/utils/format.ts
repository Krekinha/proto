import moment from "moment";

export function formatarData(data: Date | undefined) {
  if (data != null && data != undefined) {
    return moment(data).format("DD/MM/YYYY");
  } else {
    return undefined;
  }
}

export function formatarDataByMY(data: Date | undefined) {
  if (data != null && data != undefined) {
    return moment(data).format("MM/YYYY");
  } else {
    return undefined;
  }
}

export function formatPercent(valor: string) {
  const val = valor.toString().replace(",", ".") || "0";
  const conv = parseFloat(val).toLocaleString("pt-BR", {
    style: "decimal",
    maximumFractionDigits: 2,
  });

  return `${conv}%`;
}

export function formatCurrency(valor: string) {
  return parseFloat(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDecimal(valor: string) {
  return parseFloat(valor).toLocaleString("pt-BR", {
    style: "decimal",
    maximumFractionDigits: 2,
  });
}

export function anteciparSeFimDeSemana(data: any) {
  const diaDaSemana = moment(data).isoWeekday();

  if (diaDaSemana === 6) {
    return "sabado"; // É sábado ou domingo
  }

  if (diaDaSemana === 7) {
    return "domingo"; // É sábado ou domingo
  }

  return "nem sabado nem domingo"; // É sábado ou domingo
}

export function initialDate(data: Date) {
  if (data != null) {
    return new Date(data);
  } else {
    return undefined;
  }
}
