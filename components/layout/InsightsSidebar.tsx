

import React from 'react';
import { Icons } from '../../constants';
import { SalesRecord, CoachInsight } from '../../types';
import CoachInsightCard from '../dashboard/CoachInsightCard';

interface InsightsSidebarProps {
  stats: {
    quarterTarget: number;
    achieved: number;
    keyAccounts: number;
    activeDeals: number;
  };
  coachInsights: CoachInsight[];
  isLoadingInsights: boolean;
  onInsightClick: (prompt: string) => void;
  salesData: SalesRecord[];
}

const InsightsSidebar: React.FC<InsightsSidebarProps> = ({ stats, coachInsights, isLoadingInsights, onInsightClick, salesData }) => {
  const percentage = stats.quarterTarget > 0 ? Math.round((stats.achieved / stats.quarterTarget) * 100) : 0;
  
  return (
    <aside className="w-96 bg-white border-l border-gray-200 p-4 flex flex-col h-full hidden lg:flex">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex-shrink-0">Coach Insights</h2>
      
      <div className="flex-1 overflow-y-auto space-y-3">
         <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
           <div className="flex items-center mb-2">
              <Icons.Target className="w-6 h-6 text-yellow-600"/>
              <h3 className="ml-3 font-bold text-gray-800">Target Tracker</h3>
           </div>
            <p className="font-semibold text-gray-700">{`€${(stats.achieved / 1000000).toFixed(1)} M / €${(stats.quarterTarget / 1000000).toFixed(1)} M (${percentage}%)`}</p>
            <p className="text-xs text-gray-500 mt-1">Push one more case per week to hit stretch.</p>
        </div>

        {isLoadingInsights ? (
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg border animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                ))}
            </div>
        ) : (
            coachInsights.map((insight, index) => (
                <CoachInsightCard key={index} insight={insight} onClick={() => onInsightClick(insight.prompt)} />
            ))
        )}
      </div>
    </aside>
  );
};

export default InsightsSidebar;