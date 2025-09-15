// FIX: Populating the constants file with users, mock data, and icon components.
import React from 'react';
import { User, Meeting, OutletDetails } from './types';
import { v4 as uuidv4 } from 'uuid';

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

// Helper to parse DD-MM-YYYY HH:mm dates
const parseVisitDate = (dateStr: string): string => {
  const [date, time] = dateStr.split(' ');
  const [day, month, year] = date.split('-');
  return new Date(`${year}-${month}-${day}T${time}:00`).toISOString();
};

const formatVisitTime = (isoString: string): string => {
    const date = new Date(isoString);
    // More concise date format
    return date.toLocaleString('en-SG', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
    });
};

const CAYDEN_VISITS_RAW = [
    { accountName: 'Plasma Ktv Lounge (Prinsep Street)', startTime: '03-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Club Evo', startTime: '03-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Space 9L7', startTime: '03-10-2025 09:00', status: 'Scheduled' },
    { accountName: 'Empress Night Club', startTime: '03-10-2025 09:20', status: 'Scheduled' },
    { accountName: 'Chill', startTime: '03-10-2025 11:00', status: 'Scheduled' },
    { accountName: 'Cash Studio (Prinsep)', startTime: '02-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Ring Rang KT7', startTime: '02-10-2025 10:20', status: 'Scheduled' },
    { accountName: '9L Shot', startTime: '02-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'Live Zone', startTime: '02-10-2025 09:40', status: 'Scheduled' },
    { accountName: 'Club Pp', startTime: '02-10-2025 09:40', status: 'Scheduled' },
    { accountName: '9Lives', startTime: '02-10-2025 09:00', status: 'Scheduled' },
    { accountName: 'Lol (Life Of Liquor)', startTime: '30-09-2025 11:00', status: 'Scheduled' },
    { accountName: 'Icon 2', startTime: '30-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Up Club', startTime: '30-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Club Axis (Parklane)', startTime: '30-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Oscar Ktv', startTime: '30-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Xiang Yi', startTime: '30-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Cheng Du', startTime: '26-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'Tatawan', startTime: '26-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'SeBember Cafe & Pub (G/S)', startTime: '26-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Have Fun (Bugis+)', startTime: '26-09-2025 09:40', status: 'Completed' },
    { accountName: 'Chen Du', startTime: '26-09-2025 09:20', status: 'Completed' },
    { accountName: 'Empress Nightclub 3', startTime: '22-09-2025 09:20', status: 'Completed' },
    { accountName: 'Live Zone', startTime: '19-09-2025 09:40', status: 'Completed' },
    { accountName: '9Lives', startTime: '16-09-2025 09:00', status: 'Completed' },
    { accountName: 'Lol (Life Of Liquor)', startTime: '16-09-2025 10:00', status: 'Completed' },
    { accountName: 'Club Axis (Parklane)', startTime: '16-09-2025 10:40', status: 'Completed' },
    { accountName: 'Icon 2', startTime: '16-09-2025 09:40', status: 'Completed' },
    { accountName: 'Baby Angel/Baby Angel 2', startTime: '16-09-2025 09:40', status: 'Completed' },
    { accountName: 'Party K (North Bridge)', startTime: '15-09-2025 15:52', status: 'Completed' },
    { accountName: 'Baby Angel/Baby Angel 2', startTime: '16-09-2025 16:30', status: 'Scheduled' },
    { accountName: 'Party K (North Bridge)', startTime: '15-09-2025 16:52', status: 'Scheduled' },
];

const ZEN_VISITS_RAW = [
    { accountName: 'One-North Heng', startTime: '10-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Whampoa Terminal Cafeteria', startTime: '10-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'FoodLoft (308)', startTime: '10-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Fu 75L', startTime: '09-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Ang Lu La Restaurant', startTime: '09-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Soon Seng H-K S-D Cafe', startTime: '09-10-2025 09:40', status: 'Scheduled' },
    { accountName: 'Fell III Crescent Food Drink', startTime: '08-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Fu Siang Food Junction', startTime: '08-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'Fu-Fatt Eating House Pte Ltd', startTime: '08-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'New Trend Eating House', startTime: '07-10-2025 11:40', status: 'Scheduled' },
    { accountName: 'PinYHS Food House Pte Ltd', startTime: '07-10-2025 11:00', status: 'Scheduled' },
    { accountName: 'Lai Heng Lb (Joo 304)', startTime: '07-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Chuan Xiang Yuan', startTime: '07-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Hong Heng Soon Chen Tze', startTime: '06-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Wang Lu Food', startTime: '06-10-2025 10:00', status: 'Scheduled' },
    { accountName: '3D Kopi', startTime: '06-10-2025 09:40', status: 'Scheduled' },
    { accountName: 'Beer Garden', startTime: '03-10-2025 09:00', status: 'Scheduled' },
    { accountName: 'Hoc Seng F&B', startTime: '02-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Penang Seafood Restaurant', startTime: '02-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'Shan Long Nan Chu', startTime: '02-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'De\'Juva (Kallang Corner)', startTime: '01-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'Yihui T-Hang Kee Eating House', startTime: '01-10-2025 09:40', status: 'Scheduled' },
    { accountName: 'Jimmy\'s Corner', startTime: '30-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Thundougt Coffeehouse', startTime: '30-09-2025 10:00', status: 'Scheduled' },
    { accountName: '21A Coffee Shop', startTime: '06-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'Mu Zi Ang Lin', startTime: '06-10-2025 09:20', status: 'Scheduled' },
    { accountName: 'Shuang Ren Jian', startTime: '03-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Jalan Sultan Kop Pte. Ltd.', startTime: '03-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'Ming Ji', startTime: '03-10-2025 11:00', status: 'Scheduled' },
    { accountName: 'Funny', startTime: '03-10-2025 11:40', status: 'Scheduled' },
    { accountName: 'Hei Sheng Coffee House', startTime: '03-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Kim San Leng Food Court (Jln', startTime: '03-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Ksl Signboard (Geylang)', startTime: '03-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Kopitiam', startTime: '03-10-2025 10:40', status: 'Scheduled' },
    { accountName: '491 Cafe', startTime: '03-10-2025 09:20', status: 'Scheduled' },
    { accountName: 'Dong Feng Jiao Zi', startTime: '02-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Jing Jing Cafe (Geylang)', startTime: '02-10-2025 09:20', status: 'Scheduled' },
    { accountName: '251 Eating House', startTime: '02-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Goodluck Bak Kut Teh', startTime: '02-10-2025 09:40', status: 'Scheduled' },
    { accountName: 'Y-Le Ju Dong Bei Huo Guo', startTime: '02-10-2025 10:20', status: 'Scheduled' },
    { accountName: 'Happy Seafood Village', startTime: '01-10-2025 11:00', status: 'Scheduled' },
    { accountName: 'Aljunied Sixteen Coffee Shop', startTime: '01-10-2025 10:40', status: 'Scheduled' },
    { accountName: 'Yuri\'s Eating House', startTime: '01-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Zheng Ji Heathy Kitchen', startTime: '01-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Ding Feng', startTime: '01-10-2025 10:00', status: 'Scheduled' },
    { accountName: 'Yue Fu Restaurant', startTime: '01-10-2025 09:20', status: 'Scheduled' },
    { accountName: 'Space Box', startTime: '01-10-2025 09:40', status: 'Scheduled' },
    { accountName: '52 Beverage House Pte. Ltd.', startTime: '30-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Tze Siong Chee Shiong', startTime: '30-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Backlane (78 Aljunied)', startTime: '30-09-2025 11:00', status: 'Scheduled' },
    { accountName: 'MingLu Eating House', startTime: '30-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Ah Yap Traditional Coffee T', startTime: '30-09-2025 09:20', status: 'Scheduled' },
    { accountName: '49 Bizen Coffee Pte Ltd', startTime: '29-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Food Haven (Upper Changi Rd)', startTime: '29-09-2025 10:40', status: 'Completed' },
    { accountName: 'Wu Fu Fu Boon Keng Pte Ltd', startTime: '29-09-2025 10:20', status: 'Completed' },
    { accountName: 'Jiu Fu Food Court', startTime: '29-09-2025 09:00', status: 'Completed' },
    { accountName: 'Heng Cafe Hill-And Dot Coff', startTime: '26-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Ong Cafe', startTime: '26-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Bigim 55 E-Ating House', startTime: '26-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Backlane (78 Circuit Road)', startTime: '26-09-2025 11:00', status: 'Scheduled' },
    { accountName: 'Ubi 800', startTime: '25-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Joo Seng Food Place Pte. L', startTime: '25-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Ang Lu La Restaurant', startTime: '25-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Yi Cun Food (Macpherson P', startTime: '25-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Lc Food Centre (Ban Heo)', startTime: '25-09-2025 10:20', status: 'Completed' },
    { accountName: 'Crab At Bay Seafood Parad', startTime: '25-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Yi Jie Soon Village Seafood', startTime: '25-09-2025 09:00', status: 'Scheduled' },
    { accountName: 'Chuan Le Bai Zhan Wang', startTime: '25-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'Wu Fu Fu Kallang Pte Ltd', startTime: '24-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'Hong Da Kong Eating House', startTime: '24-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'New Trend Eating House', startTime: '24-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Broadway Food Centre (Prin', startTime: '24-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'PinYHS Food House Pte Ltd', startTime: '24-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Lou Zhong Zhong Eating Hou', startTime: '24-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Fu-Fatt Eating House Pte Ltd', startTime: '24-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'Yew Yew Yup Kee Eating Ho', startTime: '23-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Di-Em-Em Thai Kitchen', startTime: '23-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Hoc Seng F&B', startTime: '23-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Q\'Bistro', startTime: '23-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'Shu Hong Cha Shi', startTime: '23-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Bloom Boon Chin Kitchen (Sm', startTime: '22-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Shu Hong Cha Shi', startTime: '22-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'City-Foodcourt (Bendemeer)', startTime: '22-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Golden Thai Kitchen', startTime: '22-09-2025 11:00', status: 'Completed' },
    { accountName: 'Seng H-K & Cold Beverages', startTime: '22-09-2025 10:20', status: 'Completed' },
    { accountName: 'Thundougt Coffeehouse', startTime: '22-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Ming Ji', startTime: '19-09-2025 11:40', status: 'Scheduled' },
    { accountName: 'Funny', startTime: '19-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Jalan Sultan Kop Pte. Ltd.', startTime: '19-09-2025 10:00', status: 'Scheduled' },
    { accountName: '52 Seafood Kitchen (Jalan S', startTime: '19-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Ah-Fine Cold Beer', startTime: '19-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'Nan Hua Chang Seafood Re', startTime: '19-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Jing Jing Cafe (Geylang)', startTime: '18-09-2025 10:40', status: 'Scheduled' },
    { accountName: 'Tiaw Luang Suki', startTime: '18-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Hooi Loong Fish (North Bridg', startTime: '18-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'Happy Seafood Village', startTime: '17-09-2025 11:00', status: 'Scheduled' },
    { accountName: 'Jin Fang Yuan Jiao Zi Guan', startTime: '17-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Xian De Lai La Tong Seah', startTime: '17-09-2025 11:00', status: 'Scheduled' },
    { accountName: 'Broadway Food Centre (Sim', startTime: '17-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Nan Kee Nan Dar Lai Za', startTime: '17-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Chin Chin Restaurant', startTime: '17-09-2025 10:00', status: 'Scheduled' },
    { accountName: '52 Beverage House Pte. Ltd.', startTime: '16-09-2025 10:20', status: 'Scheduled' },
    { accountName: 'Bigim 55 E-Ating House (Vic', startTime: '16-09-2025 09:20', status: 'Scheduled' },
    { accountName: 'New Ubin (Chijmes)', startTime: '16-09-2025 10:00', status: 'Scheduled' },
    { accountName: 'Din Tai Fung (Raffles City)', startTime: '15-09-2025 09:40', status: 'Scheduled' },
    { accountName: 'Jiu Fu Food Court', startTime: '15-09-2025 09:00', status: 'Scheduled' },
];


const generateMeetings = (rawData: typeof CAYDEN_VISITS_RAW): Meeting[] => rawData.map(v => {
    const startTime = parseVisitDate(v.startTime);
    return {
        id: uuidv4(),
        accountName: v.accountName,
        startTime: startTime,
        time: formatVisitTime(startTime),
        status: v.status as 'Scheduled' | 'Completed',
        objective: `Discuss Q4 promotion and sales performance for ${v.accountName}.`,
        currentIssues: v.status === 'Scheduled' ? ['Review stock levels for key brands.'] : [],
    };
});

export const REP_MEETINGS: Record<string, Meeting[]> = {
    'Cayden Ong': generateMeetings(CAYDEN_VISITS_RAW),
    'Zen Huang': generateMeetings(ZEN_VISITS_RAW),
};

export const OUTLET_DATA: Record<string, OutletDetails> = {
  'Happy Seafood Village': {
    accountName: 'Happy Seafood Village',
    address: '1 Geylang Lorong 23 Highpoint Block 6, Singapore 388352',
    salesRep: 'Zen Huang',
    owner: 'Happy Seafood Village',
    outletCount: 1,
    performance: {
      totalVolume: { ly: 494.22, ytd: 196.54 },
      channelShare: { ly: 0.41, ytd: 0.40 },
      ams: { ly: 41.18, ytd: 32.76 },
    },
    classification: 'Gold',
    createdDate: '03-Nov-2016',
    latestOrderDate: '04-Jun-2025',
    outletType: 'Chinese Restaurant',
    marketShare: 'Open',
    volumeTrend: [
      { year: 2023, label: 'Sales LY', sales: 476.65 },
      { year: 2024, label: 'Sales LY', sales: 494.22 },
      { year: 'YTD 2025', label: 'Sales YTD', sales: 196.54 },
    ],
    brandSplit: [
      { brand: 'Heineken', percentage: 58.97 },
      { brand: 'Tiger', percentage: 27.57 },
      { brand: 'Guinness', percentage: 6.74 },
      { brand: 'Tiger Crystal', percentage: 6.72 },
    ],
    contractVolume: [
      { year: 2019, volume: 76.44 },
      { year: 2020, volume: 387.65 },
      { year: 2021, volume: 396.18 },
      { year: 2022, volume: 455.43 },
      { year: 2023, volume: 476.65 },
      { year: 2024, volume: 494.22 },
      { year: 2025, volume: 196.54 },
    ]
  },
  'Club Evo': {
    accountName: 'Club Evo',
    address: '530 North Bridge Rd, Singapore 188747',
    salesRep: 'Cayden Ong',
    owner: 'Evo Entertainment Pte Ltd',
    outletCount: 1,
    performance: {
      totalVolume: { ly: 350.8, ytd: 150.2 },
      channelShare: { ly: 0.35, ytd: 0.38 },
      ams: { ly: 29.23, ytd: 25.03 },
    },
    classification: 'Silver',
    createdDate: '15-Jan-2018',
    latestOrderDate: '03-Sep-2025',
    outletType: 'Nightclub',
    marketShare: 'Open',
    volumeTrend: [
      { year: 2023, label: 'Sales LY', sales: 320.5 },
      { year: 2024, label: 'Sales LY', sales: 350.8 },
      { year: 'YTD 2025', label: 'Sales YTD', sales: 150.2 },
    ],
    brandSplit: [
      { brand: 'Heineken', percentage: 70.15 },
      { brand: 'Guinness', percentage: 15.55 },
      { brand: 'Tiger', percentage: 10.21 },
      { brand: 'Erdinger', percentage: 4.09 },
    ],
    contractVolume: [
      { year: 2019, volume: 50.1 },
      { year: 2020, volume: 210.4 },
      { year: 2021, volume: 250.9 },
      { year: 2022, volume: 305.6 },
      { year: 2023, volume: 320.5 },
      { year: 2024, volume: 350.8 },
      { year: 2025, volume: 150.2 },
    ]
  }
};


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
  Building: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5v-4.5" /></IconBase>
  ),
  Chart: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></IconBase>
  ),
  PieChart: (props: React.SVGProps<SVGSVGElement>) => (
    <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></IconBase>
  ),
  BrandLogos: {
    Heineken: () => <svg viewBox="0 0 128 32" className="w-20 h-auto"><text x="64" y="20" fontSize="20" fill="#006A42" textAnchor="middle" fontWeight="bold">HEINEKEN</text></svg>,
    Tiger: () => <svg viewBox="0 0 128 32" className="w-16 h-auto"><text x="64" y="20" fontSize="20" fill="#0033A0" textAnchor="middle" fontWeight="bold">Tiger</text></svg>,
    Guinness: () => <svg viewBox="0 0 128 32" className="w-20 h-auto"><text x="64" y="20" fontSize="20" fill="#000000" textAnchor="middle" fontWeight="bold">GUINNESS</text></svg>,
    'Tiger Crystal': () => <svg viewBox="0 0 128 32" className="w-24 h-auto"><text x="64" y="20" fontSize="18" fill="#0033A0" textAnchor="middle" fontWeight="bold">Tiger Crystal</text></svg>,
    Erdinger: () => <svg viewBox="0 0 128 32" className="w-20 h-auto"><text x="64" y="20" fontSize="20" fill="#6A4529" textAnchor="middle" fontWeight="bold">ERDINGER</text></svg>,
    Default: () => <svg viewBox="0 0 128 32" className="w-16 h-auto"><text x="64" y="20" fontSize="20" fill="#888" textAnchor="middle" fontWeight="bold">Brand</text></svg>
  }
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