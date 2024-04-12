import React, { useState } from 'react'

import { useAuth } from 'src/auth'

const JournalModal = ({ onClose, pipeyCall, onSubmit, journalEntries }) => {
  const { currentUser } = useAuth()
  const [entry, setEntry] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      content: entry,
      title: 'Journal Entry',
      profileId: currentUser.profile.id,
    })
    pipeyCall()
    onClose()
  }

  const reversedJournalEntries = [...journalEntries].reverse();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex w-full max-w-4xl space-x-4 rounded-lg bg-white p-5 shadow-lg">
        {/* Entry Form Section */}
        <div className="flex-1">
          <h2 className="mb-4 text-xl font-semibold">Journal Entry</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="What's on your mind?"
              rows="5"
              required
            ></textarea>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </form>
        </div>

        {/* Entries Display Section */}
        <div className="flex-1 overflow-auto" style={{ maxHeight: '500px' }}>
          <h3 className="mb-2 text-lg font-semibold">Past Entries</h3>
          <div className="space-y-4 overflow-y-auto">
            {reversedJournalEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <h4 className="font-semibold">{entry.title}</h4>
                <p className="text-sm text-gray-700">{entry.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JournalModal
