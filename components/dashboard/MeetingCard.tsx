import React from 'react';
import { Meeting } from '../../types';
import { Icons } from '../../constants';

interface MeetingCardProps {
  meeting: Meeting;
  onClick: (meeting: Meeting) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onClick }) => {
  return (
    <button 
        onClick={() => onClick(meeting)} 
        className="bg-white p-4 rounded-lg shadow-sm text-left w-full h-full flex flex-col justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
        <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
                <Icons.Calendar className="w-5 h-5 text-green-800"/>
            </div>
            <div>
                <p className="font-bold text-gray-800 text-md">{meeting.accountName}</p>
                <p className="text-sm text-gray-500">{meeting.time}</p>
            </div>
        </div>
    </button>
  );
};

export default MeetingCard;