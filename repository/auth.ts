import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'

export class AuthRepository {
  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async signUp(variables: { displayName: string, uid: string }): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: gql`
        mutation signUp($displayName: String!, $uid: String!) {
          signUp(input: {
            displayName: $displayName
            uid: $uid
          })
        }
      `,
      variables
    })
    return response.data
  }
}
