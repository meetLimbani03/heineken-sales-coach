import React, { useState, useEffect } from 'react';
import { ChatThread, CoachInsight } from '../../types';
import { Icons } from '../../constants';
import CoachInsightCard from '../dashboard/CoachInsightCard';

interface InsightsProps {
  coachInsights: CoachInsight[];
  isLoadingInsights: boolean;
  onInsightClick: (prompt: string) => void;
}

interface ChatSidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string) => void;
  createNewThread: () => void;
}

interface MobileMenuProps extends ChatSidebarProps, InsightsProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
    onClose, 
    threads, 
    activeThreadId, 
    setActiveThreadId, 
    createNewThread,
    coachInsights,
    isLoadingInsights,
    onInsightClick,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setIsShowing(true);
  }, []);

  return (
    <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ${isShowing ? 'bg-opacity-50' : 'bg-opacity-0'}`}
            aria-hidden="true"
            onClick={onClose}
        ></div>

        {/* Sliding panel */}
        <div className={`fixed inset-y-0 left-0 w-80 bg-gray-100 shadow-xl transform transition-transform ease-in-out duration-300 ${isShowing ? 'translate-x-0' : '-translate-x-full'}`}>
             <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b">
                    <Icons.HeinekenLogo />
                    <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-200" aria-label="Close menu">
                        <Icons.Close className="h-6 w-6 text-gray-800" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Chat Section */}
                    <div className="bg-[#006A42] text-white p-4 rounded-lg">
                        <button 
                            onClick={createNewThread}
                            className="w-full mb-4 flex items-center justify-between p-3 text-left font-semibold rounded-lg bg-white text-[#006A42] hover:bg-gray-200 transition-colors shadow"
                        >
                            <span>New Chat</span>
                            <Icons.Plus className="w-5 h-5"/>
                        </button>
                        <div className="flex-1">
                            <span className="text-xs font-semibold text-green-200 px-2 uppercase tracking-wider">Recent Chats</span>
                            <nav className="mt-2 space-y-1">
                            {threads.map(thread => (
                                <button
                                key={thread.id}
                                onClick={() => setActiveThreadId(thread.id)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md truncate transition-colors ${
                                    activeThreadId === thread.id ? 'bg-green-800' : 'hover:bg-green-700'
                                }`}
                                >
                                {thread.title}
                                </button>
                            ))}
                            </nav>
                        </div>
                    </div>

                    {/* Insights Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">Coach Insights</h2>
                        
                        {isLoadingInsights ? (
                            <p>Loading insights...</p>
                        ) : (
                            coachInsights.map((insight, index) => (
                                <CoachInsightCard key={index} insight={insight} onClick={() => onInsightClick(insight.prompt)} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MobileMenu;
