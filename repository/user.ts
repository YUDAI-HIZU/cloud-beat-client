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
            twitter
            soundCloud
            facebook
            youtube
            instagram
            introduction
            iconUrl
            coverUrl
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
            twitter
            soundCloud
            facebook
            youtube
            instagram
            introduction
            iconUrl
            coverUrl
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
            id
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

  async updateUser(variables: {
    displayName: string,
    webUrl: String,
    twitter: String,
    soundCloud: String,
    facebook: String,
    youtube: String,
    instagram: String,
    introduction: String,
    icon: File,
    cover: File
  }): Promise<User> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation updateUser(
          $displayName: String,
          $webUrl: String,
          $twitter: String,
          $soundCloud: String,
          $facebook: String,
          $youtube: String,
          $instagram: String,
          $introduction: String,
          $icon: Upload,
          $cover: Upload
        ) {
          updateUser(input: {
            displayName: $displayName
            webUrl: $webUrl
            twitter: $twitter,
            soundCloud: $soundCloud,
            facebook: $facebook,
            youtube: $youtube,
            instagram: $instagram,
            introduction: $introduction
            icon: $icon
            cover: $cover
          }) {
            id
            uid
            displayName
            webUrl
            twitter
            soundCloud
            facebook
            youtube
            instagram
            introduction
            iconUrl
            coverUrl
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
