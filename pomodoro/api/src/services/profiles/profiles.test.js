import {
  profiles,
  profile,
  createProfile,
  updateProfile,
  deleteProfile,
} from './profiles'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('profiles', () => {
  scenario('returns all profiles', async (scenario) => {
    const result = await profiles()

    expect(result.length).toEqual(Object.keys(scenario.profile).length)
  })

  scenario('returns a single profile', async (scenario) => {
    const result = await profile({ id: scenario.profile.one.id })

    expect(result).toEqual(scenario.profile.one)
  })

  scenario('creates a profile', async (scenario) => {
    const result = await createProfile({
      input: {
        userId: scenario.profile.two.userId,
        currentStreak: 1069678,
        soundEnabled: true,
        autoStart: true,
        autoAdjust: true,
        workDuration: 1626637,
        breakDuration: 6237029,
      },
    })

    expect(result.userId).toEqual(scenario.profile.two.userId)
    expect(result.currentStreak).toEqual(1069678)
    expect(result.soundEnabled).toEqual(true)
    expect(result.autoStart).toEqual(true)
    expect(result.autoAdjust).toEqual(true)
    expect(result.workDuration).toEqual(1626637)
    expect(result.breakDuration).toEqual(6237029)
  })

  scenario('updates a profile', async (scenario) => {
    const original = await profile({ id: scenario.profile.one.id })
    const result = await updateProfile({
      id: original.id,
      input: { currentStreak: 5223715 },
    })

    expect(result.currentStreak).toEqual(5223715)
  })

  scenario('deletes a profile', async (scenario) => {
    const original = await deleteProfile({
      id: scenario.profile.one.id,
    })
    const result = await profile({ id: original.id })

    expect(result).toEqual(null)
  })
})
