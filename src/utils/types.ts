import { Decimal } from "@prisma/client/runtime";
import { ReactNode } from "react";

export type User = {
  id?: string;
  name: string;
  sobrenome?: string;
  email: string;
  telefone?: string;
  pix?: string;
  criadoEm?: Date;
  VerifyEm?: Date;
  role?: Role;
  image?: string;
  senha: string;
  token: string;

  demandas?: Demanda[];
  pagamentoDemanda?: PagamentoDemanda[];
  accounts?: Account[];
  sessions?: Session[];
};

export type Account = {
  id?: string;

  type?: string;
  provider?: string;
  providerAccountId?: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  userId?: string;
  oauth_token_secret?: string;
  oauth_token?: string;
  session_state?: string;
};

export type Session = {
  id?: string;

  expires?: Date;
  session_token?: string;

  userId?: string;
};

export type VerificationToken = {
  id?: string;
  token?: string;
  expires?: Date;
  identifier?: string;
};

enum Role {
  USER,
  ADMIN,
  DEV,
}

export type Cliente = {
  id?: string;

  tipoCliente: string;
  cnpjCpf: string;
  razaoNome: string;
  naturezaJuridica?: string;
  estadoCivilPf?: string;
  rgPf?: string;
  dnPf?: Date;
  email?: string;
  nire?: string;
  optante?: boolean;
  certificado?: boolean;

  logradouroEmpresa?: string;
  numeroLogradouroEmpresa?: string;
  bairroEmpresa?: string;
  cepEmpresa?: string;
  cidadeEmpresa?: string;
  ufEmpresa?: string;
  telefoneEmpresa?: string;

  cpfResponsavel?: string;
  nomeResponsavel?: string;
  estadoCivilResponsavel?: string;
  rgResponsavel?: string;
  dnResponsavel?: Date;
  logradouroResponsavel?: string;
  numeroLogradouroResponsavel?: string;
  bairroResponsavel?: string;
  cepResponsavel?: string;
  cidadeResponsavel?: string;
  ufResponsavel?: string;
  telefoneResponsavel?: string;

  codigoSimples?: string;
  codigoEcac?: string;
  demandas?: Demanda[];

  criadoEm?: Date;
  atualizadoEm?: Date;
  criadoPor?: User;
  atualizadoPor?: User;

  userCriouId?: String;
  userAtualizouId?: String;
};

export type Demanda = {
  id?: string;

  codigo?: number;
  cliente?: Cliente;
  servico?: string;
  responsaveis: User[];
  prazo?: Date;
  linkTrello: string;
  ciclo?: string;
  pasta?: string;
  evolucao?: Evolucao;
  concluido?: boolean;
  dataConclusao?: Date;
  monetizacao?: MonetizacaoDemanda;

  clienteId?: string;
};

export type Evolucao = {
  id?: string;

  tarefas?: Tarefa[];
};

export type Tarefa = {
  id?: string;

  criadoPor?: User;
  atribuidoA?: User;
  concluidoPor?: User;
  dataRegistro?: Date;
  descricao?: string;
  concluido?: boolean;
  dataConclusao?: Date;
};

export type MonetizacaoDemanda = {
  id?: string;

  valor?: Decimal;
  despesas?: Decimal;
  pagamentos?: PagamentoDemanda[];
  valorVisivel?: boolean;
};

export type PagamentoDemanda = {
  id?: String;

  colaborador?: User;
  valor?: Decimal;
};

export type UsuarioAutorizado = {
  id?: string;

  email?: string;
};

export type NF = {
  nfeProc?: nfeProc; // TAG raiz da NF-e
};

export type nfeProc = {
  NFe?: NFe; // TAG raiz da NF-e
  protNFe?: protNFe;
};

export type NFe = {
  infNFe?: infNFe; // Informações da NF-e
};

export type infNFe = {
  versao?: string; // Versão do leiaute da NF-e
  id?: string; // Identificador da TAG a ser assinada
  ide?: ide; // Informações de identificação da NF-e
  emit?: emit; // Identificação do emitente da NF-e
  avulsa?: avulsa; // Informações do fisco emitente (uso exclusivo do fisco)
  dest?: dest; // Identificação do Destinatário da NF-e
  retirada?: retirada; // Identificação do Local de retirada
  entrega?: entrega; // Identificação do Local de entrega
  autXML?: autXML; // Pessoas autorizadas a acessar o XML da NF-e
  det?: det[]; // Detalhamento de Produtos e Serviços
  total?: total;
  paramsNFe?: paramsNFe; // Parâmetros diversos para uso em desenvolvimento
};

export type total = {
  ICMSTot?: ICMSTot;
};

export type ICMSTot = {
  vBC?: string;
  vICMS?: string;
  vICMSDeson?: string;
  vFCP?: string;
  vBCST?: string;
  vST?: string;
  vFCPST?: string;
  vFCPSTRet?: string;
  vProd?: string;
  vFrete?: string;
  vSeg?: string;
  vDesc?: string;
  vII?: string;
  vIPI?: string;
  vIPIDevol?: string;
  vPIS?: string;
  vCOFINS?: string;
  vOutro?: string;
  vNF?: string;
};

export type ide = {
  cUF?: string; // Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE
  cNF?: string; // Código numérico que compõe a Chave de Acesso. Número aleatório gerado pelo emitente para cada NF-e para evitar acessos indevidos da NF-e. (v2.0)
  natOp?: string; // Descrição da Natureza da Operação
  mod?: string; // Código do modelo do Documento Fiscal. 55=NF-e; 65=NFC-e
  serie?: string; // Série do Documento Fiscal (série normal 0-889, Avulsa Fisco 890-899, SCAN 900-999)
  nNF?: string; // Número do Documento Fiscal
  dhEmi?: Date; // Data e Hora de emissão do Documento Fiscal no formato UTC (Universal Coordinated Time): (AAAA-MM-DDThh:mm:ssTZD) ex.: 2012-09-01T13:00:00-03:00
  dhSaiEnt?: Date; // Data e hora de Saída ou da Entrada da Mercadoria/Produto no formato UTC (Universal Coordinated Time): (AAAA-MM-DDTHH:mm:ssTZD)
  tpNF?: string; // Tipo do Documento Fiscal (0 - entrada; 1 - saída)
  idDest?: string; // Identificador de Local de destino da operação (1-Interna;2-Interestadual;3-Exterior)
  cMunFG?: string; // Código do Município de Ocorrência do Fato Gerador (utilizar a tabela do IBGE)
  tpImp?: string; // Formato de impressão do DANFE (0-sem DANFE;1-DANFe Retrato; 2-DANFe Paisagem;3-DANFe Simplificado; 4-DANFe NFC-e;5-DANFe NFC-e em mensagem eletrônica)
  tpEmis?: string; // Forma de emissão da NF-e (1=Normal; 2=Contingência FS; 3=Regime Especial NFF (NT 2021.002); 4=Contingência DPEC; 5=Contingência FSDA; 6=Contingência SVC - AN; 7=Contingência SVC - RS; 9=Contingência off-line NFC-e
  cDV?: string; // Digito Verificador da Chave de Acesso da NF-e ([0-9]{1})
  tpAmb?: string; // Identificador do Ambiente (1=Produção; 2=Homologação)
  finNFe?: string; // Finalidade da emissão da NF-e: 1=NFe normal; 2=NF-e complementar; 3=NF-e de ajuste; 4=Devolução/Retorno
  indFinal?: string; // Indica operação com consumidor final (0-Não;1-Consumidor Final)
  indPres?: string; // Indicador de presença do comprador no estabelecimento comercial no momento da oepração (0-Não se aplica (ex.: Nota Fiscal complementar ou de ajuste;1-Operação presencial;2-Não presencial, internet;3-Não presencial, teleatendimento;4-NFC-e entrega em domicílio;5-Operação presencial, fora do estabelecimento;9-Não presencial, outros)
  indIntermed?: string; // Indicador de intermediador/marketplace (0=Operação sem intermediador (em site ou plataforma própria) 1=Operação em site ou plataforma de terceiros (intermediadores/marketplace)
  procEmi?: string; // Processo de emissão utilizado com a seguinte codificação (0=emissão de NF-e com aplicativo do contribuinte; 1=emissão de NF-e avulsa pelo Fisco; 2=emissão de NF-e avulsa, pelo contribuinte com seu certificado digital, através do site do Fisco; 3=Emissão de NF-e pelo contribuinte em substituição de um documento já emitido e que substitui o original; 4=emissão de NF-e pelo contribuinte com aplicativo fornecido pelo Fisco)
  verProc?: string; // versão do aplicativo utilizado no processo de emissão (min=1 e max=20)
  NFref?: NFref; // Informação de Documentos Fiscais referenciados. Informação utilizada nas hipóteses previstas na legislação. (Ex.: Devolução de mercadorias, Substituição de NF cancelada, Complementação de NF, etc.)
  refNF?: refNF; // Informação da NF modelo 1/1A ou NF modelo 2 referenciada (alterado pela NT2016.002)
  refNFP?: refNFP; // Informações da NF de produtor rural referenciada
  refECF?: refECF; // Informações do Cupom Fiscal referenciado
};

