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
  id?: Maybe<Scalars['Int']>;
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
};


export type QueryUsersArgs = {
  status?: Maybe<UserStatus>;
  createdBy?: Maybe<CreatedBy>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['Int']>;
  users?: Maybe<User>;
  name?: Maybe<Scalars['String']>;
  type: RoleType;
  thirdPartyInfo?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum RoleType {
  Admin = 'ADMIN',
  Agent = 'AGENT',
  Member = 'MEMBER',
  CallCenter = 'CALL_CENTER'
}

export type SignInInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
  status?: Maybe<UserStatus>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  createdBy?: Maybe<CreatedBy>;
  status?: Maybe<UserStatus>;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  token?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Ban = 'BAN'
}

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
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


export const UsersDocument = gql`
    query Users {
  users {
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