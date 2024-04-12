export const schema = gql`
  type JournalEntry {
    id: Int!
    profileId: Int!
    profile: Profile!
    title: String!
    content: String!
    createdAt: DateTime!
  }

  type Query {
    journalEntries: [JournalEntry!]! @requireAuth
    journalEntry(id: Int!): JournalEntry @requireAuth
    profilesJournal(profileId: Int!): [JournalEntry!]! @requireAuth
  }

  input CreateJournalEntryInput {
    profileId: Int!
    title: String!
    content: String!
  }

  input UpdateJournalEntryInput {
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
  # type ProfilesJournal {
  #   profileId: Int!
  #   journalEntries: [JournalEntry!]!
  # }
  # extend type Query {
  #   profilesJournal: [ProfilesJournal!]! @requireAuth
  # }

  type AIResponse {
    id: Int!
    response: String
  }

  extend type Query {
    getJournalResponse(userId: Int!): AIResponse! @skipAuth
  }
`
