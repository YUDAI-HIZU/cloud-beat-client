import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const provider = ApolloProvider

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: `http://localhost:8080/query`,
  cache,
})

export default {
  provider,
  client
}