export const schema = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    role: String
    profile: Profile
    createdAt: DateTime!
    JournalEntry: JournalEntry
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
    role: String
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    role: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
