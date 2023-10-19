export const menuContent = [
  {
    id: "1",
    name: "Introdução",
    link: "/help",
  },
  {
    id: "3",
    name: "NFCalc",
    children: [
      { id: "c1", name: "Introdução", link: "/help/nfcalc/introducao" },
      { id: "c2", name: "Notas de Saída/Venda", children: [] },
      { id: "c3", name: "Notas de Entrada/Compra", children: [] },
    ],
  },
];
