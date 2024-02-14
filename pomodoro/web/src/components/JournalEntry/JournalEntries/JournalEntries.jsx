import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/JournalEntry/JournalEntriesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_JOURNAL_ENTRY_MUTATION = gql`
  mutation DeleteJournalEntryMutation($id: Int!) {
    deleteJournalEntry(id: $id) {
      id
    }
  }
`

const JournalEntriesList = ({ journalEntries }) => {
  const [deleteJournalEntry] = useMutation(DELETE_JOURNAL_ENTRY_MUTATION, {
    onCompleted: () => {
      toast.success('JournalEntry deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete journalEntry ' + id + '?')) {
      deleteJournalEntry({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Profile id</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {journalEntries.map((journalEntry) => (
            <tr key={journalEntry.id}>
              <td>{truncate(journalEntry.id)}</td>
              <td>{truncate(journalEntry.userId)}</td>
              <td>{truncate(journalEntry.profileId)}</td>
              <td>{truncate(journalEntry.title)}</td>
              <td>{truncate(journalEntry.content)}</td>
              <td>{timeTag(journalEntry.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.journalEntry({ id: journalEntry.id })}
                    title={'Show journalEntry ' + journalEntry.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editJournalEntry({ id: journalEntry.id })}
                    title={'Edit journalEntry ' + journalEntry.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete journalEntry ' + journalEntry.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(journalEntry.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JournalEntriesList
