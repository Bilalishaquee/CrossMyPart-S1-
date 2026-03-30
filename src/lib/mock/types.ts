export type SupplierKey = "digkey" | "lcsc" | "zephyr";

export type MatchStatus = "exact" | "compatible" | "different";

export interface AttributeCompare {
  name: string;
  searched: string;
  candidate: string;
  status: MatchStatus;
}

export interface PartOption {
  label: "Option A" | "Option B" | "Option C";
  supplierKey: SupplierKey;
  supplierName: string;
  tag: string;
  partNumber: string;
  manufacturer: string;
  price: number;
  currency: string;
  stock: number;
  stockLabel: string;
  matchScore?: number;
  attributes: AttributeCompare[];
  isPreferred?: boolean;
  disclosure?: string;
}

export interface SearchResultSet {
  query: string;
  options: [PartOption, PartOption, PartOption];
}

export interface BomLine {
  line: number;
  partNumber: string;
  qty: number;
  refDes: string;
  optionA: string;
  optionB: string;
  optionC: string;
  bestScore: number;
  status: "resolved" | "review" | "partial";
  savingsUsd?: number;
}

export interface OrderSummary {
  id: string;
  date: string;
  status: string;
  suppliers: string[];
  total: number;
  itemCount: number;
}
