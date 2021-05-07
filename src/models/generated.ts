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
};


export type CreateExternalLinkInput = {
  twitter?: Maybe<Scalars['String']>;
  soundCloud?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
};

export type CreatePlaylistInput = {
  title: Scalars['String'];
  trackIDs?: Maybe<Array<Scalars['ID']>>;
};

export type CreatePlaylistSourceInput = {
  playlistID: Scalars['ID'];
  trackID: Scalars['ID'];
};

export type CreateTrackInput = {
  title: Scalars['String'];
  audio: Scalars['Upload'];
  thumbnail?: Maybe<Scalars['Upload']>;
  description: Scalars['String'];
  youtubeLink?: Maybe<Scalars['String']>;
  genreID: Scalars['ID'];
};

export type CreateUserInput = {
  uid: Scalars['String'];
  displayName: Scalars['String'];
};

export type DeletePlaylistInput = {
  id: Scalars['ID'];
};

export type DeletePlaylistSourceInput = {
  playlistID: Scalars['ID'];
  trackID: Scalars['ID'];
};

export type DeleteTrackInput = {
  id: Scalars['ID'];
};

export type DeviceToken = {
  __typename?: 'DeviceToken';
  id: Scalars['ID'];
  userID: Scalars['ID'];
  Token: Scalars['String'];
};

export type ExternalLink = {
  __typename?: 'ExternalLink';
  twitter?: Maybe<Scalars['String']>;
  soundCloud?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExternalLink?: Maybe<ExternalLink>;
  createPlaylist: Playlist;
  createPlaylistSource: PlaylistSource;
  createTrack: Track;
  createUser: User;
  updateExternalLink: ExternalLink;
  updateUser: User;
  deletePlaylist: Playlist;
  deletePlaylistSource: PlaylistSource;
  deleteTrack: Track;
  deleteUser: User;
};


export type MutationCreateExternalLinkArgs = {
  input: CreateExternalLinkInput;
};


export type MutationCreatePlaylistArgs = {
  input: CreatePlaylistInput;
};


export type MutationCreatePlaylistSourceArgs = {
  input: CreatePlaylistSourceInput;
};


export type MutationCreateTrackArgs = {
  input: CreateTrackInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateExternalLinkArgs = {
  input: UpdateExternalLinkInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeletePlaylistArgs = {
  input: DeletePlaylistInput;
};


export type MutationDeletePlaylistSourceArgs = {
  input: DeletePlaylistSourceInput;
};


export type MutationDeleteTrackArgs = {
  input: DeleteTrackInput;
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['ID'];
  title: Scalars['String'];
  user: User;
  tracks: Array<Track>;
};

export type PlaylistSource = {
  __typename?: 'PlaylistSource';
  playlistID: Scalars['ID'];
  trackID: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  externalLinkByUserID: ExternalLink;
  genres: Array<Genre>;
  playlist: Playlist;
  playlistsByUserID: Array<Playlist>;
  track: Track;
  tracksByUserID: Array<Track>;
  newReleaseTracks: Array<Track>;
  pickUpTracks: Array<Track>;
  user: User;
  currentUser: User;
};


export type QueryExternalLinkByUserIdArgs = {
  userID: Scalars['ID'];
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistsByUserIdArgs = {
  userID: Scalars['ID'];
};


export type QueryTrackArgs = {
  id: Scalars['ID'];
};


export type QueryTracksByUserIdArgs = {
  userID: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type Track = {
  __typename?: 'Track';
  id: Scalars['ID'];
  title: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  audioUrl: Scalars['String'];
  description: Scalars['String'];
  youtubeLink: Scalars['String'];
  user: User;
  genre: Genre;
};

export type UpdateExternalLinkInput = {
  twitter?: Maybe<Scalars['String']>;
  soundCloud?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  icon?: Maybe<Scalars['Upload']>;
  displayName?: Maybe<Scalars['String']>;
  webUrl?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  uid: Scalars['String'];
  displayName: Scalars['String'];
  webUrl?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  iconUrl?: Maybe<Scalars['String']>;
};

export type ExternalLinkByUserIdQueryVariables = Exact<{
  userID: Scalars['ID'];
}>;


export type ExternalLinkByUserIdQuery = (
  { __typename?: 'Query' }
  & { externalLinkByUserID: (
    { __typename?: 'ExternalLink' }
    & Pick<ExternalLink, 'twitter' | 'soundCloud' | 'facebook' | 'youtube' | 'instagram'>
  ) }
);

export type GenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresQuery = (
  { __typename?: 'Query' }
  & { genres: Array<(
    { __typename?: 'Genre' }
    & Pick<Genre, 'id' | 'name'>
  )> }
);

export type NewReleaseTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type NewReleaseTracksQuery = (
  { __typename?: 'Query' }
  & { newReleaseTracks: Array<(
    { __typename?: 'Track' }
    & Pick<Track, 'id' | 'title' | 'audioUrl' | 'thumbnailUrl'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'displayName' | 'iconUrl'>
    ) }
  )> }
);

export type PickUpTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type PickUpTracksQuery = (
  { __typename?: 'Query' }
  & { pickUpTracks: Array<(
    { __typename?: 'Track' }
    & Pick<Track, 'id' | 'title' | 'audioUrl' | 'thumbnailUrl'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'displayName' | 'iconUrl'>
    ) }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'uid' | 'displayName' | 'webUrl' | 'introduction' | 'iconUrl'>
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'uid' | 'displayName' | 'webUrl' | 'introduction' | 'iconUrl'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  displayName: Scalars['String'];
  uid: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'uid' | 'displayName'>
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  displayName?: Maybe<Scalars['String']>;
  webUrl?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['Upload']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'uid' | 'displayName' | 'webUrl' | 'introduction' | 'iconUrl'>
  ) }
);
