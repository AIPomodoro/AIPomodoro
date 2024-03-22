import ReinforcementModel from 'src/components/ReinforcementModel/ReinforcementModel'

export const QUERY = gql`
  query FindReinforcementModelById($id: Int!) {
    reinforcementModel: reinforcementModel(id: $id) {
      id
      userId
      modelData
      rating
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ReinforcementModel not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ reinforcementModel }) => {
  return <ReinforcementModel reinforcementModel={reinforcementModel} />
}
