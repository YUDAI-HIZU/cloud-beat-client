import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { User } from '~/apollo/model/generated'

export class UserRepository {
  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async getUser(variables: { id: string }): Promise<User> {
    const response = await this.client.query({
      query: gql`
        mutation user($id: String!) {
          user(id: $id) {
            id
            uid
            displayName
            createdAt
            updatedAt
          }
        }
      `,
      variables
    })
    return response.data
  }

  async currentUser(): Promise<User> {
    const response = await this.client.query({
      query: gql`
        mutation currentUser($id: String!) {
          currentUser {
            id
            uid
            displayName
            createdAt
            updatedAt
          }
        }
      `
    })
    return response.data
  }
}
