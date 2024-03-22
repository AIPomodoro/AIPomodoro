import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import ReinforcementModelForm from 'src/components/ReinforcementModel/ReinforcementModelForm'

const CREATE_REINFORCEMENT_MODEL_MUTATION = gql`
  mutation CreateReinforcementModelMutation(
    $input: CreateReinforcementModelInput!
  ) {
    createReinforcementModel(input: $input) {
      id
    }
  }
`

const NewReinforcementModel = () => {
  const [createReinforcementModel, { loading, error }] = useMutation(
    CREATE_REINFORCEMENT_MODEL_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReinforcementModel created')
        navigate(routes.reinforcementModels())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createReinforcementModel({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New ReinforcementModel
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReinforcementModelForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewReinforcementModel
