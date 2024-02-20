import { db } from 'src/lib/db'

export const journalEntries = () => {
  return db.journalEntry.findMany()
}

export const journalEntry = ({ id }) => {
  return db.journalEntry.findUnique({
    where: { id },
  })
}

export const createJournalEntry = ({ input }) => {
  return db.journalEntry.create({
    data: input,
  })
}

export const updateJournalEntry = ({ id, input }) => {
  return db.journalEntry.update({
    data: input,
    where: { id },
  })
}

export const deleteJournalEntry = ({ id }) => {
  return db.journalEntry.delete({
    where: { id },
  })
}

export const JournalEntry = {
  profile: (_obj, { root }) => {
    return db.journalEntry.findUnique({ where: { id: root?.id } }).profile()
  },
}