export type NFref = {
  refNFe?: number; // Chave de acesso da NF-e referenciada
};

export type refNF = {
  cUF?: string; // Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE
  AAMM?: Date; // Ano e Mês de emissão da NF-e
  CNPJ?: string; // CNPJ do emitente
  mod?: string; // Modelo do Documento Fiscal. 01=modelo 01; 02=modelo 02 (incluído na NT2016.002)
  serie?: string; // Série do Documento Fiscal
  nNF?: string; // Número do Documento Fiscal
};

export type refNFP = {
  cUF?: string; // Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE
  AAMM?: Date; // Ano e Mês de emissão da NF-e
  CNPJ?: string; // CNPJ do emitente
  CPF?: string; // CPF do emitente
  IE?: string; // Inscrição Estadual do Emitente
  mod?: string; // Modelo do Documento Fiscal. 04=NF de Produtor; 01=NF (v2.0)
  serie?: string; // Série do Documento Fiscal
  nNF?: string; // Número do Documento Fiscal
  refCTe?: string; // Chave de acesso do CT-e referenciada
};

export type refECF = {
  mod?: string; // Modelo do Documento Fiscal. "2B"=Cupom Fiscal emitido por máquina registradora (não ECF);
  nECF?: string; // Número de ordem sequencial do ECF
  nCOO?: string; // Número do Contador de Ordem de Operação - COO
};

export type emit = {
  CNPJ?: string; // Número do CNPJ do emitente
  CPF?: string; // Número do CPF do emitente
  xNome?: string; // Razão Social ou nome do emitente
  xFant?: string; // Nome fantasia do emitente
  enderEmit?: enderEmit; // Endereço do emitente
  IE?: string; // Inscrição Estadual do Emitente
  IEST?: string; // Inscrição Estadual do Substituto Tributário
  IM?: string; // Inscrição Municipal do Emitente
  CNAE?: string; // Código Nacional da Atividade Econômica do Emitente
  CRT?: string; // Código de Regime Tributário do Emitente. Este campo será obrigatoriamente preenchido com: 1=Simples Nacional; 2=Simples Nacional – excesso de sublimite de receita bruta; 3=Regime Normal
};

