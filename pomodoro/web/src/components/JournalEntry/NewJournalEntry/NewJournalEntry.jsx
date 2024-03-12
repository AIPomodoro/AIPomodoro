import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import JournalEntryForm from 'src/components/JournalEntry/JournalEntryForm'

const CREATE_JOURNAL_ENTRY_MUTATION = gql`
  mutation CreateJournalEntryMutation($input: CreateJournalEntryInput!) {
    createJournalEntry(input: $input) {
      id
    }
  }
`

const NewJournalEntry = () => {
  const [createJournalEntry, { loading, error }] = useMutation(
    CREATE_JOURNAL_ENTRY_MUTATION,
    {
      onCompleted: () => {
        toast.success('JournalEntry created')
        navigate(routes.journalEntries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createJournalEntry({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New JournalEntry</h2>
      </header>
      <div className="rw-segment-main">
        <JournalEntryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewJournalEntry
