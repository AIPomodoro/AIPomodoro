import React, { useState } from 'react';
import { useAuth } from 'src/auth';

const JournalModal = ({ onClose, onSubmit, journalEntries }) => {
    const { currentUser } = useAuth();
    const [entry, setEntry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ content: entry, title: "Journal Entry", profileId: currentUser.profile.id });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="flex space-x-4 bg-white p-5 rounded-lg shadow-lg max-w-4xl w-full">
                {/* Entry Form Section */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-4">Journal Entry</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block mb-2"
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            placeholder="What's on your mind?"
                            rows="5"
                            required
                        ></textarea>
                        <div className="flex justify-between items-center">
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                            >
                                Save Entry
                            </button>
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>

                {/* Entries Display Section */}
                <div className="flex-1 overflow-auto">
                    <h3 className="text-lg font-semibold mb-2">Past Entries</h3>
                    <div className="space-y-4">
                        {journalEntries.map((entry) => (
                            <div key={entry.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="font-semibold">{entry.title}</h4>
                                <p className="text-sm text-gray-700">{entry.content}</p>
                                <p className="text-xs text-gray-500">{new Date(entry.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JournalModal;