export type enderEmit = {
  xLgr?: string; // Logradouro
  nro?: string; // Número
  xCpl?: string; // Complemento
  xBairro?: string; // Bairro
  cMun?: string; // Código do Município
  xMun?: string; // Município
  UF?: string; // UF
  CEP?: string; // CEP
  cPais?: string; // Código do País
  xPais?: string; // País
  fone?: string; // Fone
};

export type avulsa = {
  CNPJ?: string; //CNPJ do órgão emitente
  xOrgao?: string; // Órgão emitente
  matr?: string; // Matrícula do agente do Fisco
  xAgente?: string; // Nome do agente do Fisco
  fone?: string; // Telefone. Preencher com Código DDD + número do telefone
  UF?: string; // Sigla da UF E D01 C 1-1 2
  nDAR?: string; // Número do Documento de Arrecadação de Receita
  dEmi?: Date; // Data de emissão do Documento de Arrecadação. Formato: “AAAA-MM-DD”
  vDAR?: string; // Valor Total constante no Documento de arrecadação de Receita
  repEmi?: string; // Repartição Fiscal emitente
  dPag?: Date; // Data de pagamento do Documento de Arrecadação E D01 D 0-1 Formato: “AAAA-MM-DD”
};

export type dest = {
  CNPJ?: string; // Número do CNPJ do destinatário
  CPF?: string; // Número do CPF do destinatário
  idEstrangeiro?: string; // Identificação do destinatário no caso de comprador estrangeiro. Informar esta tag no caso de operação com o exterior, ou para comprador estrangeiro
  xNome?: string; // Razão Social ou nome do destinatário
  enderDest?: enderDest; // Endereço do destinatário da NF-e
  indIEDest?: string; // Indicador da IE do destinatário (1=Contribuinte ICMSpagamento à vista; 2=Contribuinte isento de inscrição; 3= Não Contribuinte)
  IE?: string; // Inscrição Estadual do Destinatário (obrigatório nas operações com contribuintes do ICMS)
  ISUF?: string; // Inscrição na SUFRAMA (obrigatório nas operações que se beneficiam de incentivos fiscais existentes nas áreas sob controle da SUFRAMA)
  IM?: string; // Inscrição Municipal do Tomador do Serviço
  email?: string; // Email do destinatário
};

export type enderDest = {
  xLgr?: string; // Logradouro
  nro?: string; // Número
  xCpl?: string; // Complemento
  xBairro?: string; // Bairro
  cMun?: string; // Código do Município
  xMun?: string; // Município
  UF?: string; // UF
  CEP?: string; // CEP
  cPais?: string; // Código do País
  xPais?: string; // País
  fone?: string; // Fone
};

export type retirada = {
  CNPJ?: string; // CNPJ. Informar CNPJ ou CPF
  CPF?: string; // CPF
  xNome?: string; // Razão Social ou Nome do Expedidor
  xLgr?: string; // Logradouro
  nro?: string; // Número
  xCpl?: string; // Complemento
  xBairro?: string; // Bairro
  cMun?: string; // Código do município. Utilizar a Tabela do IBGE
  xMun?: string; // Nome do município
  UF?: string; // Sigla da UF
  CEP?: string; // CEP
  cPais?: string; // Código do País
  xPais?: string; // Nome do País
  fone?: string; // Telefone
  email?: string; // Endereço de e-mail do Expedidor
  IE?: string; // Inscrição Estadual do Estabelecimento Expedidor
};

export type entrega = {
  CNPJ?: string; // CNPJ. Informar CNPJ ou CPF
  CPF?: string; // CPF
  xNome?: string; // Razão Social ou Nome do Recebedor
  xLgr?: string; // Logradouro
  nro?: string; // Número
  xCpl?: string; // Complemento
  xBairro?: string; // Bairro
  cMun?: string; // Código do município. Utilizar a Tabela do IBGE
  xMun?: string; // Nome do município
  UF?: string; // Sigla da UF
  CEP?: string; // CEP
  cPais?: string; // Código do País
  xPais?: string; // Nome do País
  fone?: string; // Telefone
  email?: string; // Endereço de e-mail do Recebedor
  IE?: string; // Inscrição Estadual do Estabelecimento Recebedor
};

