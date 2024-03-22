import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReinforcementModelForm from 'src/components/ReinforcementModel/ReinforcementModelForm'

export const QUERY = gql`
  query EditReinforcementModelById($id: Int!) {
    reinforcementModel: reinforcementModel(id: $id) {
      id
      userId
      modelData
      rating
    }
  }
`

const UPDATE_REINFORCEMENT_MODEL_MUTATION = gql`
  mutation UpdateReinforcementModelMutation(
    $id: Int!
    $input: UpdateReinforcementModelInput!
  ) {
    updateReinforcementModel(id: $id, input: $input) {
      id
      userId
      modelData
      rating
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ reinforcementModel }) => {
  const [updateReinforcementModel, { loading, error }] = useMutation(
    UPDATE_REINFORCEMENT_MODEL_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReinforcementModel updated')
        navigate(routes.reinforcementModels())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateReinforcementModel({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ReinforcementModel {reinforcementModel?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReinforcementModelForm
          reinforcementModel={reinforcementModel}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
