import { gql } from "apollo-server-micro";

export default gql`
  type Query {
    users(
      status: UserStatus
      createdBy: CreatedBy
      offset: Int
      limit: Int
      query: String
      begin: Date
      end: Date
    ): [User!]!
    user(id: Int!): User
    roles: [Role!]!
    websites(id: Int, status: ConfigStatus, name: String): [Website!]
    website(id: Int!): Website
  }
`;
