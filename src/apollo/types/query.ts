import { gql } from "apollo-server-micro";

export default gql`
  type Query {
    users(
      status: UserStatus
      createdBy: CreatedBy
      offset: Int
      limit: Int
    ): [User!]!
    user(id: Int!): User
    roles: [Role!]!
  }
`;
