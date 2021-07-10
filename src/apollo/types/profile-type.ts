import { gql } from "apollo-server-micro";

export default gql`
  scalar Date

  type Profile {
    id: Int!
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
`;
