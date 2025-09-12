
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  percentage?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-center items-center h-full min-h-[110px] text-center">
      <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-green-800">{value}</p>
      {percentage !== undefined && (
        <p className="text-sm text-gray-500">({percentage}%)</p>
      )}
    </div>
  );
};

export default StatCard;
