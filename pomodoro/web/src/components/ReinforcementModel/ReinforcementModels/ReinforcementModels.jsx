import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ReinforcementModel/ReinforcementModelsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_REINFORCEMENT_MODEL_MUTATION = gql`
  mutation DeleteReinforcementModelMutation($id: Int!) {
    deleteReinforcementModel(id: $id) {
      id
    }
  }
`

const ReinforcementModelsList = ({ reinforcementModels }) => {
  const [deleteReinforcementModel] = useMutation(
    DELETE_REINFORCEMENT_MODEL_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReinforcementModel deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Model data</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {reinforcementModels.map((reinforcementModel) => (
            <tr key={reinforcementModel.id}>
              <td>{truncate(reinforcementModel.id)}</td>
              <td>{truncate(reinforcementModel.userId)}</td>
              <td>{truncate(reinforcementModel.modelData)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.reinforcementModel({
                      id: reinforcementModel.id,
                    })}
                    title={
                      'Show reinforcementModel ' +
                      reinforcementModel.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editReinforcementModel({
                      id: reinforcementModel.id,
                    })}
                    title={'Edit reinforcementModel ' + reinforcementModel.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete reinforcementModel ' + reinforcementModel.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(reinforcementModel.id)}
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

export default ReinforcementModelsList
