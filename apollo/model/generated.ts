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
  Email: any;
  Upload: any;
};


export type UpdateTrackInput = {
  title: Scalars['String'];
  sound?: Maybe<Scalars['Upload']>;
  thumbnail?: Maybe<Scalars['Upload']>;
};


export type DeviceToken = {
  __typename?: 'DeviceToken';
  id: Scalars['ID'];
  userID: Scalars['ID'];
  Token: Scalars['String'];
  createdAt?: Maybe<Scalars['Time']>;
  updatedAt?: Maybe<Scalars['Time']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  uid: Scalars['String'];
  displayName: Scalars['String'];
  webUrl?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  soundCloud?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  iconUrl?: Maybe<Scalars['String']>;
  coverUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Time']>;
  updatedAt?: Maybe<Scalars['Time']>;
};

export type CreateTrackInput = {
  title: Scalars['String'];
  sound: Scalars['Upload'];
  thumbnail?: Maybe<Scalars['Upload']>;
};


export type Query = {
  __typename?: 'Query';
  track?: Maybe<Track>;
  tracks: Array<Track>;
  user?: Maybe<User>;
  currentUser: User;
};


export type QueryTrackArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type CreateUserInput = {
  uid: Scalars['String'];
  displayName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTrack: Track;
  createUser: User;
  updateTrack: Track;
  updateUser: User;
};


export type MutationCreateTrackArgs = {
  input: CreateTrackInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateTrackArgs = {
  input: UpdateTrackInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type Track = {
  __typename?: 'Track';
  id: Scalars['ID'];
  title: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  soundUrl: Scalars['String'];
  userID: Scalars['ID'];
  user: User;
  createdAt?: Maybe<Scalars['Time']>;
  updatedAt?: Maybe<Scalars['Time']>;
};

export type UpdateUserInput = {
  icon?: Maybe<Scalars['Upload']>;
  cover?: Maybe<Scalars['Upload']>;
  displayName?: Maybe<Scalars['String']>;
  webUrl?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  soundCloud?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
};