export type autXML = {
  CNPJ?: string; // CNPJ Autorizado
  CPF?: string; // CPF Autorizado
};

export type det = {
  nItem?: string; // Número do item
  prod?: prod; // Detalhamento de Produtos e Serviços
  imposto?: imposto; // Tributos incidentes no Produto ou Serviço
  nNF?: string; // Número da nota (campo personalizado)
  isMonofasico?: boolean;
  nbmST?: nbmST[];
  calcAntecipacao?: paramsCalcAntecipacao;
  formula?: ReactNode;
  valImposto?: number;
  aliqInterna?: number;
  aliqInterestadual?: number;
};

export type prod = {
  cProd: string; // Código do produto ou serviço. Preencher com CFOP caso se trate de itens não relacionados com mercadorias/produto e que o contribuinte não possua codificação própria. Formato ”CFOP9999”
  cEAN?: string; // GTIN (Global Trade Item Number) do produto, antigo código EAN ou código de barras
  xProd?: string; // Descrição do produto ou serviço
  NCM?: string; // Código NCM (8 posições), será permitida a informação do gênero (posição do capítulo do NCM) quando a operação não for de comércio exterior (importação/exportação) ou o produto não seja tributado pelo IPI. Em caso de item de serviço ou item que não tenham produto (Ex. transferência de crédito, crédito do ativo imobilizado, etc.), informar o código 00 (zeros) (v2.0)
  NVE?: string; // Codificação NVE - Nomenclatura de Valor Aduaneiro e Estatística.
  CEST?: string; // Codigo especificador da Substuicao Tributaria - CEST, que identifica a mercadoria sujeita aos regimes de  substituicao tributária e de antecipação do recolhimento  do imposto
  cBenef?: string; // Código de Benefício Fiscal na UF aplicado ao item
  EXTIPI?: string; // EX_TIPI
  CFOP?: string; // Código Fiscal de Operações e Prestações (Utilizar Tabela de CFOP)
  uCom?: string; // Unidade de medida comercial
  qCom?: string; // Quantidade Comercial  do produto, alterado para aceitar de 0 a 4 casas decimais e 11 inteiros
  vUnCom?: string; // Valor unitário de comercialização  - alterado para aceitar 0 a 10 casas decimais e 11 inteiros
  vProd?: string; // Valor bruto do produto ou serviço
  cEANTrib?: string; // GTIN (Global Trade Item Number) da unidade tributável, antigo código EAN ou código de barras
  uTrib?: string; // Unidade da medida tributável
  qTrib?: string; // Quantidade Tributável - alterado para aceitar de 0 a 4 casas decimais e 11 inteiros
  vUnTrib?: string; // Valor unitário de tributação - alterado para aceitar 0 a 10 casas decimais e 11 inteiros
  vFrete?: string; // Valor Total do Frete
  vSeg?: string; // Valor Total do Seguro
  vDesc?: string; // Valor Total da Desconto
  vOutro?: string; // Outras despesas acessórias
  indTot?: string; // Este campo deverá ser preenchido com: 0=o valor do item (vProd) não compõe o valor total da NF-e (vProd); 1=o valor do item (vProd) compõe o valor total da NF-e (vProd)
};

export type imposto = {
  ICMS?: ICMS; // Dados do ICMS Normal e ST
  PIS?: PIS; // Grupo PIS
  IPI?: IPI; // Grupo IPI
};

export type ICMS = {
  ICMS00?: ICMS00; // Tributação ICMS 00 - Tributada integralmente
  ICMS10?: ICMS10; // Grupo Tributação do ICMS = 10 - Tributada e com cobrança do ICMS por substituição tributária
  ICMSSN102?: ICMSSN102; // Grupo CRT=1 – Simples Nacional e CSOSN=102, 103, 300 ou 400
};

