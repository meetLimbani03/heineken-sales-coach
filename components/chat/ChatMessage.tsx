
import React from 'react';
import { ChatMessage } from '../../types';
import { Icons } from '../../constants';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="p-2 bg-yellow-400 rounded-full">
            <Icons.AI className="w-6 h-6 text-gray-800"/>
        </div>
      )}
      <div
        className={`rounded-lg p-3 max-w-lg ${
          isUser
            ? 'bg-green-700 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
       {isUser && (
        <div className="p-2 bg-gray-200 rounded-full">
            <Icons.User className="w-6 h-6 text-gray-600"/>
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;
