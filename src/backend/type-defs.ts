import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  enum CreatedBy {
    WEBSITE
    ADMIN
  }
  enum UserStatus {
    ACTIVE
    INACTIVE
    BAN
  }
  type User {
    id: Int
    username: String
    password: String
    createdBy: CreatedBy
    status: UserStatus
    createdAt: String!
    updatedAt: String
  }

  input CreateUserInput {
    username: String!
    password: String!
    status: UserStatus!
    createdBy: CreatedBy!
  }

  input UpdateUserInput {
    id: Int!
    password: String
    status: UserStatus
  }

  type Query {
    users(status: UserStatus, createdBy: CreatedBy): [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: Int!): User
  }
`;
