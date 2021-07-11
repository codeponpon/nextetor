import { mergeTypeDefs } from "graphql-tools";

import User from "./types/user-type";
import Profile from "./types/profile-type";
import Role from "./types/role-type";
import InputTypes from "./types/input-type";
import queryTypes from "./types/query";
import mutationType from "./types/mutation";

export const typeDefs = mergeTypeDefs([
  User,
  Profile,
  Role,
  InputTypes,
  queryTypes,
  mutationType,
]);
