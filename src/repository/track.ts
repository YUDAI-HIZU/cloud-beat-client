import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

export const newReleaseTracks = () => {
  const newReleaseTracks = gql`
    query newReleaseTracks {
      newReleaseTracks {
        id
        title
        audioUrl
        thumbnailUrl
        user {
          displayName
          iconUrl
        }
      }
    }
  `
  return useQuery(newReleaseTracks)
}

export const pickUpTracks = gql`
  query pickUpTracks {
    pickUpTracks {
      id
      title
      audioUrl
      thumbnailUrl
      user {
        displayName
        iconUrl
      }
    }
  }
`;
