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
  Upload: any;
  Email: any;
  Time: any;
};




export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  currentUser: User;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp?: Maybe<Scalars['Boolean']>;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  uid: Scalars['String'];
  displayName: Scalars['String'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};


export type SignUpInput = {
  displayName: Scalars['String'];
  uid: Scalars['String'];
};
