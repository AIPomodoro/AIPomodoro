export const schema = gql`
  type Profile {
    id: Int!
    createdAt: DateTime!
    userId: Int!
    user: User!
    email: String
    firstName: String
    lastName: String
    phone: String
    journalEntries: [JournalEntry]!
    lastLogin: DateTime!
    currentStreak: Int!
    soundEnabled: Boolean!
    autoStart: Boolean!
    autoAdjust: Boolean!
    workDuration: Int!
    breakDuration: Int!
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: Int!): Profile @requireAuth
  }

  input CreateProfileInput {
    userId: Int!
    email: String
    firstName: String
    lastName: String
    phone: String
    lastLogin: DateTime!
    currentStreak: Int!
    soundEnabled: Boolean!
    autoStart: Boolean!
    autoAdjust: Boolean!
    workDuration: Int!
    breakDuration: Int!
  }

  input UpdateProfileInput {
    userId: Int
    email: String
    firstName: String
    lastName: String
    phone: String
    lastLogin: DateTime
    currentStreak: Int
    soundEnabled: Boolean
    autoStart: Boolean
    autoAdjust: Boolean
    workDuration: Int
    breakDuration: Int
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: Int!, input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
