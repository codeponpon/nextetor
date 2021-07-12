import { gql } from "apollo-server-micro";

export default gql`
  scalar Date
  scalar JSON

  enum ConfigType {
    CLOSE_WEBSITE
    CLOSE_LOGIN
    CLOSE_REGISTER
    CLOSE_WITHDRAW
    CLOSE_DEPOSIT
    CLOSE_LAUNCHGAME
    MESSAGE
  }

  enum ConfigStatus {
    ACTIVATED
    DEACTIVATED
  }

  type Website {
    id: Int!
    userId: Int!
    maintenance: Maintenance
    domain: String
    subdomain: String
    settings: JSON
    status: ConfigStatus
    createdAt: Date
    updatedAt: Date
  }

  type Maintenance {
    id: Int!
    website: Website!
    configType: ConfigType
    configStatus: ConfigStatus
    startDate: Date
    endDate: Date
    message: String
    createdAt: Date
    updatedAt: Date
  }
`;
