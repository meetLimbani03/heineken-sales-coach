import React from 'react';
import { Meeting } from '../../types';
import { Icons } from '../../constants';

interface MeetingCardProps {
  meeting: Meeting;
  onClick: (meeting: Meeting) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onClick }) => {
  const isCompleted = meeting.status === 'Completed';

  return (
    <button 
        onClick={() => onClick(meeting)} 
        className={`bg-white p-4 rounded-lg shadow-sm text-left w-full h-full flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${isCompleted ? 'bg-gray-50' : ''}`}
    >
        <div className="flex items-start space-x-3 mb-2">
            <div className={`flex-shrink-0 p-2 rounded-full ${isCompleted ? 'bg-gray-200' : 'bg-green-100'}`}>
                <Icons.Calendar className={`w-5 h-5 ${isCompleted ? 'text-gray-500' : 'text-green-800'}`}/>
            </div>
            <div className="flex-1">
                <p className={`font-bold text-md ${isCompleted ? 'text-gray-600' : 'text-gray-800'}`}>{meeting.accountName}</p>
                <p className="text-sm text-gray-500">{meeting.time}</p>
            </div>
        </div>
        <div className="flex justify-end">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isCompleted 
                ? 'bg-gray-200 text-gray-700' 
                : 'bg-blue-100 text-blue-800'
            }`}>
                {meeting.status}
            </span>
        </div>
    </button>
  );
};

export default MeetingCard;