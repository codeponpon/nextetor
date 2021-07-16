import { gql } from "apollo-server-micro";

export default gql`
  scalar Date

  enum RoleType {
    SUPER_ADMIN
    ADMIN
    AGENT
    MEMBER
    CALL_CENTER
  }

  type Role {
    id: Int!
    users: User
    name: String
    type: RoleType!
    thirdPartyInfo: String
    createdAt: Date!
    updatedAt: Date
  }
`;
