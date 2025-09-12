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
  time: string;
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
