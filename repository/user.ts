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
        query user($id: String!) {
          user(id: $id) {
            id
            uid
            displayName
            webUrl
            introduction
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
        query currentUser {
          currentUser {
            id
            uid
            displayName
            webUrl
            introduction
            createdAt
            updatedAt
          }
        }
      `
    })
    return response.data.currentUser
  }

  async createUser(variables: { displayName: string, uid: string }): Promise<User> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation createUser($displayName: String!, $uid: String!) {
          createUser(input: {
            displayName: $displayName
            uid: $uid
          }) {
            uid
            displayName
          }
        }
      `,
      variables: {
        ...variables
      }
    })
    return response.data
  }

  async updateUser(variables: { displayName: string, webUrl: String, introduction: String }): Promise<User> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation updateUser($displayName: String, $webUrl: String, $introduction: String) {
          updateUser(input: {
            displayName: $displayName
            webUrl: $webUrl
            introduction: $introduction
          }) {
            uid
            displayName
            webUrl
            introduction
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
