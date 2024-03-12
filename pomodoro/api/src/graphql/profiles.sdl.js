export const schema = gql`
  type Profile {
    id: Int!
    createdAt: DateTime!
    userId: Int!
    user: User!
    workDuration: Int!
    breakDuration: Int!
    email: String
    firstName: String
    lastName: String
    phone: String
    journalEntries: [JournalEntry]!
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: Int!): Profile @requireAuth
  }

  input CreateProfileInput {
    userId: Int!
    workDuration: Int!
    breakDuration: Int!
    email: String
    firstName: String
    lastName: String
    phone: String
  }

  input UpdateProfileInput {
    userId: Int
    workDuration: Int
    breakDuration: Int
    email: String
    firstName: String
    lastName: String
    phone: String
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: Int!, input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
