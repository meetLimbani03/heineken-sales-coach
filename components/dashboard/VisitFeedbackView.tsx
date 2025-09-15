import React, { useState } from 'react';

const VisitFeedbackView: React.FC = () => {
    const [feedback, setFeedback] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        if (!feedback.trim()) return;
        console.log('Feedback saved:', feedback);
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            setFeedback(''); // Optionally clear feedback after saving
        }, 3000); // Reset after 3 seconds
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Visit Feedback & Notes</h3>
            <p className="text-sm text-gray-600 mb-4">
                Record your observations, customer feedback, and any action items from your visit. This information will be saved for future reference.
            </p>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 text-sm"
                rows={12}
                placeholder="Enter your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                aria-label="Visit Feedback Input"
            />
            <div className="mt-4 flex justify-end items-center h-8">
                {isSaved && <p className="text-green-600 text-sm mr-4 transition-opacity duration-300">Feedback saved successfully!</p>}
                <button
                    onClick={handleSave}
                    disabled={!feedback.trim()}
                    className="bg-[#006A42] text-white font-bold py-2 px-6 rounded-lg hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Save Feedback
                </button>
            </div>
        </div>
    );
};

export default VisitFeedbackView;