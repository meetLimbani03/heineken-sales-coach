import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Icons } from '../../constants';

interface ProfilePageProps {
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
            <h2 className="text-2xl font-bold text-[#006A42]">My Profile</h2>
            <button onClick={onBack} className="text-sm text-green-700 hover:underline flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </button>
        </div>
        <Icons.HeinekenLogo />
      </div>

      <div className="flex items-center space-x-6">
        <div className="p-4 bg-gray-100 rounded-full">
          <Icons.User className="w-16 h-16 text-gray-600" />
        </div>
        <div className="space-y-2">
            <div className="w-full">
                <label className="text-sm font-semibold text-gray-500">Name</label>
                <p className="text-lg text-gray-800 font-medium">{user.name}</p>
            </div>
            <div className="w-full">
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <p className="text-lg text-gray-800 font-medium">{user.email}</p>
            </div>
             <div className="w-full">
                <label className="text-sm font-semibold text-gray-500">Sales Rep Code</label>
                <p className="text-lg text-gray-800 font-medium">{user.repCode}</p>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProfilePage;
