import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { ExternalLink } from '~/apollo/model/generated'


export class ExternalLinkRepository {
  private readonly client: ApolloClient<any>

  constructor(client: ApolloClient<any>) {
    this.client = client
  }

  async externalLinkByUserID(variables: { userID: number }): Promise<ExternalLink> {
    const response = await this.client.query({
      query: gql`
        query externalLinkByUserID($userID: ID!) {
          externalLinkByUserID(userID: $userID) {
            twitter
            soundCloud
            facebook
            youtube
            instagram
          }
        }
      `,
      variables
    })
    return response.data
  }
}
