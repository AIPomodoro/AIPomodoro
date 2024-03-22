import { Link, routes } from '@redwoodjs/router'

import ReinforcementModels from 'src/components/ReinforcementModel/ReinforcementModels'

export const QUERY = gql`
  query FindReinforcementModels {
    reinforcementModels {
      id
      userId
      modelData
      rating
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No reinforcementModels yet. '}
      <Link to={routes.newReinforcementModel()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ reinforcementModels }) => {
  return <ReinforcementModels reinforcementModels={reinforcementModels} />
}