export type ICMS00 = {
  orig?: string; // origem da mercadoria: 0=Nacional; 1=Estrangeira - Importação direta; 2=Estrangeira - Adquirida no mercado interno
  CST?: string; // Tributação pelo ICMS: 00=Tributada integralmente
  modBC?: string; // Modalidade de determinação da BC do ICMS: 0=Margem Valor Agregado (%); 1=Pauta (valor); 2=Preço Tabelado Máx. (valor); 3=Valor da operação
  vBC?: string; // BC do ICMS
  pICMS?: string; // Alíquota do ICMS
  vICMS?: string; // Valor do ICMS
};

export type ICMS10 = {
  orig?: string /* origem da mercadoria: 0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8;
  1 - Estrangeira - Importação direta, exceto a indicada no código 6;
  2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7;
  3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%;
  4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes;
  5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%;
  6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural;
  7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural.
  8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%;*/;
  CST?: string; // Tributção pelo ICMS 10. 10=Tributada e com cobrança do ICMS por substituição tributária
  modBC?: string; // Modalidade de determinação da BC do ICMS: 0=Margem Valor Agregado (%); 1=Pauta (valor); 2=Preço Tabelado Máx. (valor); 3=Valor da operação
  vBC?: string; // Valor da BC do ICMS
  pICMS?: string; // Alíquota do ICMS
  vICMS?: string; // Valor do ICMS
};

export type ICMSSN102 = {
  orig?: string /* 0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8; 
  1 - Estrangeira - Importação direta, exceto a indicada no código 6;
  2 - Estrangeira - Adquirida no mercado interno, exceto a
  indicada no código 7;
  3 - Nacional, mercadoria ou bem com Conteúdo de Importação
  superior a 40% e inferior ou igual a 70%;
  4 - Nacional, cuja produção tenha sido feita em conformidade
  com os processos produtivos básicos de que tratam as
  legislações citadas nos Ajustes;
  5 - Nacional, mercadoria ou bem com Conteúdo de Importação
  inferior ou igual a 40%;
  6 - Estrangeira - Importação direta, sem similar nacional,
  constante em lista da CAMEX e gás natural;
  7 - Estrangeira - Adquirida no mercado interno, sem similar
  nacional, constante lista CAMEX e gás natural.
  8 - Nacional, mercadoria ou bem com Conteúdo de Importação
  superior a 70%;*/;

  CSOSN?: string /* Código de Situação da Operação – Simples Nacional
  102=Tributada pelo Simples Nacional sem permissão de
  crédito.
  103=Isenção do ICMS no Simples Nacional para faixa de
  receita bruta.
  300=Imune.
  400=Não tributada pelo Simples Nacional (v2.0) (v2.0) */;
};

export type PIS = {
  PISNT?: PISNT; // Grupo PIS não tributado
};

export type PISNT = {
  CST?: string /*Código de Situação Tributária do PIS
  04=Operação Tributável (tributação monofásica (alíquota zero));
  05=Operação Tributável (Substituição Tributária);
  06=Operação Tributável (alíquota zero);
  07=Operação Isenta da Contribuição;
  08=Operação Sem Incidência da Contribuição;
  09=Operação com Suspensão da Contribuição;*/;
};

export type IPI = {
  cEnq?: string; // Código de Enquadramento Legal do IPI
  IPITrib?: IPITrib; // Grupo do CST 00, 49, 50 e 99
};

export type IPITrib = {
  CST?: string /* Código da situação tributária do IPI
  00=Entrada com recuperação de crédito
  49=Outras entradas
  50=Saída tributada
  99=Outras saídas*/;
  vBC?: string; // Valor da BC do IPI
  pIPI?: string; // Alíquota do IPI
  vIPI?: string; // Valor do IPI
};

