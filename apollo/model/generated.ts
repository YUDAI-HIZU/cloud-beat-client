export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
  Upload: any;
  Email: any;
};




export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  uid: Scalars['String'];
  displayName: Scalars['String'];
  webUrl?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Time']>;
  updatedAt?: Maybe<Scalars['Time']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  currentUser: User;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type UpdateUserInput = {
  displayName?: Maybe<Scalars['String']>;
  webUrl?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  displayName: Scalars['String'];
  uid: Scalars['String'];
};
