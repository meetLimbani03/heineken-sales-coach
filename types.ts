// FIX: Populating the types file with all necessary type definitions for the application.
export interface User {
  name: string;
  email: string;
  repCode: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface ChatThread {
  id:string;
  title: string;
  messages: ChatMessage[];
}

export interface SalesRecord {
  [key: string]: string | number;
  'Year': number;
  'Month': string;
  'Trans Date': string;
  'account_name': string;
  'Qty in HLs': number;
  'Qty in Crate/Carton': number;
  'Brand': string;
  'LineExtension': string;
  'SalesRep': string;
}

export interface Meeting {
  id: string;
  accountName: string;
  time: string; // The formatted string for display
  startTime: string; // ISO 8601 string for sorting
  status: 'Scheduled' | 'Completed';
  objective: string;
  currentIssues: string[];
}

export type InsightType = 'Upsell' | 'Risk' | 'Promotion' | 'Performance' | 'Opportunity';

export interface CoachInsight {
  type: InsightType;
  title: string;
  description: string;
  prompt: string;
}

export interface MeetingNotes {
  [key: string]: string;
}

// Types for Outlet Snapshot
export interface OutletPerformance {
  totalVolume: { ly: number; ytd: number };
  channelShare: { ly: number; ytd: number };
  ams: { ly: number; ytd: number };
}

export interface OutletVolumeTrend {
  year: number | string;
  label: string;
  sales: number;
}

export interface OutletBrandSplit {
  brand: string;
  percentage: number;
}

export interface OutletContractVolume {
  year: number;
  volume: number;
}

export interface OutletDetails {
  accountName: string;
  address: string;
  salesRep: string;
  owner: string;
  outletCount: number;
  performance: OutletPerformance;
  classification: string;
  createdDate: string;
  latestOrderDate: string;
  outletType: string;
  marketShare: string;
  volumeTrend: OutletVolumeTrend[];
  brandSplit: OutletBrandSplit[];
  contractVolume: OutletContractVolume[];
}