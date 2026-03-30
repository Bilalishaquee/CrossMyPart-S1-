import type { AttributeCompare, MatchStatus, PartOption, SearchResultSet } from "./types";

function baseAttrs(
  searched: { v: string; pkg: string; tol: string; temp: string; rating: string },
  a: { v: string; pkg: string; tol: string; temp: string; rating: string },
  statuses: [MatchStatus, MatchStatus, MatchStatus, MatchStatus, MatchStatus]
): AttributeCompare[] {
  return [
    { name: "Voltage", searched: searched.v, candidate: a.v, status: statuses[0] },
    { name: "Package", searched: searched.pkg, candidate: a.pkg, status: statuses[1] },
    { name: "Tolerance", searched: searched.tol, candidate: a.tol, status: statuses[2] },
    { name: "Temperature Range", searched: searched.temp, candidate: a.temp, status: statuses[3] },
    { name: "Current Rating", searched: searched.rating, candidate: a.rating, status: statuses[4] },
  ];
}

const searchedSTM = {
  v: "3.3 V",
  pkg: "LQFP-100",
  tol: "—",
  temp: "-40°C to +85°C",
  rating: "—",
};

export function buildMockResult(query: string): SearchResultSet {
  const q = query.trim().toUpperCase() || "STM32F407VGT6";

  const optionA: PartOption = {
    label: "Option A",
    supplierKey: "digkey",
    supplierName: "DigiKey",
    tag: "Exact Match",
    partNumber: q.includes("STM") ? "STM32F407VGT6" : q,
    manufacturer: "STMicroelectronics",
    price: 18.42,
    currency: "USD",
    stock: 12400,
    stockLabel: "In stock",
    matchScore: 100,
    attributes: baseAttrs(
      searchedSTM,
      { v: "3.3 V", pkg: "LQFP-100", tol: "—", temp: "-40°C to +85°C", rating: "—" },
      ["exact", "exact", "exact", "exact", "exact"]
    ),
  };

  const optionB: PartOption = {
    label: "Option B",
    supplierKey: "lcsc",
    supplierName: "LCSC",
    tag: "Best Asian Alternative",
    partNumber: q.includes("STM") ? "C15742" : `${q}-ALT`,
    manufacturer: "STMicroelectronics",
    price: 14.88,
    currency: "USD",
    stock: 8900,
    stockLabel: "In stock",
    matchScore: 94,
    attributes: baseAttrs(
      searchedSTM,
      { v: "3.3 V", pkg: "LQFP-100", tol: "±5%", temp: "-40°C to +85°C", rating: "—" },
      ["exact", "exact", "compatible", "exact", "exact"]
    ),
  };

  const optionC: PartOption = {
    label: "Option C",
    supplierKey: "zephyr",
    supplierName: "Zephyr Technologies",
    tag: "Preferred · Lowest Price",
    partNumber: q.includes("STM") ? "STM32F407VGT6" : q,
    manufacturer: "STMicroelectronics",
    price: 13.25,
    currency: "USD",
    stock: 5600,
    stockLabel: "In stock",
    matchScore: 97,
    isPreferred: true,
    disclosure:
      "Fulfilled by Zephyr Technologies — CrossMyPart’s preferred distributor, selected for competitive pricing.",
    attributes: baseAttrs(
      searchedSTM,
      { v: "3.3 V", pkg: "LQFP-100", tol: "—", temp: "-40°C to +105°C", rating: "—" },
      ["exact", "exact", "exact", "compatible", "exact"]
    ),
  };

  return { query: q, options: [optionA, optionB, optionC] };
}

export const SAMPLE_PARTS = [
  "MT25QU512ABB",
  "STM32F407VGT6",
  "TPS5430DDAR",
  "LM358DR",
  "ATMEGA328P-AU",
  "SN74LVC245APWR",
];

export function suggestParts(prefix: string): string[] {
  if (prefix.length < 4) return [];
  const p = prefix.toUpperCase();
  return SAMPLE_PARTS.filter((s) => s.includes(p)).slice(0, 8);
}
