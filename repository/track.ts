import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Track } from '~/apollo/model/generated'

export class TrackRepository {
  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async tracksByUserID(variables: { userID: number }): Promise<Track[]> {
    const response = await this.client.query({
      query: gql`
        query tracksByUserID($userID: ID!) {
          tracksByUserID(userID: $userID) {
            id
            title
            audioUrl
            thumbnailUrl
          }
        }
      `,
      variables
    })
    return response.data
  }

  async newReleaseTracks(): Promise<Track[]> {
    const response = await this.client.query({
      query: gql`
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
    })
    return response.data
  }

  async pickUpTracks(): Promise<Track[]> {
    const response = await this.client.query({
      query: gql`
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
      `
    })
    return response.data
  }

  async createTrack(variables: { title: string, audio: File, thumbnail: File, description: string, youtubeLink: string, genreID: number }): Promise<Track> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation createTrack($title: String!, $audio: Upload!, $thumbnail: Upload, $description: String!, $youtubeLink: String, $genreID: ID!) {
          createTrack(input: {
            title: $title,
            audio: $audio,
            thumbnail: $thumbnail,
            description: $description,
            youtubeLink: $youtubeLink,
            genreID: $genreID
          }) {
            id
            title
            audioUrl
            thumbnailUrl
            description
            youtubeLink
            genre {
              id
              name
            }
          }
        }
      `,
      variables: {
        ...variables
      }
    })
    return response.data
  }

  async updateTrack(variables: { title: string, audio: File, thumbnail: File }): Promise<Track> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation updateTrack($title: String!, $audio: Upload $thumbnail: Upload) {
          createTrack(input: {
            title: $title,
            audio: $audio,
            thumbnail: $thumbnail
          }) {
            id
            title
            audioUrl
            thumbnailUrl
          }
        }
      `,
      variables: {
        ...variables
      }
    })
    return response.data
  }
}
