export const schema = gql`
  type ReinforcementModel {
    id: Int!
    userId: Int!
    user: User!
    modelData: String
  }

  type Query {
    reinforcementModels: [ReinforcementModel!]! @requireAuth
    reinforcementModel(id: Int!): ReinforcementModel @requireAuth
  }

  input CreateReinforcementModelInput {
    userId: Int!
    modelData: String
  }

  input UpdateReinforcementModelInput {
    userId: Int
    modelData: String
  }

  type Mutation {
    createReinforcementModel(
      input: CreateReinforcementModelInput!
    ): ReinforcementModel! @requireAuth
    updateReinforcementModel(
      id: Int!
      input: UpdateReinforcementModelInput!
    ): ReinforcementModel! @requireAuth
    deleteReinforcementModel(id: Int!): ReinforcementModel! @requireAuth
  }
`
