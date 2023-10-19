//"use client";

export const parsePDFService = {
  teste,
  readPDFPages,
};

const { PdfReader } = require("pdfreader");

function readPDFPages(buffer: any, reader = new PdfReader()) {
  return new Promise((resolve, reject) => {
    let pages: any = [];
    reader.parseBuffer(
      buffer,
      (err: any, item: { page: any; text: any; y: string | number }) => {
        if (err) reject(err);
        else if (!item) resolve(pages);
        else if (item.page) pages.push({});
        else if (item.text) {
          const row = pages[pages.length - 1][item.y] || [];
          row.push(item.text);
          pages[pages.length - 1][item.y] = row;
        }
      }
    );
  });
}

function teste(data: any) {
  //return gettext("./support/extrato.pdf")
}

function parseTodd(pages: any[]) {
  const page = pages[0]; // We know there's only going to be one page

  // Declarative map of PDF data that we expect, based on Todd's structure
  const fields = {
    empresa: { row: "9.631", index: 1 },
    pa: { row: "13.319", index: 0 },
    rbt12: { row: "17.444", index: 2 },
  };

  const data = {};

  // Assign the page data to an object we can return, as per
  // our field specification
  /*Object.keys(fields).forEach((key) => {
    const field = fields[key];
    const val = page[field.row][field.index];

    // We don't want to lose leading zeros here, and can trust
    // any backend / data handling to worry about that. This is
    // why we don't coerce to Number.
    data[key] = val;
  });*/
  // Manually fixing up some text fields so theyre usable
  // data.reqID = data.reqID.slice("Requsition ID: ".length);
  // data.date = data.date.slice("Date: ".length);

  return data;
}

export async function parse(buf: any, reader: any) {
  //const data: any = await readPDFPages(buf, reader);
  //console.log({'beforeParse': data});
  //const parsedData = parseTodd(data);
  //return data;
  //return parsedData;
}
