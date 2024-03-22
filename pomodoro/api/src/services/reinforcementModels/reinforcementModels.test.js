import {
  reinforcementModels,
  reinforcementModel,
  createReinforcementModel,
  updateReinforcementModel,
  deleteReinforcementModel,
} from './reinforcementModels'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reinforcementModels', () => {
  scenario('returns all reinforcementModels', async (scenario) => {
    const result = await reinforcementModels()

    expect(result.length).toEqual(
      Object.keys(scenario.reinforcementModel).length
    )
  })

  scenario('returns a single reinforcementModel', async (scenario) => {
    const result = await reinforcementModel({
      id: scenario.reinforcementModel.one.id,
    })

    expect(result).toEqual(scenario.reinforcementModel.one)
  })

  scenario('creates a reinforcementModel', async (scenario) => {
    const result = await createReinforcementModel({
      input: { userId: scenario.reinforcementModel.two.userId },
    })

    expect(result.userId).toEqual(scenario.reinforcementModel.two.userId)
  })

  scenario('updates a reinforcementModel', async (scenario) => {
    const original = await reinforcementModel({
      id: scenario.reinforcementModel.one.id,
    })
    const result = await updateReinforcementModel({
      id: original.id,
      input: { userId: scenario.reinforcementModel.two.userId },
    })

    expect(result.userId).toEqual(scenario.reinforcementModel.two.userId)
  })

  scenario('deletes a reinforcementModel', async (scenario) => {
    const original = await deleteReinforcementModel({
      id: scenario.reinforcementModel.one.id,
    })
    const result = await reinforcementModel({ id: original.id })

    expect(result).toEqual(null)
  })
})
