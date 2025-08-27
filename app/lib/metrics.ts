import type { CsvRow, ExcelRow } from "./types";

type KPIs = {
  totalSMEs: number | null;
  yoy: number | null;
  qoq: number | null;
  fastestSector: { name: string; yoy: number } | null;
  topRegion: { name: string; sharePct: number; count?: number } | null;
  latestYear?: number;
  latestQuarterLabel?: string;
};

export function computeKPIs(csv: CsvRow[], xls: ExcelRow[]): KPIs {
  // آخر سنة متوفرة في CSV (مالية)
  const years = [...new Set(csv.map(r => Number(r["السنة"])) )].filter(Boolean).sort((a,b)=>a-b);
  const latestYear = years.at(-1);
  const prevYear = years.at(-2);

  // إجمالي المنشآت من Excel (إذا ربع سنوي موجود نأخذ آخر صف، غيره نجمع آخر سنة)
  let latestExcelRows = xls.filter(r => !!r["السنة"]);
  const quarters = latestExcelRows
    .map(r => r["الربع"])
    .filter(Boolean) as (string|number)[];
  const hasQuarter = quarters.length > 0;

  let latestYearExcel = Math.max(...latestExcelRows.map(r=>Number(r["السنة"])));
  let latestQuarterLabel: string | undefined;

  if (hasQuarter) {
    // نختار أحدث سنة ثم أحدث ربع (ترتيب رباعي)
    const latestYearRows = latestExcelRows.filter(r => r["السنة"] === latestYearExcel);
    // نفترض قيم الربع مثل Q1/Q2/Q3/Q4 أو 1/2/3/4
    const toQ = (q:any) => typeof q === "string" && q.toUpperCase().startsWith("Q")
      ? Number(q.replace(/q/i,""))
      : Number(q);
    const maxQ = Math.max(...latestYearRows.map(r => toQ(r["الربع"])));
    latestExcelRows = latestYearRows.filter(r => toQ(r["الربع"]) === maxQ);
    latestQuarterLabel = `Q${maxQ} ${latestYearExcel}`;
  } else {
    // استخدم آخر سنة كاملة
    latestExcelRows = latestExcelRows.filter(r => r["السنة"] === latestYearExcel);
  }

  const sum = (arr:number[]) => arr.reduce((a,b)=>a+(Number(b)||0),0);

  const totalSMEs = sum(latestExcelRows.map(r => Number(r["عدد المنشآت"]) || 0));

  // YoY من إجمالي المنشآت (Excel) بين آخر سنة وسابقها (لو ما فيه ربع)
  let yoy: number | null = null;
  if (!hasQuarter) {
    const prevYearTotal = sum(xls.filter(r => r["السنة"] === (latestYearExcel-1)).map(r => Number(r["عدد المنشآت"])||0));
    if (prevYearTotal>0) yoy = ((totalSMEs - prevYearTotal) / prevYearTotal) * 100;
  }

  // QoQ إن كان عندنا ربعيات
  let qoq: number | null = null;
  if (hasQuarter) {
    const toQ = (q:any)=> typeof q === "string" && q.toUpperCase().startsWith("Q") ? Number(q.replace(/q/i,"")) : Number(q);
    const latestQ = Math.max(...xls.filter(r=>r["السنة"]===latestYearExcel).map(r=>toQ(r["الربع"])).filter(Boolean));
    const prevQ = latestQ - 1;
    const cur = sum(xls.filter(r=>r["السنة"]===latestYearExcel && toQ(r["الربع"])===latestQ).map(r=>Number(r["عدد المنشآت"])||0));
    const prev = sum(xls.filter(r=>r["السنة"]===latestYearExcel && toQ(r["الربع"])===prevQ).map(r=>Number(r["عدد المنشآت"])||0));
    if (prev>0) qoq = ((cur - prev) / prev) * 100;
  }

  // القطاع الأسرع نموًا (YoY) من CSV (مالية): نقارن آخر سنة وسابقتها بالإيرادات/الفائض أو إجمالي المنشآت إن توفّر
  let fastestSector: KPIs["fastestSector"] = null;
  if (latestYear && prevYear) {
    const bySector = (year:number) => {
      // نستخدم الفائض_موزع إن وجد، وإلا الإيرادات_موزع، وإلا إجمالي_عدد_المنشآت
      const map = new Map<string, number>();
      for (const r of csv.filter(r=>Number(r["السنة"])===year)) {
        const val = Number(r["الفائض_موزع"]) || Number(r["الإيرادات_موزع"]) || Number(r["إجمالي_عدد_المنشآت"]) || 0;
        map.set(r["القطاع_العام"], (map.get(r["القطاع_العام"])||0) + val);
      }
      return map;
    };
    const curS = bySector(latestYear);
    const prevS = bySector(prevYear);
    let best = { name: "", yoy: -Infinity };
    for (const [sec, curVal] of curS.entries()) {
      const pv = prevS.get(sec) || 0;
      if (pv>0) {
        const y = ((curVal - pv)/pv)*100;
        if (y > best.yoy) best = { name: sec, yoy: y };
      }
    }
    if (best.name) fastestSector = best;
  }

  // المنطقة الأعلى تركّزًا من Excel (أكبر حصة من إجمالي المنشآت في أحدث فترة)
  let topRegion: KPIs["topRegion"] = null;
  if (latestExcelRows.length) {
    const byRegion = new Map<string, number>();
    for (const r of latestExcelRows) {
      const v = Number(r["عدد المنشآت"])||0;
      byRegion.set(r["المنطقة"], (byRegion.get(r["المنطقة"])||0) + v);
    }
    let best: any = { name: "", val: 0 };
    for (const [k,v] of byRegion.entries()) if (v > best.val) best = { name: k, val: v };
    if (best.val>0) topRegion = { name: best.name, sharePct: (best.val/totalSMEs)*100, count: best.val };
  }

  return { totalSMEs, yoy, qoq, fastestSector, topRegion, latestYear: latestYear ?? latestYearExcel, latestQuarterLabel };
}

// ===== Data for charts =====

// Line (الإيرادات/النفقات/الفائض) عبر السنوات
export function seriesFinance(csv: CsvRow[]) {
  const agg = new Map<number, { rev: number; exp: number; sur: number }>();
  for (const r of csv) {
    const y = Number(r["السنة"]); if (!y) continue;
    const cur = agg.get(y) || { rev:0, exp:0, sur:0 };
    cur.rev += Number(r["الإيرادات_موزع"])||0;
    cur.exp += Number(r["النفقات_موزع"])||0;
    cur.sur += Number(r["الفائض_موزع"])||0;
    agg.set(y, cur);
  }
  const years = [...agg.keys()].sort((a,b)=>a-b);
  return {
    labels: years.map(String),
    revenue: years.map(y => agg.get(y)!.rev),
    expenses: years.map(y => agg.get(y)!.exp),
    surplus: years.map(y => agg.get(y)!.sur),
  };
}

// Stacked Bar (عدد المنشآت حسب الحجم) عبر السنوات
export function seriesSizesByYear(xls: ExcelRow[]) {
  const agg = new Map<number, { micro:number; small:number; medium:number }>();
  for (const r of xls) {
    const y = Number(r["السنة"]); if (!y) continue;
    const cur = agg.get(y) || { micro:0, small:0, medium:0 };
    cur.micro += Number(r["عدد المنشآت متناهية الصغر"])||0;
    cur.small += Number(r["عدد المنشآت الصغيرة"])||0;
    cur.medium += Number(r["عدد المنشآت المتوسطة"])||0;
    agg.set(y, cur);
  }
  const years = [...agg.keys()].sort((a,b)=>a-b);
  return {
    labels: years.map(String),
    micro: years.map(y=>agg.get(y)!.micro),
    small: years.map(y=>agg.get(y)!.small),
    medium: years.map(y=>agg.get(y)!.medium),
  };
}

// Donut لأحدث فترة (توزيع الأحجام)
export function donutLatestSize(xls: ExcelRow[]) {
  const latest = Math.max(...xls.map(r=>Number(r["السنة"])).filter(Boolean));
  const rows = xls.filter(r=>r["السنة"]===latest);
  const sum = (k:string)=> rows.reduce((a,r)=>a+(Number((r as any)[k])||0),0);
  const micro = sum("عدد المنشآت متناهية الصغر");
  const small = sum("عدد المنشآت الصغيرة");
  const medium = sum("عدد المنشآت المتوسطة");
  return {
    labels: ["متناهية", "صغيرة", "متوسطة"],
    values: [micro, small, medium],
  };
}

// Choropleth: عدد المنشآت حسب المنطقة (أحدث فترة)
export function regionCountsLatest(xls: ExcelRow[]) {
  const latest = Math.max(...xls.map(r=>Number(r["السنة"])).filter(Boolean));
  const latestRows = xls.filter(r=>r["السنة"]===latest);
  const map = new Map<string, number>();
  for (const r of latestRows) {
    const v = Number(r["عدد المنشآت"])||0;
    map.set(r["المنطقة"], (map.get(r["المنطقة"])||0)+v);
  }
  return map; // region -> count
}
