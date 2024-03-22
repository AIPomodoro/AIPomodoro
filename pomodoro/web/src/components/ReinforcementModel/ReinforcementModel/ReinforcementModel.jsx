import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_REINFORCEMENT_MODEL_MUTATION = gql`
  mutation DeleteReinforcementModelMutation($id: Int!) {
    deleteReinforcementModel(id: $id) {
      id
    }
  }
`

const ReinforcementModel = ({ reinforcementModel }) => {
  const [deleteReinforcementModel] = useMutation(
    DELETE_REINFORCEMENT_MODEL_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReinforcementModel deleted')
        navigate(routes.reinforcementModels())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete reinforcementModel ' + id + '?')
    ) {
      deleteReinforcementModel({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ReinforcementModel {reinforcementModel.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{reinforcementModel.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{reinforcementModel.userId}</td>
            </tr>
            <tr>
              <th>Model data</th>
              <td>{reinforcementModel.modelData}</td>
            </tr>
            <tr>
              <th>Rating</th>
              <td>{reinforcementModel.rating}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReinforcementModel({ id: reinforcementModel.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(reinforcementModel.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ReinforcementModel
