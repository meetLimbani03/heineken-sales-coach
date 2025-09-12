// FIX: Populating the constants file with users, mock data, and icon components.
import React from 'react';
import { User, Meeting } from './types';

export const USERS: Record<string, User> = {
  'cayden.ong@heineken.com': {
    name: 'Cayden Ong',
    email: 'cayden.ong@heineken.com',
    repCode: 'Cayden Ong',
  },
  'zen.huang@heineken.com': {
    name: 'Zen Huang',
    email: 'zen.huang@heineken.com',
    repCode: 'Zen Huang',
  },
};

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: '1',
    accountName: 'Zouk',
    time: 'Today, 2:00 PM',
    objective: 'Discuss Q4 promotion for Heineken Silver.',
    currentIssues: ['Competitor brand gaining traction.', 'Low stock of 32.5 CL bottles.'],
  },
  {
    id: '2',
    accountName: 'Club Cognac',
    time: 'Tomorrow, 11:00 AM',
    objective: 'Finalize contract renewal.',
    currentIssues: ['Negotiating volume discount.', 'Request for additional marketing support.'],
  },
    {
    id: '3',
    accountName: 'Broadway (Funan)',
    time: 'Tomorrow, 3:00 PM',
    objective: 'Preparing the visit to maximize its effectiveness and efficiency.',
    currentIssues: ['Low volume of Tiger beer lately.'],
  },
];


const IconBase: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {props.children}
  </svg>
);

// A simple placeholder logo
const HeinekenLogoSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="100" height="40" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="200" height="80" fill="#006A42"/>
        <text x="100" y="45" fontFamily="Helvetica, Arial, sans-serif" fontSize="32" fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">HEINEKEN</text>
        <path d="M90,15 L100,5 L110,15 Z" fill="#E50016" transform="translate(0, -2)"/>
    </svg>
  );

export const Icons = {
  HeinekenLogo: HeinekenLogoSVG,
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></IconBase>
  ),
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></IconBase>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></IconBase>
  ),
  AI: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 13.5l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 18l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 21.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 18l1.035-.259a3.375 3.375 0 002.456-2.456L18 13.5z" /></IconBase>
  ),
  Send: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></IconBase>
  ),
  Close: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></IconBase>
  ),
  Target: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></IconBase>
  ),
  Calendar: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" /></IconBase>
  ),
  ActiveDeals: (props: React.SVGProps<SVGSVGElement>) => (
     <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-3.94-3.94m3.94 3.94-3.94 3.94" /></IconBase>
  ),
  DealRisks: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></IconBase>
  ),
  ProTips: (props: React.SVGProps<SVGSVGElement>) => ( // Re-using AI icon for ProTips
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 13.5l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 18l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 21.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 18l1.035-.259a3.375 3.375 0 002.456-2.456L18 13.5z" /></IconBase>
  ),
  KeyAccounts: (props: React.SVGProps<SVGSVGElement>) => ( // Re-using User icon for KeyAccounts
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></IconBase>
  ),
};


export const PREP_STEPS = [
  {
    key: 'customerInfo',
    title: 'Customer Info',
    placeholder: '• Name of owner or key contact person\n• Outlet G/S/B tier and contractual terms\n• Check customer persona and motivation type (if possible)'
  },
  {
    key: 'analyzePerformance',
    title: 'Analyze Performance',
    placeholder: '• Historical sales performance of customer and competition activities\n• Assess nearby outlets and competition\n• Review customer info and actions from previous visit'
  },
  {
    key: 'setObjectives',
    title: 'Set Objectives',
    placeholder: '• Define key goals for the visit\n• Check SEM notes for past feedback, unresolved issues or promised actions etc.'
  },
  {
    key: 'prepareMaterials',
    title: 'Prepare Materials',
    placeholder: '• Check any relevant TM activations\n• Prepare selling stories or arguments\n• Prepare merchandising material / POSM / material / POSM / other necessary documents'
  }
];
