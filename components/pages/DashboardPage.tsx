import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../layout/Header';
import ChatSidebar from '../chat/ChatSidebar';
import StatCard from '../dashboard/StatCard';
import ChatWindow from '../chat/ChatWindow';
import { ChatThread, SalesRecord, Meeting, ChatMessage, CoachInsight, OutletDetails } from '../../types';
import { getSalesDataForRep } from '../../services/salesDataService';
import { generateCoachInsights } from '../../services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { REP_MEETINGS, OUTLET_DATA } from '../../constants';
import MeetingCard from '../dashboard/MeetingCard';
import MeetingPrepView from '../dashboard/MeetingPrepView';
import ProfilePage from './ProfilePage';
import InsightsSidebar from '../layout/InsightsSidebar';
import MobileMenu from '../layout/MobileMenu';


const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [coachInsights, setCoachInsights] = useState<CoachInsight[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  const [mainView, setMainView] = useState<'chat' | 'meetingPrep' | 'profile'>('chat');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedOutlet, setSelectedOutlet] = useState<OutletDetails | null>(null);

  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingPage, setMeetingPage] = useState(0);
  const MEETINGS_PER_PAGE = 3;


  useEffect(() => {
    if (user) {
      const data = getSalesDataForRep(user.repCode);
      setSalesData(data);

      const userMeetings = REP_MEETINGS[user.repCode] || [];
      const scheduled = userMeetings
        .filter(m => m.status === 'Scheduled')
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      
      const completed = userMeetings
        .filter(m => m.status === 'Completed')
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        
      setMeetings([...scheduled, ...completed]);
      
      const fetchInsights = async () => {
        setIsLoadingInsights(true);
        try {
          const insights = await generateCoachInsights(data);
          setCoachInsights(insights);
        } catch (error) {
          console.error("Failed to fetch coach insights:", error);
          setCoachInsights([{ type: 'Risk', title: 'Error', description: "Error fetching insights.", prompt: "Why did my insights fail to load?" }]);
        } finally {
          setIsLoadingInsights(false);
        }
      };
      
      fetchInsights();

       const initialThread: ChatThread = {
        id: uuidv4(),
        title: 'Sales Strategy Discussion',
        messages: [{
          id: uuidv4(),
          role: 'model',
          text: `Hello! I am your AI Sales Coach. How can I help you analyze your sales data today?`
        }],
      };
      setThreads([initialThread]);
      setActiveThreadId(initialThread.id);
    }
  }, [user]);

  const stats = useMemo(() => {
    if (!salesData.length) return { quarterTarget: 0, achieved: 0, keyAccounts: 0, activeDeals: 0 };
    
    const achieved = salesData.reduce((acc, record) => acc + (record['Qty in HLs'] * 800), 0);
    const uniqueAccounts = new Set(salesData.map(r => r.account_name)).size;
    
    const quarterTarget = user?.repCode === 'Cayden Ong' ? 2100000 : 1800000;
    
    return {
      quarterTarget: quarterTarget,
      achieved,
      keyAccounts: uniqueAccounts,
      activeDeals: 8,
    };
  }, [salesData, user]);

  const createNewThread = useCallback((firstUserMessage?: string) => {
    const newThreadId = uuidv4();
    const initialMessages: ChatMessage[] = [{
      id: uuidv4(),
      role: 'model' as const,
      text: `Hi ${user?.name.split(' ')[0]}! How can I help you?`,
    }];

    if (firstUserMessage) {
      initialMessages.push({ id: uuidv4(), role: 'user' as const, text: firstUserMessage });
    }

    const newThread: ChatThread = {
      id: newThreadId,
      title: firstUserMessage || 'New Chat',
      messages: initialMessages,
    };
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
    setMainView('chat');
  },[user]);

  const handleInsightClick = (insightText: string) => {
    createNewThread(insightText);
  };
  
  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    const outletData = OUTLET_DATA[meeting.accountName] || null;
    setSelectedOutlet(outletData);
    setMainView('meetingPrep');
  };

  const activeThread = threads.find(t => t.id === activeThreadId);
  
  const handleMobileMenuAction = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  const totalMeetingPages = Math.ceil(meetings.length / MEETINGS_PER_PAGE);
  const currentMeetings = meetings.slice(
      meetingPage * MEETINGS_PER_PAGE,
      (meetingPage + 1) * MEETINGS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} onProfileClick={() => setMainView('profile')} />
        {isMobileMenuOpen && (
            <MobileMenu
                onClose={() => setIsMobileMenuOpen(false)}
                threads={threads}
                activeThreadId={activeThreadId}
                setActiveThreadId={(id) => handleMobileMenuAction(() => { setActiveThreadId(id); setMainView('chat'); })}
                createNewThread={() => handleMobileMenuAction(() => createNewThread())}
                coachInsights={coachInsights}
                isLoadingInsights={isLoadingInsights}
                onInsightClick={(prompt) => handleMobileMenuAction(() => handleInsightClick(prompt))}
            />
        )}
        <div className="flex flex-1 overflow-hidden">
            <ChatSidebar 
                threads={threads}
                activeThreadId={activeThreadId}
                setActiveThreadId={(id) => {
                    setActiveThreadId(id);
                    setMainView('chat');
                }}
                createNewThread={createNewThread}
            />
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                {mainView === 'profile' && <ProfilePage onBack={() => setMainView('chat')} />}
                
                {mainView === 'meetingPrep' && selectedMeeting && (
                    <MeetingPrepView 
                        meeting={selectedMeeting}
                        outletDetails={selectedOutlet}
                        onBack={() => setMainView('chat')}
                        salesData={salesData.filter(d => d.account_name === selectedMeeting.accountName)}
                    />
                )}

                {mainView === 'chat' && (
                    <div className="flex flex-col gap-6 h-full">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Your Visits</h2>
                                {totalMeetingPages > 1 && (
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => setMeetingPage(p => p - 1)}
                                        disabled={meetingPage === 0}
                                        className="p-1.5 rounded-full bg-white border shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Previous meetings"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <span className="text-sm font-medium text-gray-600 w-12 text-center">{meetingPage + 1} / {totalMeetingPages}</span>
                                    <button 
                                        onClick={() => setMeetingPage(p => p + 1)}
                                        disabled={meetingPage >= totalMeetingPages - 1}
                                        className="p-1.5 rounded-full bg-white border shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Next meetings"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentMeetings.map(meeting => (
                                    <MeetingCard key={meeting.id} meeting={meeting} onClick={handleMeetingClick} />
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 h-full min-h-[500px]">
                        {activeThread && (
                            <ChatWindow 
                                key={activeThread.id} 
                                thread={activeThread} 
                                setThreads={setThreads} 
                                salesData={salesData} 
                            />
                            )}
                        </div>
                    </div>
                )}
            </main>
            <InsightsSidebar 
                stats={stats} 
                coachInsights={coachInsights} 
                isLoadingInsights={isLoadingInsights} 
                onInsightClick={handleInsightClick}
                salesData={salesData}
            />
        </div>
    </div>
  );
};

export default DashboardPage;