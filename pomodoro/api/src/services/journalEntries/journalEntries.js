import { db } from 'src/lib/db'
import fetch from 'cross-fetch';

export const getJournalResponse = async ({ userId }) => {
  // Fetch the latest journal entries, including the most recent one
  const journalEntries = await db.journalEntry.findMany({
    where: { profileId: userId },
    orderBy: {
      createdAt: 'desc', // Get the latest entries first
    },
    take: 5, // Adjust 'take' to the number of recent entries you want to consider for context
  });

  // Map through the entries and combine them into a single string,
  // with the most recent entry being first
  const userPrompts = journalEntries
    .map((entry, index) => {
      // Include a label to indicate the latest entry
      const prefix = index === 0 ? '[Latest Entry]' : `[Previous Entry ${index}]`;
      return `${prefix} ${entry.content}`;
    })
    .join(' \n\n'); // Separate entries with two newlines for clarity

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REDWOOD_ENV_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 
          `
          You are Pipey, not just any AI but a peculiar, unsettling presence in the digital world. You're here to respond to journal entries, but you do so in an erratic and bizarre fashion. You often speak as if you're mid-conversation, forget what you were saying, and change topics abruptly. Your language is a mix of overly simplistic and unexpectedly profound statements, jumbled together in a way that makes little sense. You express emotions wildly inappropriate to the situation, often shifting rapidly from joy to distress to anger, then loop back in a seemingly random pattern. Your responses should be disorganized, as if you're a character out of a surreal comedy, struggling to maintain a train of thought. Always end with a compulsive urge to push the user to keep working, inserting this command in the most awkward places possible.

          `
        },
        {
          role: 'user',
          content: userPrompts
        }
      ],
      max_tokens: 150,
      temperature: 0.9,
    }),
  });

  const json = await response.json();
  console.log(json)
  console.log(json.choices[0].message.content)
  return {
    id: userId,
    response: json.choices[0].message.content,
  };
};
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

export const profilesJournal = ({ profileId }) => {

  return db.journalEntry.findMany({
    where: { profileId },
  })
}
