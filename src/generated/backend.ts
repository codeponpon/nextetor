import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export enum ConfigStatus {
  Activated = 'ACTIVATED',
  Deactivated = 'DEACTIVATED'
}

export enum ConfigType {
  CloseWebsite = 'CLOSE_WEBSITE',
  CloseLogin = 'CLOSE_LOGIN',
  CloseRegister = 'CLOSE_REGISTER',
  CloseWithdraw = 'CLOSE_WITHDRAW',
  CloseDeposit = 'CLOSE_DEPOSIT',
  CloseLaunchgame = 'CLOSE_LAUNCHGAME',
  Message = 'MESSAGE'
}

export type CreateMaintenanceInput = {
  configType?: Maybe<ConfigType>;
  configStatus?: Maybe<ConfigStatus>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  message?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CreateProfileInput = {
  mobile: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  lineID?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  status?: Maybe<UserStatus>;
  createdBy?: Maybe<CreatedBy>;
  roleId: Scalars['Int'];
  profile?: Maybe<CreateProfileInput>;
};

export type CreateWebsiteInput = {
  userId: Scalars['Int'];
  domain?: Maybe<Scalars['String']>;
  subdomain?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['JSON']>;
  status?: Maybe<ConfigStatus>;
  maintenance?: Maybe<CreateMaintenanceInput>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum CreatedBy {
  Website = 'WEBSITE',
  Admin = 'ADMIN'
}



export type Maintenance = {
  __typename?: 'Maintenance';
  id: Scalars['Int'];
  website: Website;
  configType?: Maybe<ConfigType>;
  configStatus?: Maybe<ConfigStatus>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  message?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  deleteProfile?: Maybe<User>;
  signIn?: Maybe<User>;
  createWebsite?: Maybe<Website>;
  deleteWebsite?: Maybe<Website>;
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


export type MutationDeleteProfileArgs = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationCreateWebsiteArgs = {
  input: CreateWebsiteInput;
};


export type MutationDeleteWebsiteArgs = {
  id: Scalars['Int'];
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
  websites?: Maybe<Array<Website>>;
  website?: Maybe<Website>;
};


export type QueryUsersArgs = {
  status?: Maybe<UserStatus>;
  createdBy?: Maybe<CreatedBy>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  begin?: Maybe<Scalars['Date']>;
  end?: Maybe<Scalars['Date']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryWebsiteArgs = {
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

export type Website = {
  __typename?: 'Website';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  maintenance?: Maybe<Maintenance>;
  domain?: Maybe<Scalars['String']>;
  subdomain?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['JSON']>;
  status?: Maybe<ConfigStatus>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ConfigStatus: ConfigStatus;
  ConfigType: ConfigType;
  CreateMaintenanceInput: CreateMaintenanceInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateProfileInput: CreateProfileInput;
  CreateUserInput: CreateUserInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateWebsiteInput: CreateWebsiteInput;
  CreatedBy: CreatedBy;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Maintenance: ResolverTypeWrapper<Maintenance>;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  RoleType: RoleType;
  SignInInput: SignInInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserStatus: UserStatus;
  Website: ResolverTypeWrapper<Website>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateMaintenanceInput: CreateMaintenanceInput;
  String: Scalars['String'];
  CreateProfileInput: CreateProfileInput;
  CreateUserInput: CreateUserInput;
  Int: Scalars['Int'];
  CreateWebsiteInput: CreateWebsiteInput;
  Date: Scalars['Date'];
  JSON: Scalars['JSON'];
  Maintenance: Maintenance;
  Mutation: {};
  Profile: Profile;
  Query: {};
  Role: Role;
  SignInInput: SignInInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  Website: Website;
  Boolean: Scalars['Boolean'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MaintenanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Maintenance'] = ResolversParentTypes['Maintenance']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  website?: Resolver<ResolversTypes['Website'], ParentType, ContextType>;
  configType?: Resolver<Maybe<ResolversTypes['ConfigType']>, ParentType, ContextType>;
  configStatus?: Resolver<Maybe<ResolversTypes['ConfigStatus']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteProfileArgs, never>>;
  signIn?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  createWebsite?: Resolver<Maybe<ResolversTypes['Website']>, ParentType, ContextType, RequireFields<MutationCreateWebsiteArgs, 'input'>>;
  deleteWebsite?: Resolver<Maybe<ResolversTypes['Website']>, ParentType, ContextType, RequireFields<MutationDeleteWebsiteArgs, 'id'>>;
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lineID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  websites?: Resolver<Maybe<Array<ResolversTypes['Website']>>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['Website']>, ParentType, ContextType, RequireFields<QueryWebsiteArgs, 'id'>>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RoleType'], ParentType, ContextType>;
  thirdPartyInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['CreatedBy']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['UserStatus']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  roleId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebsiteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Website'] = ResolversParentTypes['Website']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maintenance?: Resolver<Maybe<ResolversTypes['Maintenance']>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ConfigStatus']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Maintenance?: MaintenanceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Website?: WebsiteResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
