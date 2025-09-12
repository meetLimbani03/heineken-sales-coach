import React from 'react';
import { CoachInsight } from '../../types';
import { Icons } from '../../constants';

interface CoachInsightCardProps {
  insight: CoachInsight;
  onClick: () => void;
}

const insightConfig = {
    Upsell: {
        icon: <Icons.ActiveDeals className="w-5 h-5 text-green-700" />,
        color: 'bg-green-50 border-green-200 hover:bg-green-100',
    },
    Risk: {
        icon: <Icons.DealRisks className="w-5 h-5 text-red-700" />,
        color: 'bg-red-50 border-red-200 hover:bg-red-100',
    },
    Promotion: {
        icon: <Icons.ProTips className="w-5 h-5 text-purple-700" />,
        color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    },
    Performance: {
        icon: <Icons.Target className="w-5 h-5 text-yellow-700" />,
        color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    },
    Opportunity: {
        icon: <Icons.KeyAccounts className="w-5 h-5 text-blue-700" />,
        color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    },
};


const CoachInsightCard: React.FC<CoachInsightCardProps> = ({ insight, onClick }) => {
  const config = insightConfig[insight.type] || insightConfig.Opportunity;

  return (
    <button onClick={onClick} className={`w-full text-left p-3 rounded-lg border ${config.color} shadow-sm transition-colors duration-200`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          {config.icon}
        </div>
        <div className="ml-3 flex-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{insight.type}</span>
          <h3 className="font-bold text-gray-800 text-sm leading-tight">{insight.title}</h3>
          <p className="text-gray-600 text-xs mt-1">{insight.description}</p>
        </div>
      </div>
    </button>
  );
};

export default CoachInsightCard;