export type protNFe = {
  infProt?: infProt; // Informações do Protocolo de resposta. TAG a ser assinada
};

export type infProt = {
  tpAmb?: string /* Identificação do Ambiente: 1 – Produção / 2 - Homologação*/;
  verAplic?: string /* Versão do Aplicativo que processou o Lote.
  A versão deve ser iniciada com a sigla da UF
  nos casos de WS próprio ou a sigla SCAN,
  SVAN ou SVRS nos demais casos.*/;
  chNFe?: string; //Chave de Acesso da NF-e (vide item 5.4)
  dhRecbto?: Date /* Data e hora de processamento
  Formato = AAAA-MM-DDTHH:MM:SS
  Preenchido com data e hora da gravação da
  NF-e no Banco de Dados.
  Em caso de Rejeição, com data e hora do
  recebimento do Lote de NF-e enviado. */;
  nProt?: string; // Número do Protocolo da NF-e (vide item 5.6)
  digVal?: string; // Digest Value da NF-e processada
  cStat?: string; // Código do status da resposta para a NF-e (vide item 5.1.1).
  xMotivo?: string; // Descrição literal do status da resposta para a NF-e.
};

export interface INfeGroup {
  key: string;
  nfs: NF[];
}

export interface CFOPGroup {
  key: string;
  prods: det[];
}

export type nbmST = {
  nbm: string;
  cest: string;
  capitulo?: capituloST;
  aplicacao?: aplicacaoST[];
  mva?: mva[];
  descricao?: string;
  mensagem?: string;
};

export type mva = {
  valor: string;
  descricao?: string;
};

export type capituloST = {
  numero: string;
  descricao?: string;
};

export type aplicacaoST = {
  numero: string;
  descricao?: string;
};

export type ncmMonofasico = {
  ncm: string;
  grupo?: string;
  codGrupo?: string;
  subGrupo?: string;
  codSubgrupo?: string;
  excecao?: string;
};

export type SegregFaturamentoTotais = {
  valFaturamento?: number;
  valSTConfirm?: number;
  valSTParam?: number;
  valMonoConfirm?: number;
  valMonoParam?: number;
};

export type NFCalcEntradaTotais = {
  valFaturamento?: number;
  valSTConfirm?: number;
  valSTParam?: number;
  valMonoConfirm?: number;
  valMonoParam?: number;
};

export type ItemsRecSegregada = {
  itemsSTConfirm?: det[];
  itemsSTParam?: det[];
  itemsMonoConfirm?: det[];
  itemsMonoParam?: det[];
};

export type ILogin = {
  email: string;
  senha: string;
};

export type SNAnexo3 = {
  faixa: string;
  aliqNominalSN: number;
  valDeduzir: number;
  rbt12Min: number;
  rbt12Max: number;
  aliqNominalISS: number;
};

export type PdfItems = {
  str: string;
  dir: string;
  width: number;
  height: number;
  transform: number[];
  fontName: string;
};

export type RouteMap = {
  route: string;
  name: string;
  bgColor: string;
};

export type paramsNFe = {
  countItens?: number;
  tipoCalculo?: string;
  valImposto?: number;
};

export type paramsCalcAntecipacao = {
  tipoCalculo?: string;
  nbm?: string;
  cest?: string;
  capitulo?: capituloST;
  aplicacao?: aplicacaoST[];
  mva?: string;
  descricaoMva?: string;
  descricao?: string;
};

export type NFResume = {
  ide?: ide; // Informações de identificação da NF-e
  chNFe?: string; //Chave de Acesso da NF-e (vide item 5.4)
  emit?: emit; // Identificação do emitente da NF-e
  dest?: dest; // Identificação do Destinatário da NF-e
  total?: total;
  paramsNFe?: paramsNFe; // Parâmetros diversos para uso em desenvolvimento
  det?: det[]; // Detalhamento de Produtos e Serviços
};
