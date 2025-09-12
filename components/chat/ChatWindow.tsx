import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatThread, ChatMessage, SalesRecord } from '../../types';
import { continueChat } from '../../services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import ChatMessageComponent from './ChatMessage';
import { Icons } from '../../constants';

interface ChatWindowProps {
  thread: ChatThread;
  setThreads: React.Dispatch<React.SetStateAction<ChatThread[]>>;
  salesData: SalesRecord[];
}

const suggestionChips = ["Pricing Objection", "Follow-up Email", "Pipeline Risk"];

const ChatWindow: React.FC<ChatWindowProps> = ({ thread, setThreads, salesData }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [thread.messages]);

  const fetchAndStreamResponse = useCallback(async (currentMessages: ChatMessage[]) => {
    if (!currentMessages || currentMessages.length === 0) return;
    
    setIsLoading(true);
    try {
      const stream = await continueChat(currentMessages, salesData);
      
      let modelResponse = '';
      const modelMessageId = uuidv4();

      // Add a placeholder for the model's response
      setThreads(prev =>
        prev.map(t =>
          t.id === thread.id
            ? { ...t, messages: [...t.messages, { id: modelMessageId, role: 'model', text: '...' }] }
            : t
        )
      );

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setThreads(prev =>
          prev.map(t =>
            t.id === thread.id
              ? {
                  ...t,
                  messages: t.messages.map(m =>
                    m.id === modelMessageId ? { ...m, text: modelResponse } : m
                  ),
                }
              : t
          )
        );
      }
    } catch (error) {
        const errorMessage = {
            id: uuidv4(),
            role: 'model' as const,
            text: "Sorry, I encountered an error. Please check your API key and network connection."
        };
        setThreads(prev =>
            prev.map(t =>
              t.id === thread.id ? { ...t, messages: [...t.messages, errorMessage] } : t
            )
        );
      console.error("Error with Gemini API:", error);
    } finally {
      setIsLoading(false);
    }
  }, [thread.id, salesData, setThreads]);

  const handleSend = useCallback((messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = { id: uuidv4(), role: 'user', text: messageText };

    const isFirstUserMessage = thread.messages.length === 1 && thread.messages[0].role === 'model';
    
    setThreads(prev =>
      prev.map(t => {
        if (t.id === thread.id) {
          const newTitle = isFirstUserMessage 
            ? messageText.substring(0, 35) + (messageText.length > 35 ? '...' : '')
            : t.title;
          return { 
            ...t, 
            title: newTitle,
            messages: [...t.messages, userMessage] 
          };
        }
        return t;
      })
    );
  }, [thread.id, thread.messages, thread.title, setThreads]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const lastMessage = thread.messages[thread.messages.length - 1];
    if (lastMessage?.role === 'user') {
      fetchAndStreamResponse(thread.messages);
    }
  }, [thread.messages, isLoading, fetchAndStreamResponse]);
  
  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isLoading || !input.trim()) return;
      handleSend(input);
      setInput('');
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Chat with Sales Coach</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {thread.messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && thread.messages[thread.messages.length - 1].role === 'user' && (
           <div className="flex items-start space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">
                  <Icons.AI className="w-6 h-6 text-gray-600"/>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-lg">
                  <div className="animate-pulse flex space-x-2">
                    <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                    <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                    <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                  </div>
              </div>
           </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2 mb-2">
            {suggestionChips.map(chip => (
                <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {chip}
                </button>
            ))}
        </div>
        <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 bg-green-700 text-white rounded-md hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            <Icons.Send className="w-6 h-6"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;