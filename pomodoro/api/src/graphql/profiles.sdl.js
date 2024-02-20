export const schema = gql`
  type Profile {
    id: Int!
    userId: Int!
    user: User!
    workDuration: Int!
    breakDuration: Int!
    journalEntries: [JournalEntry]!
    createdAt: DateTime!
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: Int!): Profile @requireAuth
  }

  input CreateProfileInput {
    userId: Int!
    workDuration: Int!
    breakDuration: Int!
  }

  input UpdateProfileInput {
    userId: Int
    workDuration: Int
    breakDuration: Int
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: Int!, input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
