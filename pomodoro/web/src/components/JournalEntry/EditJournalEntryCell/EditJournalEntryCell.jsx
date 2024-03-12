import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JournalEntryForm from 'src/components/JournalEntry/JournalEntryForm'

export const QUERY = gql`
  query EditJournalEntryById($id: Int!) {
    journalEntry: journalEntry(id: $id) {
      id
      profileId
      title
      content
      createdAt
    }
  }
`

const UPDATE_JOURNAL_ENTRY_MUTATION = gql`
  mutation UpdateJournalEntryMutation(
    $id: Int!
    $input: UpdateJournalEntryInput!
  ) {
    updateJournalEntry(id: $id, input: $input) {
      id
      profileId
      title
      content
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ journalEntry }) => {
  const [updateJournalEntry, { loading, error }] = useMutation(
    UPDATE_JOURNAL_ENTRY_MUTATION,
    {
      onCompleted: () => {
        toast.success('JournalEntry updated')
        navigate(routes.journalEntries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateJournalEntry({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit JournalEntry {journalEntry?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <JournalEntryForm
          journalEntry={journalEntry}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
