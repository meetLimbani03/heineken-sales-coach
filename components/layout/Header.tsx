import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Icons } from '../../constants';

interface HeaderProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onProfileClick }) => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-20 flex-shrink-0">
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-md hover:bg-gray-100" aria-label="Open menu">
           <Icons.Menu className="h-6 w-6 text-gray-700"/>
        </button>
        <Icons.HeinekenLogo />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 hidden sm:block">Welcome, {user?.name}</span>
        <div className="relative group">
           <button className="p-2 rounded-full hover:bg-gray-100">
             <Icons.User className="h-6 w-6 text-gray-700"/>
           </button>
           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
              <button onClick={onProfileClick} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
              <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
