import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Track } from '~/apollo/model/generated'

export class TrackRepository {
  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async tracks(): Promise<Track[]> {
    const response = await this.client.query({
      query: gql`
        query tracks {
          tracks {
            id
            title
            soundUrl
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

  async createTrack(variables: { title: string, sound: File, thumbnail: File }): Promise<Track> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation createTrack($title: String!, $sound: Upload!, $thumbnail: Upload) {
          createTrack(input: {
            title: $title,
            sound: $sound,
            thumbnail: $thumbnail
          }) {
            id
            title
            soundUrl
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

  async updateTrack(variables: { title: string, sound: File, thumbnail: File }): Promise<Track> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation updateTrack($title: String!, $sound: Upload $thumbnail: Upload) {
          createTrack(input: {
            title: $title,
            sound: $sound,
            thumbnail: $thumbnail
          }) {
            id
            title
            soundUrl
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
