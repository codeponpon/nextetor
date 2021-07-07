import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar Date

  enum CreatedBy {
    WEBSITE
    ADMIN
  }
  enum UserStatus {
    ACTIVE
    INACTIVE
    BAN
  }
  enum RoleType {
    SUPER_ADMIN
    ADMIN
    AGENT
    MEMBER
    CALL_CENTER
  }

  type User {
    id: Int
    username: String
    password: String
    createdBy: CreatedBy
    status: UserStatus
    createdAt: Date
    updatedAt: Date
    token: String
    profile: Profile
    role: Role
    roleId: Int
  }

  type Role {
    id: Int
    users: User
    name: String
    type: RoleType!
    thirdPartyInfo: String
    createdAt: Date!
    updatedAt: Date
  }

  type Profile {
    id: Int
    user: User
    mobile: String
    firstName: String
    lastName: String
    birthday: String
    lineID: String
    email: String
    createdAt: Date!
    updatedAt: Date
  }

  input CreateUserInput {
    username: String!
    password: String!
    status: UserStatus
    createdBy: CreatedBy
  }

  input UpdateUserInput {
    id: Int!
    password: String
    status: UserStatus
  }

  input SignInInput {
    username: String!
    password: String!
  }

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

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: Int!): User
    signIn(input: SignInInput!): User
  }
`;
