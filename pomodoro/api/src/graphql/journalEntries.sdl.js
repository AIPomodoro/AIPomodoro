export const schema = gql`
  type JournalEntry {
    id: Int!
    userId: Int!
    profileId: Int!
    user: User!
    profile: Profile!
    title: String!
    content: String!
    createdAt: DateTime!
  }

  type Query {
    journalEntries: [JournalEntry!]! @requireAuth
    journalEntry(id: Int!): JournalEntry @requireAuth
  }

  input CreateJournalEntryInput {
    userId: Int!
    profileId: Int!
    title: String!
    content: String!
  }

  input UpdateJournalEntryInput {
    userId: Int
    profileId: Int
    title: String
    content: String
  }

  type Mutation {
    createJournalEntry(input: CreateJournalEntryInput!): JournalEntry!
      @requireAuth
    updateJournalEntry(
      id: Int!
      input: UpdateJournalEntryInput!
    ): JournalEntry! @requireAuth
    deleteJournalEntry(id: Int!): JournalEntry! @requireAuth
  }
`
