import React, { useState } from 'react';

const JournalModal = ({ onClose, onSubmit }) => {
    const [entry, setEntry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ content: entry, title: "Journal Entry", profileId: 1 }); // Adjust according to your schema requirements
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
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
        </div>
    );
};

export default JournalModal;
