import { Link, routes } from '@redwoodjs/router'

import JournalEntries from 'src/components/JournalEntry/JournalEntries'

export const QUERY = gql`
  query FindJournalEntries {
    journalEntries {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No journalEntries yet. '}
      <Link to={routes.newJournalEntry()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ journalEntries }) => {
  return <JournalEntries journalEntries={journalEntries} />
}
