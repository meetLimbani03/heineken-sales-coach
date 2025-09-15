import React, { useState } from 'react';
import { Meeting, SalesRecord, MeetingNotes, OutletDetails } from '../../types';
import { Icons, PREP_STEPS } from '../../constants';
import { generateMeetingPrep } from '../../services/geminiService';
import OutletSnapshotView from './OutletSnapshotView';
import VisitFeedbackView from './VisitFeedbackView';

interface MeetingPrepViewProps {
  meeting: Meeting;
  outletDetails: OutletDetails | null;
  onBack: () => void;
  salesData: SalesRecord[];
}

type Tab = 'prep' | 'snapshot' | 'feedback';

const PrepCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md flex flex-col animate-pulse">
        <div className="h-12 bg-gray-300 rounded-t-lg"></div>
        <div className="p-3 flex-grow">
            <div className="h-[250px] bg-gray-200 rounded"></div>
        </div>
    </div>
);

const MeetingPrepView: React.FC<MeetingPrepViewProps> = ({ meeting, outletDetails, onBack, salesData }) => {
    const [notes, setNotes] = useState<MeetingNotes>({});
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('prep');

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const generatedNotes = await generateMeetingPrep(meeting, salesData);
            setNotes(generatedNotes);
        } catch (error) {
            console.error("Failed to generate meeting prep notes:", error);
            const errorNotes: MeetingNotes = PREP_STEPS.reduce((acc, step) => {
                acc[step.key] = "Sorry, there was an error generating content. Please try again.";
                return acc;
            }, {} as MeetingNotes);
            setNotes(errorNotes);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNoteChange = (key: string, value: string) => {
        setNotes(prev => ({ ...prev, [key]: value }));
    };

    const TabButton: React.FC<{tab: Tab, label: string}> = ({tab, label}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === tab 
                ? 'bg-[#006A42] text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="mb-6">
                 <button onClick={onBack} className="text-sm text-green-700 hover:underline flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to Dashboard
                </button>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#006A42]">Meeting: {meeting.accountName}</h1>
                <p className="text-gray-500 mt-1">{meeting.time}</p>
            </div>
            
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-2" aria-label="Tabs">
                    <TabButton tab="prep" label="Meeting Prep" />
                    <TabButton tab="snapshot" label="Outlet Snapshot" />
                    <TabButton tab="feedback" label="Visit Feedback" />
                </nav>
            </div>

            <div>
                 {activeTab === 'prep' && (
                    <div>
                         <div className="text-center mb-6">
                             <button
                                onClick={handleGenerate}
                                disabled={isLoading}
                                className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg inline-flex items-center justify-center space-x-2 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-105 shadow-sm"
                            >
                                <Icons.AI className="w-5 h-5" />
                                <span>{isLoading ? 'Generating Notes...' : 'Prepare with AI'}</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {isLoading ? (
                                PREP_STEPS.map(step => <PrepCardSkeleton key={step.key} />)
                            ) : (
                                PREP_STEPS.map(step => (
                                    <div key={step.key} className="bg-white rounded-lg shadow-md flex flex-col">
                                        <h4 className="bg-[#006A42] text-white font-bold p-3 rounded-t-lg text-center">{step.title}</h4>
                                        <div className="p-3 flex-grow flex">
                                            <textarea
                                                id={step.key}
                                                className="w-full flex-grow p-2 border border-gray-200 rounded bg-white text-gray-900 focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 text-sm resize-none"
                                                placeholder={step.placeholder}
                                                value={notes[step.key] || ''}
                                                onChange={(e) => handleNoteChange(step.key, e.target.value)}
                                                rows={10}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'snapshot' && (
                    outletDetails 
                    ? <OutletSnapshotView outlet={outletDetails} />
                    : <div className="text-center p-8 bg-white rounded-lg shadow-inner">
                        <Icons.DealRisks className="w-12 h-12 mx-auto text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-800">No Outlet Data Available</h3>
                        <p className="mt-1 text-sm text-gray-500">Detailed performance data for this outlet could not be found.</p>
                      </div>
                )}

                {activeTab === 'feedback' && <VisitFeedbackView />}
            </div>
        </div>
    );
};

export default MeetingPrepView;