import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_JOURNAL_ENTRY_MUTATION = gql`
  mutation DeleteJournalEntryMutation($id: Int!) {
    deleteJournalEntry(id: $id) {
      id
    }
  }
`

const JournalEntry = ({ journalEntry }) => {
  const [deleteJournalEntry] = useMutation(DELETE_JOURNAL_ENTRY_MUTATION, {
    onCompleted: () => {
      toast.success('JournalEntry deleted')
      navigate(routes.journalEntries())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete journalEntry ' + id + '?')) {
      deleteJournalEntry({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            JournalEntry {journalEntry.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{journalEntry.id}</td>
            </tr>
            <tr>
              <th>Profile id</th>
              <td>{journalEntry.profileId}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{journalEntry.title}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{journalEntry.content}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(journalEntry.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editJournalEntry({ id: journalEntry.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(journalEntry.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default JournalEntry
