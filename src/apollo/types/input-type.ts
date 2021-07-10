import { gql } from "apollo-server-micro";

export default gql`
  scalar Date

  input CreateUserInput {
    username: String!
    password: String!
    status: UserStatus
    createdBy: CreatedBy
  }

  input UpdateUserInput {
    id: Int!
    username: String
    password: String
    createdBy: CreatedBy
    status: UserStatus
    token: String
    roleId: Int
    profile: UpdateProfileInput
    updatedAt: Date!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  input UpdateProfileInput {
    id: Int
    mobile: String
    firstName: String
    lastName: String
    birthday: String
    lineID: String
    email: String
    updatedAt: Date!
  }
`;
