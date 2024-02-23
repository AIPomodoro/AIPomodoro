export const schema = gql`
  type User {
    id: Int!
    username: String!
    firstName: String
    lastName: String
    email: String!
    phone: String
    password: String!
    role: String
    profile: Profile
    createdAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    firstName: String
    lastName: String
    email: String!
    phone: String
    password: String!
    role: String
  }

  input UpdateUserInput {
    username: String
    firstName: String
    lastName: String
    email: String
    phone: String
    password: String
    role: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
