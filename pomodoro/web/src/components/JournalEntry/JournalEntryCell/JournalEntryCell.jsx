import JournalEntry from 'src/components/JournalEntry/JournalEntry'

export const QUERY = gql`
  query FindJournalEntryById($id: Int!) {
    journalEntry: journalEntry(id: $id) {
      id
      userId
      profileId
      title
      content
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>JournalEntry not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ journalEntry }) => {
  return <JournalEntry journalEntry={journalEntry} />
}
