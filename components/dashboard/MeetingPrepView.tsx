import React, { useState, useEffect } from 'react';
import { Meeting, SalesRecord, MeetingNotes } from '../../types';
import { Icons, PREP_STEPS } from '../../constants';
import { generateMeetingPrep } from '../../services/geminiService';

interface MeetingPrepViewProps {
  meeting: Meeting;
  onBack: () => void;
  salesData: SalesRecord[];
}

const PrepCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md flex flex-col animate-pulse">
        <div className="h-12 bg-gray-300 rounded-t-lg"></div>
        <div className="p-3 flex-grow">
            <div className="h-[250px] bg-gray-200 rounded"></div>
        </div>
    </div>
);


const MeetingPrepView: React.FC<MeetingPrepViewProps> = ({ meeting, onBack, salesData }) => {
    const [notes, setNotes] = useState<MeetingNotes>({});
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="bg-gray-50 rounded-lg p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                <div>
                    <button onClick={onBack} className="text-sm text-green-700 hover:underline flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back to Dashboard
                    </button>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#006A42]">Meeting Prep: {meeting.accountName}</h1>
                    <p className="text-gray-500 mt-1">{meeting.time}</p>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm w-full sm:w-auto flex-shrink-0"
                >
                    <Icons.AI className="w-5 h-5" />
                    <span>{isLoading ? 'Generating...' : 'Prepare with AI'}</span>
                </button>
            </div>
            
             <div className="mb-8 p-4 bg-white rounded-lg border shadow-sm">
                <h3 className="font-bold text-gray-800 text-lg">Objective</h3>
                <p className="text-gray-600 mt-1">{meeting.objective}</p>
                 <h3 className="font-bold text-gray-800 text-lg mt-4">Current Known Issues</h3>
                 <ul className="list-disc list-inside mt-1 text-gray-600 space-y-1">
                    {meeting.currentIssues.map((issue, index) => <li key={index}>{issue}</li>)}
                </ul>
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
             <p className="text-center text-gray-500 italic mt-8">Every great visit starts with a great plan</p>
        </div>
    );
};

export default MeetingPrepView;