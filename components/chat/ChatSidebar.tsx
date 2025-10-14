import React from 'react';
import { ChatThread } from '../../types';
import { Icons } from '../../constants';

interface ChatSidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string) => void;
  createNewThread: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ threads, activeThreadId, setActiveThreadId, createNewThread }) => {
  return (
    <div className="w-64 bg-[#006A42] text-white p-4 flex-col h-full hidden lg:flex">
      <button 
        onClick={() => createNewThread()}
        className="w-full mb-6 flex items-center justify-between p-3 text-left font-semibold rounded-lg bg-white text-[#006A42] hover:bg-gray-200 transition-colors shadow"
      >
        <span>New Chat</span>
        <Icons.Plus className="w-5 h-5"/>
      </button>
      <div className="flex-1 overflow-y-auto">
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
  );
};

export default ChatSidebar;