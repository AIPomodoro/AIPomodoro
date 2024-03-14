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
    lastLogin: DateTime!
    currentStreak: Int!
    soundEnabled: Boolean!
    autoStart: Boolean!
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
    lastLogin: DateTime!
    currentStreak: Int!
    soundEnabled: Boolean!
    autoStart: Boolean!
  }

  input UpdateProfileInput {
    userId: Int
    workDuration: Int
    breakDuration: Int
    email: String
    firstName: String
    lastName: String
    phone: String
    lastLogin: DateTime
    currentStreak: Int
    soundEnabled: Boolean
    autoStart: Boolean
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: Int!, input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
