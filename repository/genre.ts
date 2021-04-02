import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Genre } from '~/apollo/model/generated'

export class GenreRepository {
  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async genres(): Promise<Genre[]> {
    const response = await this.client.query({
      query: gql`
        query genres {
          genres {
            id
            name
          }
        }
      `
    })
    return response.data.genres
  }
}
