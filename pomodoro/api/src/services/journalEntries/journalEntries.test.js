import {
  journalEntries,
  journalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from './journalEntries'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('journalEntries', () => {
  scenario('returns all journalEntries', async (scenario) => {
    const result = await journalEntries()

    expect(result.length).toEqual(Object.keys(scenario.journalEntry).length)
  })

  scenario('returns a single journalEntry', async (scenario) => {
    const result = await journalEntry({ id: scenario.journalEntry.one.id })

    expect(result).toEqual(scenario.journalEntry.one)
  })

  scenario('creates a journalEntry', async (scenario) => {
    const result = await createJournalEntry({
      input: {
        userId: scenario.journalEntry.two.userId,
        profileId: scenario.journalEntry.two.profileId,
        title: 'String',
        content: 'String',
      },
    })

    expect(result.userId).toEqual(scenario.journalEntry.two.userId)
    expect(result.profileId).toEqual(scenario.journalEntry.two.profileId)
    expect(result.title).toEqual('String')
    expect(result.content).toEqual('String')
  })

  scenario('updates a journalEntry', async (scenario) => {
    const original = await journalEntry({
      id: scenario.journalEntry.one.id,
    })
    const result = await updateJournalEntry({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a journalEntry', async (scenario) => {
    const original = await deleteJournalEntry({
      id: scenario.journalEntry.one.id,
    })
    const result = await journalEntry({ id: original.id })

    expect(result).toEqual(null)
  })
})
