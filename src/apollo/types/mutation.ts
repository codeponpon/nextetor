import { gql } from "apollo-server-micro";

export default gql`
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: Int!): User
    deleteProfile(id: Int, userId: Int): User
    signIn(input: SignInInput!): User
    createWebsite(input: CreateWebsiteInput!): Website
    deleteWebsite(id: Int!): Website
  }
`;
