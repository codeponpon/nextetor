import { gql } from "apollo-server-micro";

export default gql`
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

  type User {
    id: Int!
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
`;
