import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  status?: Maybe<UserStatus>;
  createdBy?: Maybe<CreatedBy>;
};

export enum CreatedBy {
  Website = 'WEBSITE',
  Admin = 'ADMIN'
}


export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  signIn?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  user?: Maybe<User>;
  mobile?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  lineID?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  user?: Maybe<User>;
  roles: Array<Role>;
};


export type QueryUsersArgs = {
  status?: Maybe<UserStatus>;
  createdBy?: Maybe<CreatedBy>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  users?: Maybe<User>;
  name?: Maybe<Scalars['String']>;
  type: RoleType;
  thirdPartyInfo?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum RoleType {
  SuperAdmin = 'SUPER_ADMIN',
  Admin = 'ADMIN',
  Agent = 'AGENT',
  Member = 'MEMBER',
  CallCenter = 'CALL_CENTER'
}

export type SignInInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateProfileInput = {
  id?: Maybe<Scalars['Int']>;
  mobile?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  lineID?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  createdBy?: Maybe<CreatedBy>;
  status?: Maybe<UserStatus>;
  token?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  profile?: Maybe<UpdateProfileInput>;
  updatedAt: Scalars['Date'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  createdBy?: Maybe<CreatedBy>;
  status?: Maybe<UserStatus>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  token?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['Int']>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Ban = 'BAN'
}

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'password' | 'status' | 'createdBy' | 'createdAt' | 'updatedAt'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'mobile' | 'firstName' | 'lastName' | 'birthday' | 'lineID' | 'email' | 'createdAt' | 'updatedAt'>
    )>, role?: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'thirdPartyInfo' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'password' | 'status' | 'createdBy' | 'createdAt' | 'updatedAt'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'mobile' | 'firstName' | 'lastName' | 'birthday' | 'lineID' | 'email' | 'createdAt' | 'updatedAt'>
    )>, role?: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'thirdPartyInfo' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = (
  { __typename?: 'Query' }
  & { roles: Array<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'type' | 'thirdPartyInfo' | 'createdAt' | 'updatedAt'>
  )> }
);

export type SingInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SingInMutation = (
  { __typename?: 'Mutation' }
  & { signIn?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'password' | 'status' | 'createdBy' | 'createdAt' | 'updatedAt' | 'token'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'mobile' | 'firstName' | 'lastName' | 'birthday' | 'lineID' | 'email' | 'createdAt' | 'updatedAt'>
    )>, role?: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'thirdPartyInfo' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'password' | 'status' | 'createdBy' | 'createdAt' | 'updatedAt'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'mobile' | 'firstName' | 'lastName' | 'birthday' | 'lineID' | 'email' | 'createdAt' | 'updatedAt'>
    )>, role?: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'thirdPartyInfo' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'roleId' | 'username' | 'password' | 'status' | 'createdBy' | 'createdAt' | 'updatedAt'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'mobile' | 'firstName' | 'lastName' | 'birthday' | 'lineID' | 'email' | 'createdAt' | 'updatedAt'>
    )>, role?: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'thirdPartyInfo' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type UsersQueryVariables = Exact<{
  status?: Maybe<UserStatus>;
  createdBy?: Maybe<CreatedBy>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'roleId' | 'username' | 'password' | 'status' | 'createdBy' | 'createdAt' | 'updatedAt'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'mobile' | 'firstName' | 'lastName' | 'birthday' | 'lineID' | 'email' | 'createdAt' | 'updatedAt'>
    )>, role?: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'thirdPartyInfo' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    password
    status
    createdBy
    createdAt
    updatedAt
    profile {
      id
      mobile
      firstName
      lastName
      birthday
      lineID
      email
      createdAt
      updatedAt
    }
    role {
      id
      name
      type
      thirdPartyInfo
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Int!) {
  deleteUser(id: $id) {
    id
    username
    password
    status
    createdBy
    createdAt
    updatedAt
    profile {
      id
      mobile
      firstName
      lastName
      birthday
      lineID
      email
      createdAt
      updatedAt
    }
    role {
      id
      name
      type
      thirdPartyInfo
      createdAt
      updatedAt
    }
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const RolesDocument = gql`
    query Roles {
  roles {
    id
    name
    type
    thirdPartyInfo
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;
export const SingInDocument = gql`
    mutation SingIn($input: SignInInput!) {
  signIn(input: $input) {
    id
    username
    password
    status
    createdBy
    createdAt
    updatedAt
    token
    profile {
      id
      mobile
      firstName
      lastName
      birthday
      lineID
      email
      createdAt
      updatedAt
    }
    role {
      id
      name
      type
      thirdPartyInfo
      createdAt
      updatedAt
    }
  }
}
    `;
export type SingInMutationFn = Apollo.MutationFunction<SingInMutation, SingInMutationVariables>;

/**
 * __useSingInMutation__
 *
 * To run a mutation, you first call `useSingInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singInMutation, { data, loading, error }] = useSingInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSingInMutation(baseOptions?: Apollo.MutationHookOptions<SingInMutation, SingInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SingInMutation, SingInMutationVariables>(SingInDocument, options);
      }
export type SingInMutationHookResult = ReturnType<typeof useSingInMutation>;
export type SingInMutationResult = Apollo.MutationResult<SingInMutation>;
export type SingInMutationOptions = Apollo.BaseMutationOptions<SingInMutation, SingInMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    password
    status
    createdBy
    createdAt
    updatedAt
    profile {
      id
      mobile
      firstName
      lastName
      birthday
      lineID
      email
      createdAt
      updatedAt
    }
    role {
      id
      name
      type
      thirdPartyInfo
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    id
    roleId
    username
    password
    status
    createdBy
    createdAt
    updatedAt
    profile {
      id
      mobile
      firstName
      lastName
      birthday
      lineID
      email
      createdAt
      updatedAt
    }
    role {
      id
      name
      type
      thirdPartyInfo
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users($status: UserStatus, $createdBy: CreatedBy, $offset: Int, $limit: Int) {
  users(status: $status, createdBy: $createdBy, offset: $offset, limit: $limit) {
    id
    roleId
    username
    password
    status
    createdBy
    createdAt
    updatedAt
    profile {
      id
      mobile
      firstName
      lastName
      birthday
      lineID
      email
      createdAt
      updatedAt
    }
    role {
      id
      name
      type
      thirdPartyInfo
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      status: // value for 'status'
 *      createdBy: // value for 'createdBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;