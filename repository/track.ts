import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Track } from '~/apollo/model/generated'

export class TrackRepository {
  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async createTrack(variables: { title: string, thumbnailImage: File }): Promise<Track> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation createTrack($title: String!, $thumbnailImage: Upload) {
          createTrack(input: {
            title: $title,
            thumbnailImage: $thumbnailImage
          }) {
            id
            title
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

  async updateTrack(variables: { title: string, thumbnailImage: File }): Promise<Track> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation createTrack($title: String!, $thumbnailImage: Upload) {
          createTrack(input: {
            title: $title,
            thumbnailImage: $thumbnailImage
          }) {
            id
            title
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
