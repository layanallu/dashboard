"use client";
import Papa from "papaparse";
import readXlsx from "read-excel-file";

import type { CsvRow, ExcelRow } from "./types";

export async function loadCsvFinance(url = "/data/SMEs.csv"): Promise<CsvRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (res) => resolve(res.data.filter(Boolean)),
      error: reject,
      encoding: "utf-8",
    });
  });
}

export async function loadExcelCounts(url = "/data/NumberOfSMEs.xlsx"): Promise<ExcelRow[]> {
  const rows = await readXlsx(url);
  const header = rows[0] as string[];
  const out: ExcelRow[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj: any = {};
    header.forEach((h, idx) => (obj[h] = row[idx]));
    // Normalize types
    obj["السنة"] = Number(obj["السنة"]);
    if ("عدد المنشآت" in obj && typeof obj["عدد المنشآت"] === "string") {
      obj["عدد المنشآت"] = Number(obj["عدد المنشآت"].toString().replace(/[^\d.-]/g, ""));
    }
    out.push(obj as ExcelRow);
  }
  return out;
}
