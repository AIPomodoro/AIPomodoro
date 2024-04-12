import React from 'react'

import gql from 'graphql-tag'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import JournalModal from 'src/components/JournalModal/JournalModal'

const CREATE_JOURNAL_ENTRY_MUTATION = gql`
  mutation CreateJournalEntryMutation($input: CreateJournalEntryInput!) {
    createJournalEntry(input: $input) {
      id
    }
  }
`

const GET_JOURNAL_ENTRIES_BY_PROFILE_ID = gql`
  query GetJournalEntriesByProfileId($profileId: Int!) {
    profilesJournal(profileId: $profileId) {
      id
      title
      content
      createdAt
    }
  }
`

const JournalModalCell = ({ onClose, pipeyCall }) => {
  const { loading, currentUser } = useAuth()
  if (loading) return null

  const [createJournalEntry] = useMutation(CREATE_JOURNAL_ENTRY_MUTATION)

  // conditionally call useQuery based on the availability of currentUser.profile.id
  const {
    data: journalEntriesData,
    loading: journalEntriesLoading,
    error: journalEntriesError,
  } = useQuery(GET_JOURNAL_ENTRIES_BY_PROFILE_ID, {
    variables: { profileId: currentUser?.profile?.id },
    skip: !currentUser?.profile?.id, // skip querying if profileId is not available
  })

  const handleEntrySubmit = async (entry) => {
    await createJournalEntry({ variables: { input: entry } })
    pipeyCall()
    onClose()
  }

  if (journalEntriesLoading) return 'Loading...'
  if (journalEntriesError) return `Error: ${journalEntriesError.message}`

  console.log(journalEntriesData)
  return (
    <JournalModal
      onClose={onClose}
      pipeyCall={pipeyCall}
      onSubmit={handleEntrySubmit}
      journalEntries={journalEntriesData?.profilesJournal}
    />
  )
}

export default JournalModalCell
