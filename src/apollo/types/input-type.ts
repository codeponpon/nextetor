import { gql } from "apollo-server-micro";

export default gql`
  scalar Date

  input CreateUserInput {
    username: String!
    password: String!
    status: UserStatus
    createdBy: CreatedBy
    roleId: Int!
    profile: CreateProfileInput
  }

  input UpdateUserInput {
    id: Int!
    username: String
    password: String
    createdBy: CreatedBy
    status: UserStatus
    token: String
    roleId: Int
    profile: UpdateProfileUserInput
    updatedAt: Date!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  input CreateProfileInput {
    mobile: String!
    firstName: String
    lastName: String
    birthday: String
    lineID: String
    email: String
  }

  input UpdateProfileUserInput {
    mobile: String
    firstName: String
    lastName: String
    birthday: String
    lineID: String
    email: String
    updatedAt: Date!
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

  input CreateMaintenanceInput {
    configType: ConfigType
    configStatus: ConfigStatus
    startDate: Date
    endDate: Date
    message: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateWebsiteInput {
    userId: Int!
    name: String!
    domain: String
    subdomain: String
    settings: JSON
    status: ConfigStatus
    maintenance: CreateMaintenanceInput
    createdAt: Date
    updatedAt: Date
  }

  input UpdateWebsiteInput {
    id: Int!
    userId: Int!
    name: String!
    domain: String
    subdomain: String
    settings: JSON
    status: ConfigStatus
    maintenance: CreateMaintenanceInput
    updatedAt: Date
  }
`;
